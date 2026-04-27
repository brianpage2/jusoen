'use client'

import { useState } from 'react'
import SearchBox from '@/components/SearchBox'
import ResultCard, { ResultCardSkeleton } from '@/components/ResultCard'
import { searchAddress, toAddressForm, AddressFormFields, JusoResult } from '@/lib/juso'
import { useLang } from '@/lib/language-context'

const t = {
  ko: {
    title: '영문 도로명주소 변환',
    subtitle: '한글 주소를 입력하면 도로명주소·영문주소·해외 사이트 입력 양식을 바로 확인할 수 있습니다.',
    hint: '예시: 서울 강남구 테헤란로 152 · 부산 해운대구 해운대로 · 제주 중앙로',
    noResult: '검색 결과가 없습니다. 다른 주소로 검색해보세요.',
    error: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  en: {
    title: 'Korean Address to English',
    subtitle: 'Enter a Korean address to instantly get the road address, official English address, and international form fields.',
    hint: 'e.g. 152 Teheran-ro Gangnam-gu Seoul · Haeundae-ro Busan · Jungang-ro Jeju',
    noResult: 'No results found. Please try a different address.',
    error: 'An error occurred. Please try again later.',
  },
} as const

interface CombinedResult {
  juso: JusoResult
  form: AddressFormFields
}

type SearchState = 'idle' | 'loading' | 'done' | 'error'

const PER_PAGE = 10

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null

  const pages: (number | '...')[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return (
    <div className="flex justify-center items-center gap-1 py-3 border-t border-[#D0DCE8]">
      <button onClick={() => onChange(current - 1)} disabled={current === 1} className="w-8 h-8 text-sm text-[#5A6A7A] hover:bg-[#EBF3FB] rounded disabled:opacity-30 transition-colors">‹</button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dot-${i}`} className="w-8 h-8 flex items-center justify-center text-sm text-[#B0BEC5]">…</span>
        ) : (
          <button key={p} onClick={() => onChange(p)} className={`w-8 h-8 text-sm rounded transition-colors ${p === current ? 'bg-[#1B6EBE] text-white font-semibold' : 'text-[#5A6A7A] hover:bg-[#EBF3FB]'}`}>{p}</button>
        )
      )}
      <button onClick={() => onChange(current + 1)} disabled={current === total} className="w-8 h-8 text-sm text-[#5A6A7A] hover:bg-[#EBF3FB] rounded disabled:opacity-30 transition-colors">›</button>
    </div>
  )
}

export default function EnglishAddressClient() {
  const [state, setState] = useState<SearchState>('idle')
  const [results, setResults] = useState<CombinedResult[]>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const { lang } = useLang()
  const tx = t[lang]

  const totalPages = Math.ceil(totalCount / PER_PAGE)

  async function handleSearch(kw: string, page = 1) {
    setState('loading')
    setErrorMsg('')
    if (page === 1) setKeyword(kw)

    try {
      const { juso: searchResults, totalCount: count } = await searchAddress(kw, page)

      if (searchResults.length === 0) {
        setErrorMsg(tx.noResult)
        setState('error')
        return
      }

      setResults(searchResults.map(juso => ({ juso, form: toAddressForm(juso) })))
      setTotalCount(count)
      setCurrentPage(page)
      setState('done')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : tx.error)
      setState('error')
    }
  }

  return (
    <>
      {/* 네이비 Hero 검색 영역 */}
      <div className="bg-[#1B2B6E] rounded-2xl pl-0 pr-5 pt-5 pb-[10px] mb-6">
        <h1 className="text-center text-white text-xl font-bold mb-2">{tx.title}</h1>
        <p className="text-center text-white/70 text-sm mb-[10px]">
          {lang === 'ko'
            ? <>한글 주소를 입력하면 <strong className="text-white">도로명주소·영문주소·해외 사이트</strong> 입력 양식을 바로 확인할 수 있습니다.</>
            : <>Enter a Korean address to instantly get the <strong className="text-white">road address, official English address, and international form fields</strong>.</>}
        </p>
        <SearchBox onSearch={handleSearch} loading={state === 'loading'} />
        {state === 'idle' && (
          <p className="text-center text-white/50 text-xs mt-3">{tx.hint}</p>
        )}
        {state === 'done' && (
          <p className="text-center text-white/80 text-sm mt-[8px]">
            {lang === 'ko'
              ? <>검색어 "{keyword}"에 대한 검색결과 총 <strong className="text-base">{totalCount.toLocaleString()}</strong>건입니다.</>
              : <><strong className="text-base">{totalCount.toLocaleString()}</strong> result(s) for "{keyword}".</>}
          </p>
        )}
      </div>

      {/* 결과 영역 */}
      <div className="space-y-2">
        {state === 'idle' && <ResultCardSkeleton />}

        {state === 'loading' && <ResultCardSkeleton />}

        {state === 'error' && (
          <div className="bg-white rounded-lg border border-[#D0DCE8] p-6 text-center text-[#5A6A7A] text-sm">
            {errorMsg}
          </div>
        )}

        {state === 'done' && (
          <>
            {results.map((r, i) => (
              <ResultCard key={i} juso={r.juso} form={r.form} index={(currentPage - 1) * PER_PAGE + i} />
            ))}
            <Pagination current={currentPage} total={totalPages} onChange={p => handleSearch(keyword, p)} />
          </>
        )}
      </div>

      {/* SEO 콘텐츠 */}
      <section className="mt-16 space-y-10">
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">이용 방법</h2>
          <ol className="space-y-2 text-sm text-[#5A6A7A] list-decimal list-inside">
            <li>검색창에 한글 주소를 입력합니다. (예: 서울 강남구 테헤란로 152)</li>
            <li>검색 결과에서 원하는 주소의 <strong className="text-[#1B6EBE]">영문펼치기</strong> 버튼을 클릭합니다.</li>
            <li>원하는 항목 옆의 복사 버튼을 눌러 클립보드에 복사하세요.</li>
            <li>해외 사이트의 주소 입력 양식에 그대로 붙여 넣으세요.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">해외 사이트 주소 입력 양식 안내</h2>
          <div className="bg-white rounded-lg border border-[#D0DCE8] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium w-40">필드명</th>
                  <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium">입력할 내용</th>
                  <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium hidden sm:table-cell">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0DCE8]">
                {[
                  ['Address Line 1', '도로명 + 건물번호', '152 Teheran-ro, Gangnam-gu'],
                  ['Address Line 2', '동/호수 (없으면 공백)', '705-1104'],
                  ['City', '시 영문명', 'Seoul'],
                  ['State / Province', '시/도 영문명', 'Seoul'],
                  ['ZIP / Postal Code', '우편번호 5자리', '06236'],
                  ['Country', '국가', 'South Korea'],
                ].map(([field, desc, example]) => (
                  <tr key={field}>
                    <td className="px-4 py-3 font-medium text-[#1B6EBE] font-[Inter]">{field}</td>
                    <td className="px-4 py-3 text-[#1A1A1A]">{desc}</td>
                    <td className="px-4 py-3 text-[#5A6A7A] hidden sm:table-cell font-[Inter] text-xs">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-3">
            {[
              {
                q: '영문 주소 변환 결과가 정확한가요?',
                a: '대한민국 행정안전부의 공식 도로명주소 API를 사용하여 변환합니다. 공식 영문 도로명주소 체계를 따르므로 신뢰할 수 있습니다.',
              },
              {
                q: 'Address Line 2는 무엇을 입력하나요?',
                a: '아파트 동/호수를 입력합니다. 예: 705동 1104호인 경우 705-1104로 입력합니다. 해당 정보가 없다면 비워두어도 됩니다.',
              },
              {
                q: '지번 주소와 도로명 주소 중 어떤 것을 써야 하나요?',
                a: '해외 우편 및 서비스 가입에는 도로명 주소(영문)를 사용하는 것이 공식 권장 방식입니다.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="bg-white border border-[#D0DCE8] rounded-lg">
                <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-[#1A1A1A] hover:text-[#1B6EBE]">{q}</summary>
                <p className="px-4 pb-4 text-sm text-[#5A6A7A]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-10">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">주소변경 서비스</h2>
          <p className="text-sm text-[#5A6A7A] mb-4">이사 후 주소변경이 필요하다면 아래 서비스를 이용하세요.</p>
          <div className="bg-white rounded-lg border border-[#D0DCE8] overflow-hidden divide-y divide-[#E8EEF4]">
            <div className="px-4 py-2.5 bg-[#1B6EBE]">
              <span className="text-xs font-semibold text-white">공공 서비스</span>
            </div>
            {[
              {
                logo: '/images/gov24.jpg',
                alt: '정부24',
                desc: '온라인 전입신고',
                url: 'https://www.gov.kr/portal/main',
              },
              {
                logo: '/images/gov24.jpg',
                alt: '정부24',
                desc: '주소 일괄정정 신청',
                url: 'https://www.gov.kr/portal/main',
              },
              {
                logo: '/images/epost.jpg',
                alt: '인터넷우체국',
                desc: '주기이전 우편물 전송서비스',
                url: 'https://service.epost.go.kr/',
              },
            ].map(({ logo, alt, desc, url }) => (
              <a key={desc} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7FA] transition-colors">
                <img src={logo} alt={alt} width={28} height={28} className="shrink-0 h-7 w-auto object-contain" />
                <span className="text-sm text-[#1A1A1A]">{desc}</span>
                <svg className="ml-auto shrink-0 text-[#B0BEC5]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            ))}
            <div className="px-4 py-2.5 bg-[#1B6EBE]">
              <span className="text-xs font-semibold text-white">민간 서비스</span>
            </div>
            {[
              {
                logo: '/images/kt-moving.jpg',
                alt: 'KT Moving',
                desc: '주소변경 신청 (은행, 카드사 등)',
                url: 'https://www.ktmoving.com/',
              },
            ].map(({ logo, alt, desc, url }) => (
              <a key={desc} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7FA] transition-colors">
                <img src={logo} alt={alt} width={80} height={28} className="shrink-0 h-7 w-auto object-contain" />
                <span className="text-sm text-[#1A1A1A]">{desc}</span>
                <svg className="ml-auto shrink-0 text-[#B0BEC5]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            ))}
          </div>
      </div>

      {/* 계좌정보 영문전환 내부 링크 */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">계좌정보 영문전환 서비스</h2>
        <a href="/bank-account"
          className="flex items-center gap-4 bg-white border border-[#D0DCE8] rounded-lg px-4 py-4 hover:bg-[#F5F7FA] transition-colors">
          <div className="shrink-0 w-10 h-10 bg-[#EEF2FA] rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B2B6E" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#1A1A1A]">한글 계좌정보 영문으로 전환</p>
            <p className="text-xs text-[#5A6A7A] mt-0.5">SWIFT 코드, 영문 은행명, 영문 주소 — 해외 사이트 계좌 등록에 필요한 정보를 즉시 확인</p>
          </div>
          <svg className="shrink-0 text-[#B0BEC5]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </a>
      </div>
    </>
  )
}

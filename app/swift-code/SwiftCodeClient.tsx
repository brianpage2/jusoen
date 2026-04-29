'use client'

import { useState } from 'react'
import Link from 'next/link'
import CopyButton from '@/components/CopyButton'
import { SWIFT_CODES_KR } from '@/lib/swift-codes-kr'
import { BANKS } from '@/lib/banks'

const bankAddrMap = new Map(BANKS.map(b => [b.swift, { address: b.address, addressKo: b.addressKo }]))

const categories = ['국내은행', '인터넷은행', '정책·중앙은행', '외국계은행', '증권·자산운용'] as const

export default function SwiftCodeClient() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>('국내은행')

  const total = SWIFT_CODES_KR.filter(e => e.category !== '기타').length

  const filtered = SWIFT_CODES_KR.filter(e => {
    if (e.category === '기타') return false
    const matchCat = !category || e.category === category
    const q = query.trim()
    const matchQ = !q ||
      e.nameKo.includes(q) ||
      e.nameEn.toLowerCase().includes(q.toLowerCase()) ||
      e.swift.toLowerCase().includes(q.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <>
      {/* Hero */}
      <div className="bg-[#1B2B6E] rounded-2xl px-5 pt-5 pb-5 mb-6">
        <div className="flex items-center justify-center gap-2 mb-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h1 className="text-white text-xl font-bold">한국 SWIFT 코드 조회</h1>
        </div>
        <p className="text-white/70 text-sm text-center mb-4">
          은행명·영문명·SWIFT 코드로 검색하세요. 총 <strong className="text-white">{total}개</strong> 한국 금융기관
        </p>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="예: 국민은행 / Shinhan / KOEXKRSE"
          className="w-full h-11 px-3 rounded-lg text-[#1A1A1A] text-sm bg-white focus:outline-none placeholder-[#9CA3AF]"
        />
      </div>

      {/* 카테고리 뱃지 */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setCategory(null)}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
            category === null
              ? 'bg-[#1B2B6E] text-white'
              : 'bg-white border border-[#D0DCE8] text-[#5A6A7A] hover:border-[#1B2B6E] hover:text-[#1B2B6E]'
          }`}
        >
          전체 ({total})
        </button>
        {categories.map(cat => {
          const count = SWIFT_CODES_KR.filter(e => e.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? null : cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                category === cat
                  ? 'bg-[#1B6EBE] text-white'
                  : 'bg-white border border-[#D0DCE8] text-[#5A6A7A] hover:border-[#1B6EBE] hover:text-[#1B6EBE]'
              }`}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* 건수 / 출처 */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[#9CA3AF]">{filtered.length}개 표시 중 · 총 {total}개</p>
        <a
          href="https://www.theswiftcodes.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#9CA3AF] hover:text-[#1B6EBE] transition-colors whitespace-nowrap"
        >
          출처: theswiftcodes.com
        </a>
      </div>

      {/* 결과 */}
      <div className="bg-white border border-[#D0DCE8] rounded-lg overflow-hidden">
        {filtered.length === 0 ? (
          <p className="px-4 py-10 text-sm text-[#9CA3AF] text-center">검색 결과가 없습니다.</p>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {filtered.map(entry => {
              const addr = bankAddrMap.get(entry.swift)
              return (
              <div key={entry.swift} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F9FAFB]">
                <div className="flex-1 min-w-0">
                  {addr ? (
                    <div className="grid gap-x-3 min-w-0 overflow-hidden" style={{ gridTemplateColumns: 'max-content 1fr' }}>
                      <p className="text-sm font-medium text-[#1A1A1A]">{entry.nameKo}</p>
                      <p className="text-[11px] text-[#9CA3AF] self-center truncate">{addr.addressKo}</p>
                      <p className="text-xs text-[#6B7280]">{entry.nameEn}</p>
                      <div className="flex items-center gap-1 self-center min-w-0">
                        <span className="text-[11px] text-[#9CA3AF] truncate">{addr.address}</span>
                        <CopyButton value={addr.address} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-[#1A1A1A]">{entry.nameKo}</p>
                      <p className="text-xs text-[#6B7280] truncate">{entry.nameEn}</p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#9CA3AF] hidden sm:inline">{entry.city}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0F4F8] text-[#5A6A7A] hidden sm:inline">{entry.category}</span>
                  <span className="text-sm font-bold font-[Inter] text-[#1B2B6E]">{entry.swift}</span>
                  <CopyButton value={entry.swift} />
                </div>
              </div>
              )
            })}
          </div>
        )}
      </div>
      {/* SEO 콘텐츠 */}
      <section className="mt-16 space-y-10">

        {/* 이용 방법 */}
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">이용 방법</h2>
          <ol className="space-y-2 text-sm text-[#5A6A7A] list-decimal list-inside">
            <li>위 검색창에 은행명(한글 또는 영문) 또는 SWIFT 코드를 입력합니다.</li>
            <li>카테고리 뱃지(국내은행·인터넷은행·외국계은행 등)를 눌러 필터링할 수 있습니다.</li>
            <li>결과 목록에서 원하는 기관의 SWIFT 코드 옆 복사 버튼을 클릭합니다.</li>
            <li>복사한 코드를 해외 송금 양식 또는 해외 플랫폼 계좌 등록란에 붙여넣으세요.</li>
          </ol>
          <div className="mt-3 bg-[#FFF8EC] border border-[#F5C842] rounded px-3 py-2 text-xs text-[#92600A]">
            ⚠️ SWIFT 코드는 변경될 수 있습니다. 중요한 거래 전에는 반드시 해당 은행 공식 사이트에서 최신 코드를 확인하세요.
          </div>
        </div>

        {/* SWIFT 코드 구조 */}
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">SWIFT 코드 구조</h2>
          <p className="text-sm text-[#5A6A7A] mb-4">SWIFT 코드(BIC 코드)는 8자리 또는 11자리로 구성되며, 각 구간이 고유한 의미를 가집니다.</p>
          <div className="bg-white border border-[#D0DCE8] rounded-lg overflow-hidden">
            <div className="flex border-b border-[#D0DCE8]">
              {[
                { code: 'KOEX', label: 'Bank Code', bg: '#1B2B6E', fg: 'white' },
                { code: 'KR',   label: 'Country',   bg: '#1B6EBE', fg: 'white' },
                { code: 'SE',   label: 'Location',  bg: '#4A90D9', fg: 'white' },
                { code: 'XXX',  label: 'Branch',    bg: '#EEF2FA', fg: '#1B2B6E' },
              ].map(({ code, label, bg, fg }) => (
                <div key={label} className="flex-1 text-center py-3 px-1" style={{ backgroundColor: bg }}>
                  <p className="text-base font-bold font-[Inter]" style={{ color: fg }}>{code}</p>
                  <p className="text-xs mt-0.5" style={{ color: fg, opacity: 0.75 }}>{label}</p>
                </div>
              ))}
            </div>
            <div className="divide-y divide-[#D0DCE8]">
              {[
                { seg: 'KOEX', name: 'Bank Code (은행 코드)',    desc: '은행을 식별하는 4자리 코드' },
                { seg: 'KR',   name: 'Country Code (국가 코드)', desc: '대한민국 — ISO 국가 코드 KR' },
                { seg: 'SE',   name: 'Location Code (지역 코드)', desc: '서울(SE) 등 도시 또는 지역' },
                { seg: 'XXX',  name: 'Branch Code (지점 코드)',  desc: 'XXX = 본점. 특정 지점은 다른 코드' },
              ].map(({ seg, name, desc }) => (
                <div key={seg} className="flex items-center gap-3 px-4 py-3">
                  <span className="text-sm font-bold font-[Inter] text-[#1B6EBE] w-12 shrink-0">{seg}</span>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{name}</p>
                    <p className="text-xs text-[#5A6A7A]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-3">
            {[
              {
                q: 'SWIFT 코드와 BIC 코드는 같은 건가요?',
                a: '네, 동일한 코드입니다. SWIFT는 Society for Worldwide Interbank Financial Telecommunication의 약자이고, BIC는 Bank Identifier Code의 약자입니다. 두 명칭이 혼용되며 국제 금융 거래 시 은행을 식별하는 8~11자리 코드를 가리킵니다.',
              },
              {
                q: 'SWIFT 코드 8자리와 11자리의 차이는?',
                a: '8자리는 은행 본점(Head Office)을 나타내고, 11자리는 특정 지점을 나타냅니다. 마지막 3자리가 XXX이면 본점을 의미합니다. 일반적인 해외 송금이나 해외 플랫폼 계좌 등록 시 8자리 코드를 사용해도 무방하며, 은행 내부에서 적절한 지점으로 자동 라우팅됩니다.',
              },
              {
                q: '한국은 IBAN을 사용하나요?',
                a: '아니요. 한국은 IBAN(International Bank Account Number)을 사용하지 않습니다. 해외 송금이나 해외 사이트 계좌 등록 시 IBAN란은 비워두거나 N/A를 입력하고, 대신 계좌번호와 SWIFT 코드를 함께 입력하세요.',
              },
              {
                q: '은행 SWIFT 코드는 어디서 공식 확인할 수 있나요?',
                a: '각 은행 공식 홈페이지의 해외 송금 안내 페이지, 인터넷 뱅킹의 해외 송금 메뉴, 또는 은행 고객센터에 문의하면 확인할 수 있습니다. SWIFT 코드는 변경될 수 있으므로 중요한 거래 전에는 반드시 은행 공식 채널에서 재확인하세요.',
              },
              {
                q: '잘못된 SWIFT 코드를 입력하면 어떻게 되나요?',
                a: '송금이 지연되거나 반송될 수 있으며, 반송 처리 과정에서 추가 수수료가 발생할 수 있습니다. 처리에 수일이 걸릴 수 있고 자금이 일시적으로 묶일 수 있습니다. 반드시 정확한 코드를 입력하세요.',
              },
              {
                q: '증권사·자산운용사도 SWIFT 코드가 있나요?',
                a: '네. SWIFT 코드는 은행뿐 아니라 증권사, 자산운용사, 보험사 등 SWIFT 네트워크에 연결된 모든 금융기관에 부여됩니다. 이 서비스에서는 국내 245개 금융기관의 SWIFT 코드를 카테고리별로 조회할 수 있습니다.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="bg-white border border-[#D0DCE8] rounded-lg">
                <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-[#1A1A1A] hover:text-[#1B6EBE]">{q}</summary>
                <p className="px-4 pb-4 text-sm text-[#5A6A7A]">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* 관련 서비스 링크 */}
        <div className="bg-[#EEF2FA] border border-[#D0DCE8] rounded-lg px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#1B2B6E]">계좌정보 영문전환</p>
            <p className="text-xs text-[#5A6A7A] mt-0.5">은행 선택만 하면 SWIFT 코드·영문 은행명·주소를 한 번에 확인하고 복사할 수 있습니다.</p>
          </div>
          <Link
            href="/bank-account"
            className="shrink-0 text-sm px-4 py-2 bg-[#1B6EBE] hover:bg-[#145A9E] text-white rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            바로가기 →
          </Link>
        </div>

      </section>
    </>
  )
}

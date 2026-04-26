'use client'

import { useState, FormEvent } from 'react'
import CopyButton from '@/components/CopyButton'
import Link from 'next/link'
import { BANKS, findBank, Bank } from '@/lib/banks'
import { useLang } from '@/lib/language-context'

const t = {
  ko: {
    title: '한글 계좌정보 영문으로 전환',
    subtitle: '은행을 선택하고 계좌 정보를 입력하면 해외 사이트 입력 양식을 바로 확인할 수 있습니다.',
    bankLabel: '은행 선택',
    bankPlaceholder: '은행을 선택하세요',
    accountLabel: '계좌번호',
    accountPlaceholder: '숫자만 입력 (예: 12345678901234)',
    holderLabel: '예금주명',
    holderPlaceholder: '은행 앱 등록 영문명과 띄어쓰기까지 동일하게 입력 (예: HONG GILDONG)',
    submit: '영문으로 전환하기',
    resultTitle: '해외 사이트 입력 정보',
    noIban: '한국은 IBAN을 사용하지 않습니다. 해외 송금 시 계좌번호와 SWIFT 코드를 함께 사용하세요.',
  },
  en: {
    title: 'Korean Bank Account Info to English',
    subtitle: 'Select your bank and enter account details to get international form-ready information.',
    bankLabel: 'Select Bank',
    bankPlaceholder: 'Select a bank',
    accountLabel: 'Account Number',
    accountPlaceholder: 'Numbers only (e.g. 12345678901234)',
    holderLabel: 'Account Holder (English)',
    holderPlaceholder: 'Enter English name (e.g. HONG GILDONG)',
    submit: 'Convert to English',
    resultTitle: 'International Form Information',
    noIban: 'Korea does not use IBAN. Use account number + SWIFT code for international transfers.',
  },
} as const

const faqItems: { q: string; a: string; red?: boolean }[] = [
  {
    q: 'SWIFT 코드란 무엇인가요?',
    a: 'SWIFT 코드(BIC 코드)는 국제 은행 간 금융 거래에서 각 은행을 고유하게 식별하는 8~11자리 코드입니다. SWIFT는 Society for Worldwide Interbank Financial Telecommunication의 약자로, 해외 송금 시 수취 은행을 정확하게 지정하는 데 사용됩니다.',
  },
  {
    q: 'SWIFT 코드 구조는 어떻게 되나요?',
    a: 'SWIFT 코드는 4개 구간으로 구성됩니다. ① 은행 코드(4자리) — 은행 고유 식별 코드 ② 국가 코드(2자리) — ISO 국가 코드 (한국=KR) ③ 지역 코드(2자리) — 도시 또는 지역 코드 ④ 지점 코드(3자리, 선택) — 본점이면 XXX. 예: KOEXKRSEXXX = 외환은행, 한국, 서울, 본점',
  },
  {
    q: 'SWIFT 코드와 BIC 코드는 같은 건가요?',
    a: '네, SWIFT 코드와 BIC(Bank Identifier Code)는 완전히 동일한 코드입니다. 두 명칭이 혼용되며, 국제 금융 거래 시 은행을 식별하는 8~11자리 코드를 가리킵니다.',
  },
  {
    q: 'SWIFT 코드 8자리와 11자리의 차이는?',
    a: '8자리 SWIFT 코드는 은행의 본점(Head Office)을 나타내고, 11자리 코드는 특정 지점을 나타냅니다. 마지막 3자리가 "XXX"인 경우 본점을 의미합니다. 일반적으로 송금 시 8자리 코드를 사용해도 본점으로 전달되며, 은행 내부에서 적절한 지점으로 라우팅됩니다.',
  },
  {
    q: '은행의 SWIFT 코드는 어디서 확인할 수 있나요?',
    a: '거래 은행 공식 홈페이지의 해외 송금 안내 페이지, 인터넷 뱅킹의 계좌 정보 메뉴, 또는 은행 고객센터에 문의하면 확인할 수 있습니다. Jusoen 계좌정보 영문전환 서비스에서 은행을 선택하면 SWIFT 코드를 바로 확인하고 복사할 수 있습니다.',
  },
  {
    q: '한국은 IBAN을 사용하나요?',
    a: '아니요, 한국은 IBAN(International Bank Account Number)을 사용하지 않습니다. 해외 송금 또는 해외 사이트 등록 시 IBAN란은 비워두거나 N/A를 입력하고, 대신 계좌번호와 SWIFT 코드를 함께 입력하세요.',
  },
  {
    q: '예금주 영문명은 어떻게 표기하나요?',
    a: '⚠️ 예금주 영문명은 본인이 직접 거래 은행에 확인해야 합니다. 은행마다 등록된 영문명이 다를 수 있으며, 잘못 입력 시 송금 오류가 발생할 수 있습니다.',
    red: true,
  },
  {
    q: 'Routing Number가 필요한 경우는요?',
    a: 'Routing Number는 미국 은행에서 사용하는 코드입니다. 한국 은행은 Routing Number 대신 SWIFT 코드를 사용합니다. 미국으로 송금받을 때 Routing Number를 요구받는다면 수취 미국 은행의 Routing Number를 입력하세요.',
  },
]

interface ResultData {
  bank: Bank
  accountNumber: string
  accountHolder: string
}

export default function BankAccountClient() {
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountHolder, setAccountHolder] = useState('')
  const [result, setResult] = useState<ResultData | null>(null)
  const { lang } = useLang()
  const tx = t[lang]

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const bank = findBank(bankCode)
    if (!bank || !accountNumber.trim() || !accountHolder.trim()) return
    setResult({ bank, accountNumber: accountNumber.trim(), accountHolder: accountHolder.trim().toUpperCase() })
  }

  const fields = result ? [
    { label: 'Bank Name',        value: result.bank.nameEn,       sub: result.bank.nameKo,    url: result.bank.url },
    { label: 'SWIFT / BIC Code', value: result.bank.swift,        sub: '※ 반드시 은행 공식 사이트에서 직접 확인하세요.',  url: result.bank.swiftUrl || result.bank.url },
    { label: 'Account Number',   value: result.accountNumber,     sub: null,                  url: null },
    { label: 'Account Holder',   value: result.accountHolder,     sub: null,                  url: null },
    { label: 'Bank Address',     value: result.bank.address,      sub: result.bank.addressKo, url: null },
  ] : []

  return (
    <>
      {/* Hero 입력 영역 */}
      <div className="bg-[#1B2B6E] rounded-2xl px-5 pt-5 pb-4 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="-30 -20 60 60">
            <g transform="matrix(-1 0 0 1 24 0)">
              <circle cx="10" cy="10" r="6"/>
              <path d="m14 16 6 6M8 8q2-3 4 0"/>
            </g>
            <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="translate" values="0 0; -15 5; -10 10; -5 5; 0 0"/>
          </svg>
          <h1 className="text-white text-xl font-bold">{tx.title}</h1>
        </div>
        <p className="text-center text-white/70 text-sm mb-4">
          계좌 정보를 입력하면 <strong className="text-white">해외 사이트 영문 입력양식</strong>으로 바로 확인할 수 있습니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-white/70 text-xs mb-1">{tx.bankLabel}</label>
            <select
              value={bankCode}
              onChange={e => setBankCode(e.target.value)}
              className="w-full h-11 px-3 rounded-lg text-[#1A1A1A] text-sm bg-white focus:outline-none"
              required
            >
              <option value="">{tx.bankPlaceholder}</option>
              {BANKS.map(b => (
                <option key={b.code} value={b.code}>{b.nameKo} ({b.nameEn})</option>
              ))}
            </select>
            {bankCode && (() => {
              const b = findBank(bankCode)
              return b ? (
                <div className="mt-1.5 flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                  <span className="text-white/60 text-xs shrink-0">SWIFT / BIC</span>
                  <span className="text-white font-bold font-[Inter] text-sm tracking-wide">{b.swift}</span>
                  <CopyButton value={b.swift} />
                </div>
              ) : null
            })()}
          </div>

          <div>
            <label className="block text-white/70 text-xs mb-1">{tx.accountLabel}</label>
            <input
              type="text"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              placeholder={tx.accountPlaceholder}
              className="w-full h-11 px-3 rounded-lg text-[#1A1A1A] text-sm bg-white focus:outline-none placeholder-[#9CA3AF]"
              required
            />
            <p className="text-white/50 text-xs mt-1">
              💡 계좌번호는 화면 표시용으로만 사용되며 저장·전송되지 않습니다. 임의의 번호를 사용해도 무방합니다.
            </p>
          </div>

          <div>
            <label className="block text-white/70 text-xs mb-1">{tx.holderLabel}</label>
            <input
              type="text"
              value={accountHolder}
              onChange={e => setAccountHolder(e.target.value)}
              placeholder={tx.holderPlaceholder}
              className="w-full h-11 px-3 rounded-lg text-[#1A1A1A] text-sm bg-white focus:outline-none placeholder-[#9CA3AF]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!bankCode || !accountNumber || !accountHolder}
            className="w-full h-11 bg-[#1B6EBE] hover:bg-[#145A9E] disabled:bg-[#B0BEC5] text-white font-semibold rounded-lg transition-colors"
          >
            {tx.submit}
          </button>
        </form>
      </div>

      {/* 결과 영역 */}
      {!result && (
        <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden pointer-events-none select-none opacity-60">
          <div className="bg-[#EEF2FA] px-4 py-2.5">
            <span className="text-sm font-semibold text-[#1B2B6E]">{tx.resultTitle}</span>
          </div>
          <div className="mx-4 mt-4 bg-[#FFF8EC] border border-[#F5C842] rounded-lg px-4 py-2.5 text-xs text-[#92600A]">
            ⚠️ {tx.noIban}
          </div>
          <div className="px-4 py-4 divide-y divide-[#E2E8F0]">
            {[
              'Bank Name',
              'SWIFT / BIC Code',
              'Account Number',
              'Account Holder',
              'Bank Address',
            ].map(label => (
              <div key={label} className="flex items-center gap-3 py-3">
                <span className="text-sm text-[#6B7280] w-36 shrink-0">{label}</span>
                <span className="text-sm text-[#C0CDD8]">여기에 영문이 표시됩니다.</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
          <div className="bg-[#EEF2FA] px-4 py-2.5">
            <span className="text-sm font-semibold text-[#1B2B6E]">{tx.resultTitle}</span>
          </div>

          {/* IBAN 미사용 안내 */}
          <div className="mx-4 mt-4 bg-[#FFF8EC] border border-[#F5C842] rounded-lg px-4 py-2.5 text-xs text-[#92600A]">
            ⚠️ {tx.noIban}
          </div>

          <div className="px-4 py-4 divide-y divide-[#E2E8F0]">
            {fields.map(({ label, value, sub, url }) => (
              <div key={label} className="flex items-start gap-3 py-3">
                <span className="text-sm text-[#6B7280] w-36 shrink-0 pt-0.5">{label}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-base font-[Inter] font-medium text-[#1A1A1A]">{value}</span>
                    <CopyButton value={value} />
                  </div>
                  {sub && (
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-[#5A6A7A]">{sub}</p>
                      {url && (
                        <a href={url} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-[#1B6EBE] hover:underline shrink-0 whitespace-nowrap">
                          {label === 'SWIFT / BIC Code' ? '은행 공식 사이트에서 확인 →' : '바로가기 →'}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-16 space-y-10">
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">이용 방법</h2>
          <ol className="space-y-2 text-sm text-[#5A6A7A] list-decimal list-inside">
            <li>은행을 선택합니다.</li>
            <li>계좌번호를 숫자만 입력합니다.</li>
            <li>예금주 영문명을 입력합니다. (여권 표기 기준)</li>
            <li>확인 버튼을 클릭하면 해외 사이트 입력 양식이 표시됩니다.</li>
            <li>각 항목 옆 복사 버튼을 눌러 해외 사이트에 붙여넣으세요.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">해외 사이트 계좌 입력 양식 안내</h2>
          <div className="bg-white rounded-lg border border-[#D0DCE8] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium w-40">필드명</th>
                  <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium">입력할 내용</th>
                  <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium hidden sm:table-cell">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0DCE8]">
                {[
                  ['Bank Name',        '선택한 은행 영문명',              ''],
                  ['SWIFT / BIC Code', '8~11자리 은행 식별 코드',         ''],
                  ['Account Number',   '본인 계좌번호 (하이픈 제외)',      ''],
                  ['Account Holder',   '예금주 영문명 (여권 기준)',        ''],
                  ['Bank Address',     '은행 본점 영문 주소',              ''],
                  ['IBAN',            '한국 미사용',                      '빈칸 또는 N/A 입력'],
                  ['Routing Number',  '한국 미사용 (미국 전용)',           'SWIFT 코드로 대체'],
                ].map(([field, desc, note]) => (
                  <tr key={field} className={note ? 'bg-[#FFF8EC]' : ''}>
                    <td className="px-4 py-3 font-medium text-[#1B6EBE] font-[Inter]">{field}</td>
                    <td className="px-4 py-3 text-[#1A1A1A]">{desc}</td>
                    <td className="px-4 py-3 text-[#9CA3AF] text-xs hidden sm:table-cell">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SWIFT 코드 조회 링크 */}
        <div className="bg-[#EEF2FA] border border-[#D0DCE8] rounded-lg px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#1B2B6E]">SWIFT 코드 조회</p>
            <p className="text-xs text-[#5A6A7A] mt-0.5">한국 245개 금융기관 SWIFT 코드를 검색하고 복사하세요.</p>
          </div>
          <Link
            href="/swift-code"
            className="shrink-0 text-sm px-4 py-2 bg-[#1B6EBE] hover:bg-[#145A9E] text-white rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            조회하기 →
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-3">
            {faqItems.map(({ q, a, red }) => (
              <details key={q} className={`bg-white border rounded-lg ${red ? 'border-red-300' : 'border-[#D0DCE8]'}`}>
                <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-[#1A1A1A] hover:text-[#1B6EBE]">{q}</summary>
                <p className={`px-4 pb-4 text-sm font-medium ${red ? 'text-red-600' : 'text-[#5A6A7A]'}`}>{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* SWIFT 코드란? */}
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">SWIFT 코드란?</h2>
          <div className="space-y-6">

            {/* 4 핵심 포인트 */}
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: '🏦', title: '국제 은행 식별 코드', desc: 'SWIFT Code(BIC)는 전 세계 금융기관을 식별하는 8~11자리 고유 코드입니다. 국제 송금 시 수취 은행을 정확하게 지정하는 데 사용됩니다.' },
                { icon: '🌍', title: '전 세계 11,000개 이상', desc: '200개 이상 국가의 11,000개 이상 금융기관이 SWIFT 네트워크에 연결되어 있습니다. 대한민국은 245개 금융기관이 등록되어 있습니다.' },
                { icon: '🔒', title: '안전한 송금의 핵심', desc: '올바른 SWIFT Code 사용은 송금 지연이나 반송을 방지합니다. Google AdSense, PayPal 등 해외 플랫폼 계좌 등록 시에도 필수입니다.' },
                { icon: '✅', title: '한국 은행에서 확인하는 법', desc: '인터넷 뱅킹 → 해외 송금 안내, 또는 은행 공식 홈페이지에서 확인하세요. 위 Jusoen 서비스에서 은행 선택 시 바로 확인·복사할 수 있습니다.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white border border-[#D0DCE8] rounded-lg px-4 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{icon}</span>
                    <p className="text-sm font-semibold text-[#1B2B6E]">{title}</p>
                  </div>
                  <p className="text-sm text-[#5A6A7A] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* 코드 구조 시각화 */}
            <div>
              <h3 className="text-sm font-semibold text-[#1B2B6E] mb-1">SWIFT Code 구조 이해하기</h3>
              <p className="text-xs text-[#5A6A7A] mb-3">SWIFT Code는 4개의 구간으로 나뉘며, 각각 고유한 의미를 가집니다.</p>
              <div className="bg-white border border-[#D0DCE8] rounded-lg overflow-hidden">
                {/* 색상 블록 */}
                <div className="flex">
                  {[
                    { code: 'KOEX', label: 'Bank Code', bg: '#1B2B6E', fg: 'white' },
                    { code: 'KR', label: 'Country', bg: '#1B6EBE', fg: 'white' },
                    { code: 'SE', label: 'Location', bg: '#4A90D9', fg: 'white' },
                    { code: 'XXX', label: 'Branch', bg: '#EEF2FA', fg: '#1B2B6E' },
                  ].map(({ code, label, bg, fg }) => (
                    <div key={label} className="flex-1 text-center py-3 px-1" style={{ backgroundColor: bg }}>
                      <p className="text-base font-bold font-[Inter]" style={{ color: fg }}>{code}</p>
                      <p className="text-xs mt-0.5" style={{ color: fg, opacity: 0.75 }}>{label}</p>
                    </div>
                  ))}
                </div>
                {/* 설명 행 */}
                <div className="divide-y divide-[#D0DCE8]">
                  {[
                    { seg: 'KOEX', name: 'Bank Code (은행 코드)', desc: '은행을 식별하는 4자리 코드' },
                    { seg: 'KR', name: 'Country Code (국가 코드)', desc: '대한민국 — ISO 국가 코드 KR' },
                    { seg: 'SE', name: 'Location Code (지역 코드)', desc: '서울(SE) 등 도시 또는 지역을 나타내는 코드' },
                    { seg: 'XXX', name: 'Branch Code (지점 코드)', desc: 'XXX = 본점(기본 지점). 특정 지점이면 해당 코드 사용' },
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

            {/* 8자리 vs 11자리 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#D0DCE8] rounded-lg px-5 py-4">
                <p className="text-sm font-semibold text-[#1B2B6E] mb-2">8자리 SWIFT 코드</p>
                <p className="text-sm text-[#5A6A7A] leading-relaxed">은행 본점(Head Office)을 나타냅니다. 일반적인 해외 송금이나 해외 사이트 계좌 등록 시 8자리 코드를 사용해도 됩니다. 은행 내부에서 적절한 지점으로 자동 라우팅됩니다.</p>
                <p className="text-xs text-[#1B6EBE] mt-2 font-[Inter]">예: CZNBKRSE (IBK기업은행, 서울)</p>
              </div>
              <div className="bg-white border border-[#D0DCE8] rounded-lg px-5 py-4">
                <p className="text-sm font-semibold text-[#1B2B6E] mb-2">11자리 SWIFT 코드</p>
                <p className="text-sm text-[#5A6A7A] leading-relaxed">특정 지점을 나타냅니다. 마지막 3자리가 <span className="font-[Inter] font-medium">XXX</span>이면 본점과 동일합니다. 8자리 뒤에 XXX를 붙여 11자리로 사용해도 무방합니다.</p>
                <p className="text-xs text-[#1B6EBE] mt-2 font-[Inter]">예: CZNBKRSEXXX</p>
              </div>
            </div>

            {/* 한국 은행 SWIFT 코드 확인 방법 */}
            <div className="bg-white border border-[#D0DCE8] rounded-lg px-5 py-5">
              <h3 className="text-sm font-semibold text-[#1B2B6E] mb-3">한국 은행 SWIFT 코드 확인 방법</h3>
              <ol className="space-y-2 text-sm text-[#5A6A7A] list-decimal list-inside">
                <li>각 은행 공식 홈페이지 → 해외 송금 안내 페이지</li>
                <li>인터넷 뱅킹 로그인 → 계좌 정보 → 해외 송금 정보</li>
                <li>은행 앱 → 설정 또는 고객센터 메뉴</li>
                <li>은행 고객센터 전화 문의</li>
                <li>위 Jusoen 서비스에서 은행 선택 시 SWIFT 코드 즉시 확인 및 복사</li>
              </ol>
              <div className="mt-3 bg-[#FFF8EC] border border-[#F5C842] rounded px-3 py-2 text-xs text-[#92600A]">
                ⚠️ SWIFT 코드는 변경될 수 있습니다. 중요한 거래 전에는 반드시 은행 공식 사이트에서 최신 코드를 확인하세요.
              </div>
            </div>

            {/* 잘못 입력 시 */}
            <div className="bg-white border border-[#D0DCE8] rounded-lg px-5 py-5">
              <h3 className="text-sm font-semibold text-[#1B2B6E] mb-3">잘못된 SWIFT 코드를 입력하면?</h3>
              <ul className="space-y-2 text-sm text-[#5A6A7A]">
                <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">•</span>송금이 지연되거나 반송될 수 있습니다.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">•</span>반송 처리 과정에서 추가 수수료가 발생할 수 있습니다.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">•</span>처리에 수일이 걸릴 수 있으며, 자금이 일시적으로 묶일 수 있습니다.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">•</span>전혀 다른 은행으로 송금될 수 있으므로 반드시 정확하게 입력하세요.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

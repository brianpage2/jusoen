'use client'

import { useState, FormEvent } from 'react'
import CopyButton from '@/components/CopyButton'
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
    q: 'SWIFT 코드와 BIC 코드는 같은 건가요?',
    a: '네, SWIFT 코드와 BIC(Bank Identifier Code)는 동일한 코드입니다. 국제 금융 거래 시 은행을 식별하는 8~11자리 코드입니다.',
  },
  {
    q: '한국은 IBAN을 사용하나요?',
    a: '아니요, 한국은 IBAN(International Bank Account Number)을 사용하지 않습니다. 해외 송금 또는 해외 사이트 등록 시 계좌번호와 SWIFT 코드를 함께 입력하세요.',
  },
  {
    q: '예금주 영문명은 어떻게 표기하나요?',
    a: '⚠️ 예금주 영문명은 본인이 직접 거래 은행에 확인해야 합니다. 은행마다 등록된 영문명이 다를 수 있으며, 잘못 입력 시 송금 오류가 발생할 수 있습니다.',
    red: true,
  },
  {
    q: 'Routing Number가 필요한 경우는요?',
    a: 'Routing Number는 미국 은행에서 사용하는 코드입니다. 한국 은행은 Routing Number 대신 SWIFT 코드를 사용합니다.',
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
      </section>
    </>
  )
}

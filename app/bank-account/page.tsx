import type { Metadata } from 'next'
import BankAccountClient from './BankAccountClient'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '한글 계좌정보 영문으로 전환 - SWIFT 코드 확인',
  description: '해외 사이트 가입·결제 시 필요한 한국 은행 SWIFT 코드, 영문 은행명, 계좌 정보를 바로 확인하고 복사하세요.',
  alternates: { canonical: `${BASE_URL}/bank-account` },
  openGraph: {
    title: '해외 계좌 입력 정보 조회 | Jusoen',
    description: '한국 은행 SWIFT 코드와 영문 계좌 정보를 바로 확인하세요.',
    url: `${BASE_URL}/bank-account`,
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'SWIFT 코드와 BIC 코드는 같은 건가요?',
      acceptedAnswer: { '@type': 'Answer', text: '네, SWIFT 코드와 BIC(Bank Identifier Code)는 동일한 코드입니다. 국제 금융 거래 시 은행을 식별하는 8~11자리 코드입니다.' },
    },
    {
      '@type': 'Question',
      name: '한국은 IBAN을 사용하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '아니요, 한국은 IBAN을 사용하지 않습니다. 해외 송금 또는 해외 사이트 등록 시 계좌번호와 SWIFT 코드를 함께 입력하세요.' },
    },
    {
      '@type': 'Question',
      name: '예금주 영문명은 어떻게 표기하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '여권에 표기된 영문 이름을 사용하세요. 대문자로 입력하는 것이 일반적입니다. 예: 홍길동 → HONG GILDONG' },
    },
  ],
}

export default function BankAccountPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BankAccountClient />
      </main>
    </>
  )
}

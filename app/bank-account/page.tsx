import type { Metadata } from 'next'
import BankAccountClient from './BankAccountClient'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '한국 은행 SWIFT 코드 조회 · 계좌정보 영문전환',
  description: 'KB국민은행, 신한, 우리, 하나, 카카오뱅크 등 한국 은행 SWIFT 코드와 영문 은행명을 즉시 확인하세요. Google AdSense, PayPal 등 해외 사이트 계좌 등록에 필요한 정보를 한 번에 복사할 수 있습니다.',
  keywords: ['SWIFT 코드', 'BIC 코드', '한국 은행 SWIFT', '카카오뱅크 SWIFT', '국민은행 SWIFT', '계좌정보 영문', '해외 계좌 등록', 'IBAN 한국'],
  alternates: { canonical: `${BASE_URL}/bank-account` },
  openGraph: {
    title: '한국 은행 SWIFT 코드 조회 · 계좌정보 영문전환 | Jusoen',
    description: 'KB국민은행, 신한, 우리, 하나, 카카오뱅크 SWIFT 코드와 영문 계좌 정보를 즉시 확인하고 복사하세요.',
    url: `${BASE_URL}/bank-account`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '한국 은행 SWIFT 코드 조회 | Jusoen',
    description: '한국 은행 SWIFT 코드와 영문 계좌 정보를 바로 확인하고 복사하세요.',
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
      acceptedAnswer: { '@type': 'Answer', text: '아니요, 한국은 IBAN을 사용하지 않습니다. 해외 송금 또는 해외 사이트 계좌 등록 시 계좌번호와 SWIFT 코드를 함께 입력하세요.' },
    },
    {
      '@type': 'Question',
      name: '카카오뱅크 SWIFT 코드는 무엇인가요?',
      acceptedAnswer: { '@type': 'Answer', text: '카카오뱅크 SWIFT 코드는 KAKOKR22입니다. 단, SWIFT 코드는 변경될 수 있으므로 카카오뱅크 공식 사이트에서 반드시 확인하세요.' },
    },
    {
      '@type': 'Question',
      name: '예금주 영문명은 어떻게 확인하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '예금주 영문명은 거래 은행 앱에서 직접 확인하세요. 은행마다 등록된 영문명이 다를 수 있으며, 해외 송금 시 영문명이 정확하지 않으면 오류가 발생할 수 있습니다.' },
    },
    {
      '@type': 'Question',
      name: 'Routing Number는 한국 은행에도 있나요?',
      acceptedAnswer: { '@type': 'Answer', text: 'Routing Number는 미국 은행에서 사용하는 코드입니다. 한국 은행은 Routing Number 대신 SWIFT 코드를 사용합니다.' },
    },
  ],
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jusoen 계좌정보 영문전환',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  url: `${BASE_URL}/bank-account`,
  description: '한국 은행 SWIFT 코드와 영문 계좌 정보를 즉시 확인하는 무료 웹 서비스',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

export default function BankAccountPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BankAccountClient />
      </main>
    </>
  )
}

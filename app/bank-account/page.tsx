import type { Metadata } from 'next'
import BankAccountClient from './BankAccountClient'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '계좌정보 영문전환 · 해외 사이트 은행 계좌 등록',
  description: 'KB국민은행, 신한, 우리, 하나, 카카오뱅크 등 한국 은행 계좌정보를 영문으로 즉시 전환하세요. PayPal, 아마존 등 해외 사이트 계좌 등록 시 필요한 Bank Name, SWIFT 코드, Bank Address를 한 번에 복사할 수 있습니다.',
  keywords: [
    '계좌정보 영문전환', '한국 은행 영문', '해외 사이트 계좌 등록', '해외 계좌 입력',
    'PayPal 계좌 등록', '은행 영문명', 'IBAN 한국', '해외 계좌 등록',
    '국민은행 영문', '신한은행 영문', '카카오뱅크 영문', '해외 송금 계좌',
    'Bank Name 영문', 'Bank Address 한국', '해외 계좌 정보',
  ],
  alternates: { canonical: `${BASE_URL}/bank-account` },
  openGraph: {
    title: '계좌정보 영문전환 · 해외 사이트 계좌 등록 | Jusoen',
    description: '한국 은행 계좌정보를 영문으로 즉시 전환. PayPal 등 해외 사이트 계좌 등록에 필요한 모든 정보를 한 번에.',
    url: `${BASE_URL}/bank-account`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jusoen 계좌정보 영문전환' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '계좌정보 영문전환 · 해외 사이트 계좌 등록 | Jusoen',
    description: '한국 은행 계좌정보를 영문으로 즉시 전환. PayPal 등 해외 사이트 계좌 등록에 필요한 모든 정보를 한 번에.',
    images: ['/og-image.png'],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'SWIFT 코드란 무엇인가요?',
      acceptedAnswer: { '@type': 'Answer', text: 'SWIFT 코드(BIC 코드)는 국제 은행 간 금융 거래에서 각 은행을 고유하게 식별하는 8~11자리 코드입니다. SWIFT는 Society for Worldwide Interbank Financial Telecommunication의 약자로, 해외 송금 시 수취 은행을 정확하게 지정하는 데 사용됩니다.' },
    },
    {
      '@type': 'Question',
      name: 'SWIFT 코드와 BIC 코드는 같은 건가요?',
      acceptedAnswer: { '@type': 'Answer', text: '네, SWIFT 코드와 BIC(Bank Identifier Code)는 완전히 동일한 코드입니다. 두 명칭이 혼용되며, 국제 금융 거래 시 은행을 식별하는 8~11자리 코드를 가리킵니다.' },
    },
    {
      '@type': 'Question',
      name: 'SWIFT 코드 8자리와 11자리의 차이는?',
      acceptedAnswer: { '@type': 'Answer', text: '8자리 SWIFT 코드는 은행의 본점(Head Office)을 나타내고, 11자리 코드는 특정 지점을 나타냅니다. 마지막 3자리가 "XXX"인 경우 본점을 의미합니다. 일반적으로 송금 시 8자리 코드를 사용해도 본점으로 전달됩니다.' },
    },
    {
      '@type': 'Question',
      name: '한국은 IBAN을 사용하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '아니요, 한국은 IBAN(International Bank Account Number)을 사용하지 않습니다. 해외 사이트 등록 시 IBAN란은 비워두거나 N/A를 입력하고, 대신 계좌번호와 SWIFT 코드를 함께 입력하세요.' },
    },
    {
      '@type': 'Question',
      name: '예금주 영문명은 어떻게 표기하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '예금주 영문명은 본인이 직접 거래 은행에 확인해야 합니다. 은행마다 등록된 영문명이 다를 수 있으며, 잘못 입력 시 송금 오류가 발생할 수 있습니다.' },
    },
    {
      '@type': 'Question',
      name: 'Routing Number가 필요한 경우는요?',
      acceptedAnswer: { '@type': 'Answer', text: 'Routing Number는 미국 은행에서 사용하는 코드입니다. 한국 은행은 Routing Number 대신 SWIFT 코드를 사용합니다. 미국으로 송금받을 때 Routing Number를 요구받는다면 수취 미국 은행의 Routing Number를 입력하세요.' },
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

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: '계좌정보 영문전환', item: `${BASE_URL}/bank-account` },
  ],
}

export default function BankAccountPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BankAccountClient />
      </main>
    </>
  )
}

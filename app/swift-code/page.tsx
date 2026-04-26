import type { Metadata } from 'next'
import SwiftCodeClient from './SwiftCodeClient'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '한국 SWIFT 코드 조회 · BIC 코드 검색 · 245개 금융기관',
  description: 'KB국민은행 CZNBKRSE, 신한은행 SHBKKRSE, 카카오뱅크 KAKOKR22 등 한국 245개 금융기관의 SWIFT 코드(BIC 코드)를 즉시 검색하고 복사하세요. 국내은행·인터넷은행·외국계은행·증권사 모두 포함.',
  keywords: [
    'SWIFT 코드 조회', 'BIC 코드', '한국 SWIFT 코드', '은행 SWIFT 코드',
    '국민은행 SWIFT 코드', '신한은행 SWIFT 코드', '카카오뱅크 SWIFT 코드',
    '하나은행 SWIFT', '우리은행 SWIFT', '기업은행 SWIFT', '농협은행 SWIFT',
    '토스뱅크 SWIFT', '케이뱅크 SWIFT', 'SWIFT 코드 확인', 'BIC 코드 검색',
    '해외송금 SWIFT', '한국 BIC 코드',
  ],
  alternates: { canonical: `${BASE_URL}/swift-code` },
  openGraph: {
    title: '한국 SWIFT 코드 조회 · 245개 금융기관 | Jusoen',
    description: '국민·신한·카카오뱅크 등 한국 245개 금융기관 SWIFT 코드를 즉시 검색하고 복사하세요.',
    url: `${BASE_URL}/swift-code`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jusoen SWIFT 코드 조회' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '한국 SWIFT 코드 조회 · 245개 금융기관 | Jusoen',
    description: '국민·신한·카카오뱅크 등 한국 245개 금융기관 SWIFT 코드를 즉시 검색하고 복사하세요.',
    images: ['/og-image.png'],
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jusoen SWIFT 코드 조회',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  url: `${BASE_URL}/swift-code`,
  description: '한국 245개 금융기관의 SWIFT 코드(BIC 코드)를 즉시 검색하는 무료 웹 서비스',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'SWIFT 코드와 BIC 코드는 같은 건가요?',
      acceptedAnswer: { '@type': 'Answer', text: '네, 동일한 코드입니다. SWIFT는 Society for Worldwide Interbank Financial Telecommunication의 약자이고, BIC는 Bank Identifier Code의 약자입니다. 국제 금융 거래 시 은행을 식별하는 8~11자리 코드를 가리킵니다.' },
    },
    {
      '@type': 'Question',
      name: 'SWIFT 코드 8자리와 11자리의 차이는?',
      acceptedAnswer: { '@type': 'Answer', text: '8자리는 은행 본점을 나타내고, 11자리는 특정 지점을 나타냅니다. 마지막 3자리가 XXX이면 본점을 의미합니다. 일반 해외 송금 시 8자리 코드를 사용해도 무방합니다.' },
    },
    {
      '@type': 'Question',
      name: '한국은 IBAN을 사용하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '아니요. 한국은 IBAN을 사용하지 않습니다. 해외 송금 시 IBAN란은 비워두거나 N/A를 입력하고, 계좌번호와 SWIFT 코드를 함께 입력하세요.' },
    },
    {
      '@type': 'Question',
      name: '잘못된 SWIFT 코드를 입력하면 어떻게 되나요?',
      acceptedAnswer: { '@type': 'Answer', text: '송금이 지연되거나 반송될 수 있으며, 반송 처리 과정에서 추가 수수료가 발생할 수 있습니다. 반드시 은행 공식 사이트에서 최신 코드를 확인 후 입력하세요.' },
    },
    {
      '@type': 'Question',
      name: '은행 SWIFT 코드는 어디서 공식 확인하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '각 은행 공식 홈페이지 해외 송금 안내 페이지, 인터넷 뱅킹의 해외 송금 메뉴, 또는 은행 고객센터에 문의하면 확인할 수 있습니다. 중요한 거래 전에는 반드시 공식 채널에서 재확인하세요.' },
    },
    {
      '@type': 'Question',
      name: '증권사·자산운용사도 SWIFT 코드가 있나요?',
      acceptedAnswer: { '@type': 'Answer', text: '네. SWIFT 코드는 은행뿐 아니라 증권사, 자산운용사 등 SWIFT 네트워크에 연결된 모든 금융기관에 부여됩니다. 이 서비스에서 245개 한국 금융기관의 SWIFT 코드를 카테고리별로 조회할 수 있습니다.' },
    },
  ],
}

export default function SwiftCodePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <SwiftCodeClient />
      </main>
    </>
  )
}

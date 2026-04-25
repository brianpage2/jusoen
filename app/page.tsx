import type { Metadata } from 'next'
import EnglishAddressClient from './english-address/EnglishAddressClient'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '영문 도로명주소 변환 및 복사',
  description: '한글 주소를 영문 주소로 즉시 변환하고 복사하세요. Address Line 1, 2 등 해외 사이트 입력 양식에 바로 사용할 수 있습니다.',
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: '영문 도로명주소 변환 및 복사 | Jusoen',
    description: '한글 주소를 영문 주소로 즉시 변환하고 복사하세요.',
    url: BASE_URL,
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '영문 주소 변환 결과가 정확한가요?',
      acceptedAnswer: { '@type': 'Answer', text: '대한민국 행정안전부의 공식 도로명주소 API를 사용하여 변환합니다. 공식 영문 도로명주소 체계를 따르므로 신뢰할 수 있습니다.' },
    },
    {
      '@type': 'Question',
      name: 'Address Line 2는 무엇을 입력하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '아파트 동/호수, 건물명 등 상세 주소를 입력합니다. 예: Apt 1201 또는 Unit 5B. 해당 정보가 없다면 비워두어도 됩니다.' },
    },
    {
      '@type': 'Question',
      name: '지번 주소와 도로명 주소 중 어떤 것을 써야 하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '해외 우편 및 서비스 가입에는 도로명 주소(영문)를 사용하는 것이 공식 권장 방식입니다.' },
    },
  ],
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jusoen 영문주소 변환',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  url: BASE_URL,
  description: '한글 주소를 영문 도로명주소로 즉시 변환하는 무료 웹 서비스',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <EnglishAddressClient />
      </main>
    </>
  )
}

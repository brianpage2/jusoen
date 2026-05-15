import type { Metadata } from 'next'
import EnglishAddressClient from './english-address/EnglishAddressClient'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '영문주소 변환 · 한글 주소 영어로 · 도로명주소 확인',
  description: '한글 주소를 영문 도로명주소로 즉시 변환하세요. 아마존·이베이 배송지, 해외 직구 주소, 비자 신청, 국제 우편 발송에 필요한 Address Line 1·2, City, State, ZIP을 한 번에 복사할 수 있습니다.',
  keywords: [
    '영문주소 변환', '한글 주소 영어로', '도로명주소 영문', '영문 도로명주소', '도로명주소 확인',
    '우편번호 검색', '주소 영문 변환', '해외배송 주소', '아마존 배송 주소 영문',
    '해외 직구 영문 주소', '이베이 주소 입력', 'Address Line 1 한국',
    '한국 주소 영어', '국제배송 주소', '비자 영문주소', 'EMS 영문주소',
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: '영문주소 변환 · 한글 주소 영어로 | Jusoen',
    description: '한글 주소를 영문으로 즉시 변환. 아마존·해외 직구·비자 신청에 바로 사용 가능.',
    url: BASE_URL,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jusoen 영문주소 변환' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '영문주소 변환 · 한글 주소 영어로 | Jusoen',
    description: '한글 주소를 영문으로 즉시 변환. 아마존·해외 직구·비자 신청에 바로 사용 가능.',
    images: ['/og-image.png'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '영문 주소 변환 결과가 정확한가요?',
      acceptedAnswer: { '@type': 'Answer', text: '대한민국 행정안전부의 공식 도로명주소 API를 실시간으로 사용하여 변환합니다. 공식 영문 도로명주소 체계를 따르므로 신뢰할 수 있습니다.' },
    },
    {
      '@type': 'Question',
      name: 'Address Line 2는 무엇을 입력하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '아파트 동·호수, 건물명 등 상세주소를 직접 입력합니다. 예: 705-1104 (705동 1104호) 또는 3F (3층). 상세주소가 없다면 비워두어도 됩니다.' },
    },
    {
      '@type': 'Question',
      name: '지번 주소와 도로명 주소 중 어떤 것을 써야 하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '해외 우편 및 서비스 가입에는 도로명주소(영문)를 사용하는 것이 공식 권장 방식입니다. Jusoen은 도로명주소와 지번주소 모두 제공합니다.' },
    },
    {
      '@type': 'Question',
      name: '우편번호(ZIP Code)는 몇 자리인가요?',
      acceptedAnswer: { '@type': 'Answer', text: '한국의 우편번호는 2015년부터 5자리로 변경되었습니다. 해외 사이트 ZIP Code 입력란에 5자리 숫자를 그대로 입력하면 됩니다.' },
    },
    {
      '@type': 'Question',
      name: 'City와 State에는 무엇을 입력하나요?',
      acceptedAnswer: { '@type': 'Answer', text: 'City에는 시 영문명, State/Province에는 시·도 영문명을 입력합니다. 예: City = Seoul, State = Seoul. Jusoen이 자동으로 채워줍니다.' },
    },
    {
      '@type': 'Question',
      name: '아파트 단지 이름은 어떻게 입력하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '아파트 단지명은 공식 영문주소 변환 API에서 제공되지 않습니다. Address Line 2에 동·호수를 직접 입력하는 방식을 사용하세요. 예: 705-1104' },
    },
    {
      '@type': 'Question',
      name: 'Country는 어떻게 입력하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '한국을 선택하거나 Republic of Korea 또는 South Korea를 입력합니다. 일부 사이트는 국가 코드 KR을 사용하기도 합니다.' },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <EnglishAddressClient />
      </main>
    </>
  )
}

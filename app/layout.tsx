import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/lib/language-context'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '영문주소 변환 - 한글 주소를 영문으로 즉시 변환 | Jusoen',
    template: '%s | Jusoen',
  },
  description: '한글 주소를 영문 도로명주소로 즉시 변환하고 복사하세요. 해외 사이트 가입, 국제 배송, 서류 작성에 필요한 Address Line 1, 2, City, State, ZIP 형식으로 제공합니다.',
  keywords: [
    '영문주소 변환', '한글주소 영문변환', '영문 도로명주소', '도로명주소 확인', '도로명주소 영문',
    '영문주소', '한국주소 영어', '우편번호 검색', '도로명 영문주소', '주소 영문 변환',
    '해외배송 주소', 'Address Line 1', '해외 직구 주소', '영문 주소 형식',
    'SWIFT 코드', '한국 SWIFT 코드', '카카오뱅크 SWIFT', '계좌정보 영문', 'IBAN 한국',
    '은행 영문명', 'BIC 코드', '해외 계좌 등록', '해외송금 정보',
  ],
  openGraph: {
    title: '영문주소 변환 | Jusoen',
    description: '한글 주소를 영문 주소로 즉시 변환하고 복사하세요.',
    url: BASE_URL,
    siteName: 'Jusoen',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jusoen' }],
  },
  twitter: {
    card: 'summary',
    title: '영문주소 변환 | Jusoen',
    description: '한글 주소를 영문 주소로 즉시 변환하고 복사하세요.',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Jusoen',
  url: BASE_URL,
  description: '영문주소 변환, SWIFT 코드 조회, 계좌정보 영문전환을 한 곳에서 제공하는 무료 서비스',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Jusoen',
  url: BASE_URL,
  email: 'brianpage.kr@gmail.com',
  description: '해외 서비스 이용에 필요한 영문 정보를 즉시 확인할 수 있는 무료 한국 주소·금융 정보 서비스',
  sameAs: [`${BASE_URL}/about`],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

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
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: '영문주소 변환 | Jusoen',
    description: '한글 주소를 영문 주소로 즉시 변환하고 복사하세요.',
    url: BASE_URL,
    siteName: 'Jusoen',
    locale: 'ko_KR',
    type: 'website',
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
  description: '한글 주소를 영문 도로명주소로 즉시 변환하는 무료 서비스',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/english-address?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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

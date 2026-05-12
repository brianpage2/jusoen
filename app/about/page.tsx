import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '서비스 소개 — Jusoen 영문주소 변환 · SWIFT 코드 조회',
  description: 'Jusoen은 영문 도로명주소 변환, 한국 SWIFT 코드 조회(177개 금융기관), 계좌정보 영문전환을 무료로 제공합니다. 해외 쇼핑·송금·서류 작성에 필요한 모든 영문 정보를 한 곳에서.',
  keywords: [
    '주소원 서비스 소개', '영문주소 변환 서비스', 'SWIFT 코드 조회 서비스',
    '계좌정보 영문전환', '한국 영문주소', '해외 사이트 주소 입력',
    '행정안전부 API 주소', '무료 영문주소', 'jusoen',
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: '서비스 소개 | Jusoen',
    description: '영문주소 변환, SWIFT 코드 조회, 계좌정보 영문전환을 한 곳에서 무료로.',
    url: `${BASE_URL}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '서비스 소개 | Jusoen',
    description: '영문주소 변환, 한국 SWIFT 코드 조회, 계좌정보 영문전환을 무료로 제공하는 서비스입니다.',
  },
}

const services = [
  {
    num: '①',
    title: '영문 도로명주소 변환',
    href: '/',
    desc: '한글 주소를 입력하면 공식 영문 도로명주소와 해외 사이트 입력 양식(Address Line 1·2, City, State/Province, ZIP Code, Country)을 즉시 확인하고 복사할 수 있습니다. 행정안전부 공식 API를 사용합니다.',
    badge: '행정안전부 공식 API',
  },
  {
    num: '②',
    title: 'SWIFT 코드 조회',
    href: '/swift-code',
    desc: '국내은행·인터넷은행·외국계 은행·증권사 등 한국 177개 금융기관의 SWIFT 코드(BIC 코드)를 즉시 검색하고 복사할 수 있습니다. 카테고리 필터와 실시간 검색을 지원합니다.',
    badge: '177개 금융기관',
  },
  {
    num: '③',
    title: '계좌정보 영문전환',
    href: '/bank-account',
    desc: '해외 사이트에서 한국 은행 계좌 등록 시 필요한 Bank Name(영문), SWIFT/BIC Code, Bank Address(영문)를 즉시 확인하고 항목별로 복사할 수 있습니다. Google AdSense·PayPal 계좌 등록에 활용하세요.',
    badge: '21개 주요 은행',
  },
]

const useCases = [
  { icon: '🛒', text: '아마존·이베이 등 해외 쇼핑몰 배송 주소 입력' },
  { icon: '💸', text: 'Google AdSense·PayPal 등 해외 서비스 계좌 등록' },
  { icon: '📦', text: '해외 직구·배송대행 영문 배송지 작성' },
  { icon: '🛂', text: '비자 신청·해외 카드 서비스 가입 시 주소 기재' },
  { icon: '✉️', text: '국제 우편·EMS·DHL·FedEx 발송 라벨 작성' },
  { icon: '🏫', text: '해외 학교·기관 서류 한국 주소 영문 기재' },
  { icon: '🏦', text: '해외 송금 수취 은행 SWIFT 코드 확인' },
  { icon: '🌏', text: '외국인이 한국 주소·은행 정보를 영문으로 확인' },
]

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '서비스 소개 | Jusoen',
  url: `${BASE_URL}/about`,
  description: '영문주소 변환, SWIFT 코드 조회, 계좌정보 영문전환 서비스 소개',
  publisher: {
    '@type': 'Organization',
    name: 'Jusoen',
    url: BASE_URL,
    email: 'brianpage.kr@gmail.com',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: '서비스 소개', item: `${BASE_URL}/about` },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">서비스 소개</h1>
        <div className="flex items-center gap-3 mb-10">
          <p className="text-sm text-[#5A6A7A]">jusoen.co.kr — 해외 서비스에 필요한 한국 영문 정보를 한 번에</p>
          <span className="text-xs text-[#9CA3AF] shrink-0">최종 업데이트: 2026.04.26</span>
        </div>

        <div className="space-y-10 text-sm text-[#5A6A7A] leading-relaxed">

        {/* 서비스 개요 */}
        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">Jusoen은 어떤 서비스인가요?</h2>
          <p>
            Jusoen(주소원)은 해외 사이트 가입, 국제 배송, 해외 송금 등 외국 서비스를 이용할 때 필요한
            한국 영문 정보를 한 화면에서 즉시 확인하고 복사할 수 있는 <strong className="text-[#1A1A1A]">무료 웹 서비스</strong>입니다.
          </p>
          <p className="mt-2">
            복잡한 영문주소 변환부터 한국 SWIFT 코드 조회, 계좌정보 영문전환까지 — 해외에서 한국 정보를
            입력할 때 필요한 모든 것을 제공합니다. 회원가입 없이 바로 사용할 수 있으며 완전 무료입니다.
          </p>

          {/* 통계 배지 */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              '행정안전부 공식 API 연동',
              '한국 177개 금융기관 SWIFT 코드',
              '21개 주요 은행 지원',
              '회원가입 없이 무료',
            ].map(t => (
              <span key={t} className="text-xs bg-[#EEF2FA] text-[#1B2B6E] px-3 py-1 rounded-full font-medium">{t}</span>
            ))}
          </div>
        </section>

        {/* 제공 서비스 */}
        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">제공 서비스</h2>
          <div className="space-y-3">
            {services.map(({ num, title, href, desc, badge }) => (
              <div key={num} className="bg-[#F5F7FA] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-semibold text-[#1B2B6E]">{num} {title}</h3>
                  <span className="text-xs bg-[#1B2B6E] text-white px-2 py-0.5 rounded-full">{badge}</span>
                  <Link href={href} className="text-xs text-[#1B6EBE] hover:underline ml-auto">바로가기 →</Link>
                </div>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 이런 분께 */}
        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">이런 분께 유용합니다</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {useCases.map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-2 bg-[#F5F7FA] rounded-lg px-3 py-2.5">
                <span className="shrink-0">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 데이터 신뢰성 */}
        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">데이터 신뢰성</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#1B6EBE] shrink-0 mt-0.5">•</span>
              <span><strong className="text-[#1A1A1A]">영문주소</strong>: 대한민국 행정안전부 공식 도로명주소 API 실시간 조회 (juso.go.kr)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1B6EBE] shrink-0 mt-0.5">•</span>
              <span><strong className="text-[#1A1A1A]">SWIFT 코드</strong>: 각 은행 공식 사이트 및 국제 금융 데이터 기준으로 제공. 반드시 은행 공식 사이트에서 최신 코드 재확인 권장</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1B6EBE] shrink-0 mt-0.5">•</span>
              <span><strong className="text-[#1A1A1A]">계좌정보</strong>: 계좌번호는 서버에 저장·전송되지 않으며 화면 표시 전용으로만 사용됩니다</span>
            </li>
          </ul>
          <div className="mt-3 bg-[#FFF8EC] border border-[#F5C842] rounded px-3 py-2 text-xs text-[#92600A]">
            ⚠️ 중요한 서류 제출 또는 금융 거래 전에는 juso.go.kr 및 각 은행 공식 사이트에서 반드시 재확인하시기 바랍니다.
          </div>
        </section>

        {/* 이용 유의사항 */}
        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">이용 시 유의사항</h2>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>아파트 동·호수 등 상세주소는 결과에 포함되지 않습니다. Address Line 2에 직접 입력하세요.</li>
            <li>예금주 영문명은 본인 거래 은행 앱에서 직접 확인하셔야 합니다.</li>
            <li>신축 건물 또는 최근 변경된 도로명은 검색 결과에 반영되지 않을 수 있습니다.</li>
          </ul>
        </section>

        {/* 운영자 */}
        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">운영자 정보</h2>
          <div className="bg-[#F5F7FA] rounded-lg px-4 py-4 space-y-1">
            <p><strong className="text-[#1A1A1A]">서비스명</strong>: Jusoen (jusoen.co.kr)</p>
            <p><strong className="text-[#1A1A1A]">운영자</strong>: Brian Page</p>
            <p><strong className="text-[#1A1A1A]">이메일</strong>: brianpage.kr@gmail.com</p>
            <p><strong className="text-[#1A1A1A]">서비스 시작</strong>: 2026년 4월</p>
            <p><strong className="text-[#1A1A1A]">데이터 출처</strong>: 대한민국 행정안전부 공식 도로명주소 API, theswiftcodes.com</p>
            <p><strong className="text-[#1A1A1A]">URL</strong>: <a href="https://jusoen.co.kr" className="text-[#1B6EBE] hover:underline">https://jusoen.co.kr</a></p>
          </div>
        </section>
        </div>
      </main>
    </>
  )
}


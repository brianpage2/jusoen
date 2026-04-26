import type { Metadata } from 'next'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '개인정보처리방침 | Jusoen',
  description: 'Jusoen(jusoen.co.kr) 개인정보처리방침입니다. 수집 정보, 쿠키 정책, Google AdSense 광고 및 제3자 서비스 이용에 관한 안내를 확인하세요.',
  keywords: ['개인정보처리방침', 'jusoen 개인정보', '쿠키 정책', 'Google AdSense 개인정보'],
  alternates: { canonical: `${BASE_URL}/privacy` },
  openGraph: {
    title: '개인정보처리방침 | Jusoen',
    description: 'Jusoen 서비스의 개인정보 수집·이용·보호 방침을 안내합니다.',
    url: `${BASE_URL}/privacy`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '개인정보처리방침 | Jusoen',
    description: 'Jusoen 서비스의 개인정보 수집·이용·보호 방침을 안내합니다.',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: '개인정보처리방침', item: `${BASE_URL}/privacy` },
  ],
}

export default function PrivacyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">개인정보처리방침</h1>
      <p className="text-xs text-[#5A6A7A] mb-8">최종 수정일: 2026년 4월 25일</p>

      <div className="space-y-8 text-sm text-[#5A6A7A] leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">1. 개요</h2>
          <p>
            jusoen.co.kr(이하 "서비스")은 이용자의 개인정보 보호를 중요하게 여기며,
            「개인정보 보호법」 및 관련 법령을 준수합니다.
            본 개인정보처리방침은 서비스 이용 과정에서 수집되는 정보의 종류, 수집 목적, 처리 방식 및 이용자의 권리를 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">2. 수집하는 정보</h2>
          <p>
            본 서비스는 회원가입 없이 이용 가능하며, 별도의 개인정보를 수집하지 않습니다.
            검색창에 입력하는 주소는 주소 변환 결과 제공을 위해 행정안전부 API 서버로 전달되며, 당사 서버에는 저장되지 않습니다.
          </p>
          <p className="mt-2">다만, 서비스 운영 과정에서 아래 정보가 자동 수집될 수 있습니다.</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>접속 IP 주소, 브라우저 종류 및 버전</li>
            <li>운영체제 정보, 방문 페이지, 방문 일시</li>
            <li>서비스 이용 기록 및 검색 로그</li>
            <li>쿠키 및 광고 관련 자동 수집 정보</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">3. 쿠키 정책</h2>
          <p>
            본 서비스는 이용자 경험 개선 및 광고 제공을 위해 쿠키(Cookie)를 사용합니다.
            쿠키는 이용자의 브라우저에 저장되는 소규모 텍스트 파일로, 이용자가 서비스를 재방문할 때 브라우저가 이를 읽어 서비스에 전송합니다.
          </p>
          <p className="mt-2">이용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다. 단, 쿠키를 거부할 경우 일부 서비스 이용이 제한될 수 있습니다.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">4. 광고 및 제3자 광고업체</h2>
          <p>
            본 서비스는 Google AdSense를 통해 광고를 게재합니다.
            Google을 포함한 제3자 광고업체는 이용자의 이전 방문 기록을 기반으로 맞춤형 광고를 표시하기 위해 쿠키(DART 쿠키 포함)를 사용할 수 있습니다.
          </p>
          <p className="mt-2">
            Google의 광고 쿠키 사용에 관한 자세한 내용은{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#1B6EBE] hover:underline">
              Google 광고 및 개인정보 보호 정책
            </a>
            을 참고하시기 바랍니다.
          </p>
          <p className="mt-2">
            맞춤형 광고를 원하지 않는 경우{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#1B6EBE] hover:underline">
              Google 광고 설정
            </a>
            에서 맞춤 광고를 비활성화하거나,{' '}
            <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#1B6EBE] hover:underline">
              NAI 옵트아웃 페이지
            </a>
            를 통해 제3자 광고업체의 쿠키 사용을 거부할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">5. 제3자 서비스</h2>
          <p>
            본 서비스는 주소 변환을 위해 대한민국 행정안전부의 공식 도로명주소 API를 사용합니다.
            검색 시 입력한 키워드는 주소 검색 목적으로만 해당 API 서버에 전달되며, 이 외의 용도로 사용되지 않습니다.
          </p>
          <p className="mt-2">
            계좌정보 영문전환 서비스에서 입력하는 계좌번호 및 예금주명은 화면 표시 목적으로만 사용되며,
            당사 서버에 저장되거나 외부로 전송되지 않습니다.
          </p>
          <p className="mt-2">
            수집된 정보는 어떠한 경우에도 제3자에게 판매되거나 임의로 제공되지 않습니다.
            단, 법령에 따라 수사기관 등의 요청이 있는 경우 관련 법령에 따라 제공할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">6. 정보의 보유 및 파기</h2>
          <p>
            본 서비스는 이용자의 개인정보를 별도로 저장하지 않습니다.
            서버 로그는 보안 및 서비스 운영 목적으로 일정 기간 보관 후 자동 파기됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">7. 미성년자 보호</h2>
          <p>
            본 서비스는 만 14세 미만의 아동으로부터 의도적으로 개인정보를 수집하지 않습니다.
            만 14세 미만의 이용자는 보호자의 동의 하에 서비스를 이용하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">8. 이용자의 권리</h2>
          <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>개인정보 처리 현황 열람 요청</li>
            <li>개인정보 처리 정지 요청</li>
            <li>개인정보 삭제 요청</li>
            <li>개인정보 처리 관련 불만 제기</li>
          </ul>
          <p className="mt-2">관련 문의는 아래 연락처로 접수해주세요.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">9. 방침 변경</h2>
          <p>
            본 개인정보처리방침은 법령 변경 또는 서비스 정책 변경에 따라 수정될 수 있습니다.
            변경 시 페이지 상단의 최종 수정일을 업데이트하며, 중요한 변경 사항은 서비스 내 공지를 통해 사전 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">10. 문의</h2>
          <p>개인정보 관련 문의사항은 아래로 연락해주세요.</p>
          <p className="mt-1">운영자: Brian Page</p>
          <p className="mt-1">이메일: brianpage.kr@gmail.com</p>
          <p className="mt-1">처리 기간: 접수 후 영업일 기준 3일 이내 답변</p>
        </section>
      </div>
    </main>
    </>
  )
}

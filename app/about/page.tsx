import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서비스 소개 | Jusoen',
  description: 'Jusoen은 한글 주소를 영문 도로명주소로 변환해주는 무료 서비스입니다. 대한민국 행정안전부 공식 API를 사용합니다.',
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">서비스 소개</h1>
      <p className="text-xs text-[#5A6A7A] mb-8">jusoen.co.kr — 한글 주소를 영문으로, 간단하고 정확하게</p>

      <div className="space-y-8 text-sm text-[#5A6A7A] leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">서비스 소개</h2>
          <p>
            jusoen.co.kr은 한글 주소를 영문 도로명주소로 즉시 변환하고 복사할 수 있는 무료 웹 서비스입니다.
            해외 직구, 국제 배송, 비자 신청, 해외 서비스 가입 등 영문 주소가 필요한 모든 상황에서 편리하게 사용할 수 있습니다.
          </p>
          <p className="mt-2">
            검색창에 한글 주소를 입력하면 공식 영문 도로명주소와 함께 해외 사이트 입력 양식(Address Line 1·2, City, State/Province, ZIP Code, Country)을 한 화면에서 즉시 확인하고 복사할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">데이터 신뢰성</h2>
          <p>
            모든 주소 변환은 대한민국 행정안전부에서 운영하는 공식 도로명주소 API 및 영문주소 API를 통해 이루어집니다.
            정부 공공 데이터를 실시간으로 조회하므로 민간 서비스나 수기 번역과 달리 오류 가능성이 낮고, 해외 우편·공식 서류에 사용할 수 있는 수준의 정확성을 제공합니다.
          </p>
          <p className="mt-2">
            단, 신축 건물·도로 등 최신 데이터가 반영되지 않은 경우 결과가 일치하지 않을 수 있습니다. 중요한 서류 제출 시에는 행정안전부 도로명주소 공식 사이트(juso.go.kr)에서 재확인하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">주요 기능</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>한글 주소 검색 → 공식 영문 도로명주소 즉시 변환</li>
            <li>도로명주소·지번주소·영문주소 동시 표시</li>
            <li>해외 사이트 입력 양식 자동 분리 제공</li>
            <li>각 항목 개별 복사 버튼 제공</li>
            <li>동·층·호 상세주소 표기방법 안내</li>
            <li>우편번호(5자리) 표시 및 복사</li>
            <li>한국어·영어 인터페이스 전환 지원</li>
            <li>모바일·PC 모두 지원</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">이런 분께 유용합니다</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>아마존, 이베이 등 해외 쇼핑몰에서 배송 주소를 입력하는 분</li>
            <li>해외 직구 배송대행지 주소 등록이 필요한 분</li>
            <li>비자 신청, 해외 은행·카드 서비스 가입 시 주소가 필요한 분</li>
            <li>국제 우편·EMS·DHL 발송 시 영문 주소가 필요한 분</li>
            <li>외국인이 한국 주소를 영문으로 확인해야 하는 경우</li>
            <li>해외 학교·기관 서류에 한국 주소를 기재해야 하는 분</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">이용 방법</h2>
          <ol className="list-decimal list-inside space-y-1.5">
            <li>검색창에 한글 주소를 입력합니다. (예: 서울 강남구 테헤란로 152)</li>
            <li>검색 결과에서 원하는 주소의 <strong className="text-[#1B6EBE]">영문펼치기</strong> 버튼을 클릭합니다.</li>
            <li>영문주소 및 해외 사이트 입력 양식을 확인합니다.</li>
            <li>각 항목 옆 복사 버튼을 눌러 클립보드에 복사한 후 붙여넣습니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">이용 시 유의사항</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>아파트 동·호수 등 상세주소는 결과에 포함되지 않을 수 있습니다. Address Line 2에 직접 입력하세요.</li>
            <li>영문주소는 공식 도로명주소 체계를 따르며, 해외 우편물 발송 시 권장되는 형식입니다.</li>
            <li>신축 건물 또는 최근 변경된 도로명은 검색 결과에 반영되지 않을 수 있습니다.</li>
            <li>본 서비스는 참고용이며, 공식 서류 제출 시 juso.go.kr에서 재확인을 권장합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">운영자 정보</h2>
          <p>서비스명: jusoen.co.kr</p>
          <p className="mt-1">운영자: Brian Page</p>
          <p className="mt-1">이메일: brianpage.kr@gmail.com</p>
          <p className="mt-1">URL: https://jusoen.co.kr</p>
        </section>
      </div>
    </main>
  )
}

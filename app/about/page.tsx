import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서비스 소개 | Jusoen',
  description: 'Jusoen은 영문주소 변환, 계좌정보 영문전환 등 해외 서비스 이용에 필요한 정보를 한 곳에서 제공하는 무료 웹 서비스입니다.',
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">서비스 소개</h1>
      <p className="text-xs text-[#5A6A7A] mb-8">jusoen.co.kr — 해외 서비스 이용에 필요한 정보를 한 번에</p>

      <div className="space-y-8 text-sm text-[#5A6A7A] leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">Jusoen은 어떤 서비스인가요?</h2>
          <p>
            jusoen.co.kr은 해외 사이트 가입, 국제 배송, 해외 송금 등 외국 서비스를 이용할 때 필요한 정보를
            한 화면에서 즉시 확인하고 복사할 수 있는 무료 웹 서비스입니다.
          </p>
          <p className="mt-2">
            복잡한 영문주소 변환부터 은행 SWIFT 코드 조회까지, 해외에서 한국 정보를 입력할 때 필요한 모든 것을 제공합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">제공 서비스</h2>

          <div className="space-y-4">
            <div className="bg-[#F5F7FA] rounded-lg p-4">
              <h3 className="font-semibold text-[#1B2B6E] mb-1">① 영문 도로명주소 변환</h3>
              <p>
                한글 주소를 입력하면 공식 영문 도로명주소와 해외 사이트 입력 양식(Address Line 1·2, City, State/Province, ZIP Code, Country)을
                즉시 확인하고 복사할 수 있습니다. 행정안전부 공식 API를 사용하여 정확성이 보장됩니다.
              </p>
            </div>

            <div className="bg-[#F5F7FA] rounded-lg p-4">
              <h3 className="font-semibold text-[#1B2B6E] mb-1">② 계좌정보 영문전환</h3>
              <p>
                해외 사이트에서 한국 은행 계좌 정보 입력 시 필요한 Bank Name(영문), SWIFT/BIC Code, Bank Address(영문)를
                즉시 확인할 수 있습니다. 각 항목별 복사 버튼으로 해외 사이트에 바로 붙여넣을 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">데이터 신뢰성</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong className="text-[#1A1A1A]">영문주소</strong>: 대한민국 행정안전부 공식 도로명주소 API 실시간 조회</li>
            <li><strong className="text-[#1A1A1A]">SWIFT 코드</strong>: 각 은행 공식 사이트 기준으로 제공하며, 반드시 은행 공식 사이트에서 직접 확인 권장</li>
          </ul>
          <p className="mt-3 text-xs bg-[#FFF8EC] border border-[#F5C842] rounded px-3 py-2 text-[#92600A]">
            ⚠️ 중요한 서류 제출 또는 금융 거래 시에는 juso.go.kr 및 각 은행 공식 사이트에서 반드시 재확인하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">이런 분께 유용합니다</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>아마존, 이베이 등 해외 쇼핑몰에서 배송 주소를 입력하는 분</li>
            <li>Google AdSense, PayPal 등 해외 서비스에 한국 계좌를 등록하는 분</li>
            <li>해외 직구·배송대행 이용 시 영문 주소가 필요한 분</li>
            <li>비자 신청, 해외 은행·카드 서비스 가입 시 주소가 필요한 분</li>
            <li>국제 우편·EMS·DHL 발송 시 영문 주소가 필요한 분</li>
            <li>해외 학교·기관 서류에 한국 주소를 기재해야 하는 분</li>
            <li>외국인이 한국 주소나 은행 정보를 영문으로 확인해야 하는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">이용 시 유의사항</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>아파트 동·호수 등 상세주소는 결과에 포함되지 않을 수 있습니다. Address Line 2에 직접 입력하세요.</li>
            <li>SWIFT 코드는 변경될 수 있으므로 반드시 은행 공식 사이트에서 최신 코드를 확인하세요.</li>
            <li>예금주 영문명은 본인이 거래하는 은행 앱에서 직접 확인하셔야 합니다.</li>
            <li>계좌번호는 본 서비스 서버에 저장되지 않습니다.</li>
            <li>신축 건물 또는 최근 변경된 도로명은 검색 결과에 반영되지 않을 수 있습니다.</li>
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

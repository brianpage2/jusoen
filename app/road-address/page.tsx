import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://jusoen.co.kr'

export const metadata: Metadata = {
  title: '도로명주소 소개 — 구조·읽는 법·영문 표기까지 | Jusoen',
  description: '도로명주소란 무엇인지, 지번주소와의 차이, 주소 구조 읽는 법, 영문 표기 방법까지 한 번에 알아보세요. 행정안전부 공식 체계 기준으로 정리했습니다.',
  keywords: [
    '도로명주소란', '도로명주소 구조', '도로명주소 읽는법', '도로명주소 영문', '지번주소 차이',
    '도로명주소 표기', '영문 도로명주소', '도로명주소 체계', '도로명주소 도입',
  ],
  alternates: { canonical: `${BASE_URL}/road-address` },
  openGraph: {
    title: '도로명주소 소개 | Jusoen',
    description: '도로명주소 구조, 지번주소와의 차이, 영문 표기 방법을 한 번에 정리했습니다.',
    url: `${BASE_URL}/road-address`,
    type: 'article',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: '도로명주소 소개', item: `${BASE_URL}/road-address` },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '도로명주소와 지번주소의 차이는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '지번주소는 토지 번호(지번)를 기준으로 하며 위치 파악이 어렵습니다. 도로명주소는 도로 이름과 건물 번호를 기준으로 하여 도로를 따라가면 위치를 쉽게 찾을 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '도로명주소는 언제부터 사용하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2014년 1월 1일부터 도로명주소가 법정주소로 전면 시행되었습니다. 현재 공공기관 서류, 주민등록, 우편 등 모든 공식 용도에 도로명주소를 사용합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '도로명주소를 영문으로 표기할 때 순서가 다른가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. 한글 도로명주소는 큰 단위(시·도)부터 작은 단위(건물번호) 순서지만, 영문 표기는 반대로 건물번호·도로명부터 시·도 순서로 작성합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '건물번호 뒤에 붙는 "-1"은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '주된 건물번호 외에 별도 출입구나 부속 건물이 있을 때 부여하는 부번입니다. 예를 들어 "152-1"에서 "152"가 주번, "1"이 부번입니다.',
      },
    },
  ],
}

export default function RoadAddressPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">도로명주소 소개</h1>
        <div className="flex items-center gap-3 mb-10">
          <p className="text-sm text-[#5A6A7A]">구조·읽는 법·영문 표기까지 한 번에 정리</p>
          <span className="text-xs text-[#9CA3AF] shrink-0">최종 업데이트: 2026.04.27</span>
        </div>

        <div className="space-y-10 text-sm text-[#5A6A7A] leading-relaxed">

          {/* 도로명주소란 */}
          <section>
            <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">도로명주소란?</h2>
            <p>
              도로명주소는 <strong className="text-[#1A1A1A]">도로에 이름을 붙이고, 건물에 번호를 부여</strong>하여
              만든 주소 체계입니다. 도로의 시작점에서 끝점 방향으로 왼쪽 건물은 홀수, 오른쪽 건물은 짝수 번호를
              부여하므로, 도로명과 번호만 알면 위치를 직관적으로 찾을 수 있습니다.
            </p>
            <p className="mt-2">
              2014년 1월 1일부터 법정주소로 전면 시행되어, 현재 주민등록·공공기관 서류·우편·내비게이션 등
              모든 공식 용도에 사용됩니다.
            </p>
          </section>

          {/* 지번주소 vs 도로명주소 */}
          <section>
            <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">지번주소 vs 도로명주소</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-[#F5F7FA] rounded-lg p-4">
                <p className="font-semibold text-[#1A1A1A] mb-2">지번주소 (구 주소)</p>
                <ul className="space-y-1.5">
                  {['토지 번호(지번)를 기준으로 부여', '개발·분할·합병 시 번호 불연속', '위치 파악 어려움', '예) 역삼동 752'].map(t => (
                    <li key={t} className="flex gap-2"><span className="text-[#1B6EBE] shrink-0">•</span><span>{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#EEF2FA] rounded-lg p-4">
                <p className="font-semibold text-[#1B2B6E] mb-2">도로명주소 (현행 주소)</p>
                <ul className="space-y-1.5">
                  {['도로명 + 건물번호 기준', '홀수·짝수 번호로 방향 파악 가능', '위치 직관적으로 파악 가능', '예) 테헤란로 152'].map(t => (
                    <li key={t} className="flex gap-2"><span className="text-[#1B6EBE] shrink-0">•</span><span>{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 도로명주소 구조 */}
          <section>
            <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">도로명주소 구조</h2>
            <p className="mb-4">도로명주소는 다음 순서로 구성됩니다.</p>

            <div className="bg-white border border-[#D0DCE8] rounded-lg p-5 overflow-x-auto">
              <p className="text-xs text-[#5A6A7A] mb-3 font-medium">예시: 서울특별시 강남구 테헤란로 152 (역삼동)</p>
              <svg viewBox="0 0 680 90" className="w-full min-w-[500px]" aria-label="도로명주소 구조 다이어그램">
                <rect x="0" y="10" width="110" height="36" rx="6" fill="#EEF2FA" />
                <rect x="118" y="10" width="90" height="36" rx="6" fill="#EEF2FA" />
                <rect x="216" y="10" width="110" height="36" rx="6" fill="#1B6EBE" />
                <rect x="334" y="10" width="70" height="36" rx="6" fill="#1B2B6E" />
                <rect x="412" y="10" width="110" height="36" rx="6" fill="#F5F7FA" stroke="#D0DCE8" strokeWidth="1" />

                <text x="55" y="32" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1B2B6E">서울특별시</text>
                <text x="163" y="32" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1B2B6E">강남구</text>
                <text x="271" y="32" textAnchor="middle" fontSize="13" fontWeight="600" fill="#ffffff">테헤란로</text>
                <text x="369" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">152</text>
                <text x="467" y="32" textAnchor="middle" fontSize="12" fill="#5A6A7A">(역삼동)</text>

                <text x="55" y="70" textAnchor="middle" fontSize="10" fill="#9CA3AF">시·도</text>
                <text x="163" y="70" textAnchor="middle" fontSize="10" fill="#9CA3AF">시·군·구</text>
                <text x="271" y="70" textAnchor="middle" fontSize="10" fill="#1B6EBE" fontWeight="500">도로명</text>
                <text x="369" y="70" textAnchor="middle" fontSize="10" fill="#1B2B6E" fontWeight="500">건물번호</text>
                <text x="467" y="70" textAnchor="middle" fontSize="10" fill="#9CA3AF">참고항목</text>
              </svg>
            </div>

            <div className="mt-4 space-y-2">
              {[
                ['시·도', '광역자치단체. 서울특별시, 경기도, 부산광역시 등'],
                ['시·군·구', '기초자치단체. 강남구, 수원시, 해운대구 등'],
                ['도로명', '해당 도로에 부여된 고유 이름. 대로·로·길 단위로 구분'],
                ['건물번호', '도로 시작점 기준으로 순서대로 부여. 홀수=왼쪽, 짝수=오른쪽'],
                ['참고항목', '동·리 이름 등 위치 참고용. 법적 효력 없음'],
              ].map(([term, desc]) => (
                <div key={term} className="flex gap-3">
                  <span className="shrink-0 font-semibold text-[#1B6EBE] w-20">{term}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 도로 종류 */}
          <section>
            <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">도로 종류: 대로·로·길</h2>
            <div className="bg-white border border-[#D0DCE8] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F5F7FA]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium w-16">종류</th>
                    <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium">기준</th>
                    <th className="text-left px-4 py-3 text-[#5A6A7A] font-medium hidden sm:table-cell">예시</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D0DCE8]">
                  {[
                    ['대로', '왕복 8차로 이상의 넓은 도로', '강남대로, 세종대로, 올림픽대로'],
                    ['로', '왕복 2~7차로의 일반 도로', '테헤란로, 논현로, 역삼로'],
                    ['길', '소규모 도로, 골목길 등', '테헤란로22길, 강남대로94길'],
                  ].map(([type, standard, example]) => (
                    <tr key={type}>
                      <td className="px-4 py-3 font-semibold text-[#1B6EBE]">{type}</td>
                      <td className="px-4 py-3 text-[#1A1A1A]">{standard}</td>
                      <td className="px-4 py-3 text-[#5A6A7A] hidden sm:table-cell text-xs">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs">
              ※ <strong className="text-[#1A1A1A]">길</strong>은 대로·로에서 뻗어 나온 소로입니다.
              "테헤란로22길"은 테헤란로의 22번 부근에서 시작하는 골목길을 의미합니다.
            </p>
          </section>

          {/* 영문 표기 */}
          <section>
            <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">영문 도로명주소 표기 방법</h2>
            <p className="mb-4">
              영문 표기는 한글과 <strong className="text-[#1A1A1A]">순서가 반대</strong>입니다.
              한글은 큰 단위(시·도)부터 쓰지만, 영문은 작은 단위(건물번호·도로명)부터 씁니다.
              국어의 로마자 표기법에 따라 전체를 로마자로 표기합니다.
            </p>

            <div className="bg-white border border-[#D0DCE8] rounded-lg p-5 overflow-x-auto">
              <p className="text-xs text-[#5A6A7A] mb-3 font-medium">영문 변환 예시</p>
              <svg viewBox="0 0 680 110" className="w-full min-w-[500px]" aria-label="영문 도로명주소 표기 순서">
                <text x="10" y="20" fontSize="11" fill="#9CA3AF">한글</text>
                <rect x="40" y="6" width="100" height="28" rx="5" fill="#F5F7FA" stroke="#D0DCE8" strokeWidth="1" />
                <rect x="148" y="6" width="80" height="28" rx="5" fill="#F5F7FA" stroke="#D0DCE8" strokeWidth="1" />
                <rect x="236" y="6" width="100" height="28" rx="5" fill="#EEF2FA" />
                <rect x="344" y="6" width="60" height="28" rx="5" fill="#EEF2FA" />
                <text x="90" y="24" textAnchor="middle" fontSize="12" fill="#5A6A7A">서울특별시</text>
                <text x="188" y="24" textAnchor="middle" fontSize="12" fill="#5A6A7A">강남구</text>
                <text x="286" y="24" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1B6EBE">테헤란로</text>
                <text x="374" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1B2B6E">152</text>
                <text x="340" y="50" fontSize="11" fill="#9CA3AF">↓ 영문 변환</text>

                <text x="10" y="90" fontSize="11" fill="#9CA3AF">영문</text>
                <rect x="40" y="76" width="60" height="28" rx="5" fill="#1B2B6E" />
                <rect x="108" y="76" width="150" height="28" rx="5" fill="#1B6EBE" />
                <rect x="266" y="76" width="80" height="28" rx="5" fill="#EEF2FA" />
                <rect x="354" y="76" width="100" height="28" rx="5" fill="#F5F7FA" stroke="#D0DCE8" strokeWidth="1" />
                <text x="70" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">152</text>
                <text x="183" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="#ffffff">Teheran-ro,</text>
                <text x="306" y="94" textAnchor="middle" fontSize="12" fill="#1B2B6E">Gangnam-gu,</text>
                <text x="404" y="94" textAnchor="middle" fontSize="12" fill="#5A6A7A">Seoul</text>
              </svg>
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  title: '행정구역명 표기',
                  body: '국어의 로마자 표기법에 따라 로마자로 표기합니다. 특별시·광역시는 행정구역 단위(-si) 생략 가능합니다.',
                  example: '예) 서울특별시 강남구 강남대로10길 109 → 109 Gangnam-daero 10-gil, Gangnam-gu, Seoul',
                  badges: null,
                },
                {
                  title: '도로명 표기',
                  body: '로마자로 표기하며, 도로 구분은 다음과 같이 표기합니다.',
                  example: '예) 경기도 양주시 시민로5번길 18 → 18 Simin-ro 5beon-gil, Yangju-si, Gyeonggi-do',
                  badges: [['대로', '-daero'], ['로', '-ro'], ['길', '-gil'], ['번길', '-beon-gil']],
                },
                {
                  title: '상세주소(동·층·호) 표기',
                  body: '로마자 표기를 원칙으로 하되, 아래와 같이 영어식 표기도 허용됩니다.',
                  example: '예) 705동 1104호 → 705-dong 1104-ho 또는 705-1104 / 3층 → 3-cheung 또는 3F',
                  badges: [['동', '-dong'], ['층', '-cheung / F'], ['호', '-ho'], ['지하', 'B']],
                },
                {
                  title: '참고항목(법정동·공동주택명) 표기',
                  body: '간결한 표기를 위해 생략할 수 있습니다. 필요한 경우 상세주소 앞에 괄호로 표기합니다.',
                  example: '예) 경상남도 통영시 학림1길 수상11-32 → W11-32 Hangnim 1-gil, Tongyeong-si, Gyeongsangnam-do',
                  badges: null,
                },
              ].map(({ title, body, example, badges }) => (
                <div key={title} className="bg-[#F5F7FA] rounded-lg p-4">
                  <p className="font-semibold text-[#1A1A1A] mb-2">{title}</p>
                  <p>{body}</p>
                  {badges && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {badges.map(([k, v]) => (
                        <span key={k} className="text-xs bg-white border border-[#D0DCE8] rounded px-2 py-1 font-[Inter]">
                          {k} → <strong>{v}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-[#5A6A7A] font-[Inter] mt-2">{example}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">자주 묻는 질문</h2>
            <div className="space-y-3">
              {[
                {
                  q: '도로명주소와 지번주소의 차이는 무엇인가요?',
                  a: '지번주소는 토지 번호(지번)를 기준으로 하며 위치 파악이 어렵습니다. 도로명주소는 도로 이름과 건물 번호를 기준으로 하여 도로를 따라가면 위치를 쉽게 찾을 수 있습니다.',
                },
                {
                  q: '도로명주소는 언제부터 사용하나요?',
                  a: '2014년 1월 1일부터 도로명주소가 법정주소로 전면 시행되었습니다. 현재 공공기관 서류, 주민등록, 우편 등 모든 공식 용도에 도로명주소를 사용합니다.',
                },
                {
                  q: '도로명주소를 영문으로 표기할 때 순서가 다른가요?',
                  a: '네. 한글 도로명주소는 큰 단위(시·도)부터 작은 단위(건물번호) 순서지만, 영문 표기는 반대로 건물번호·도로명부터 시·도 순서로 작성합니다.',
                },
                {
                  q: '건물번호 뒤에 붙는 "-1"은 무엇인가요?',
                  a: '주된 건물번호 외에 별도 출입구나 부속 건물이 있을 때 부여하는 부번입니다. 예를 들어 "152-1"에서 "152"가 주번, "1"이 부번입니다.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="bg-[#F5F7FA] rounded-lg p-4">
                  <p className="font-semibold text-[#1A1A1A] mb-1.5">Q. {q}</p>
                  <p>A. {a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 바로가기 */}
          <section className="bg-[#EEF2FA] rounded-lg p-5">
            <p className="font-semibold text-[#1B2B6E] mb-3">영문주소가 필요하다면 바로 변환해보세요</p>
            <p className="mb-4">주소를 검색하면 공식 영문 도로명주소와 해외 사이트 입력 양식을 즉시 확인할 수 있습니다.</p>
            <Link
              href="/"
              className="inline-block bg-[#1B6EBE] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#145A9E] transition-colors"
            >
              영문주소 변환하러 가기 →
            </Link>
          </section>

        </div>
      </main>
    </>
  )
}

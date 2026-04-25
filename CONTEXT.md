# Jusoen 프로젝트 컨텍스트

이 파일은 대화 간 맥락 유지를 위한 기록이다. 새 대화를 시작할 때 반드시 읽어라.
대화 중 새로운 결정, 자료, 진행상황이 생기면 즉시 이 파일에 기록한다.

---

## 프로젝트 개요

- 서비스명: Jusoen
- 도메인: jusoen.co.kr (구입 예정)
- 목적: 한글 주소 검색 → 영문 주소 확인 → 바로 복사. 한 페이지에서 끝.
- **최종 목표: Google 검색 노출 → AdSense 승인 → 광고 수익화**
  - 모든 작업은 이 목표를 기준으로 판단한다
  - SEO, Core Web Vitals, 콘텐츠 품질, 신뢰 페이지(About·Privacy)는 AdSense 승인 조건이므로 절대 소홀히 하지 않는다
  - 페이지 구조·콘텐츠·메타데이터는 Google Search Central 기준을 우선으로 한다

---

## 현재 구현 상태 (2026-04-25 기준)

### 완료된 것
- `/english-address` — 영문주소 변환 메인 기능 (검색 → 결과 → 복사)
- `/about`, `/privacy` — AdSense 대비 신뢰 페이지
- `app/api/search/route.ts` — 도로명주소 검색 API + 영문주소 API 동시 호출 및 병합
- `lib/juso.ts` — API 타입 정의 및 주소 파싱 로직
- `components/` — Header, Footer, SearchBox, ResultCard, CopyButton, LanguageToggle
- `lib/language-context.tsx` — 한글/English 전환 Context
- `sitemap.ts`, `robots.ts` — SEO 기본 설정
- SQL 키워드 필터링, UTF-8 인코딩 처리
- JSON-LD 구조화 데이터 (WebSite, FAQPage, SoftwareApplication)
- canonical URL, Twitter Card, OpenGraph 메타 완비
- 헤더 한글/English 토글 — Hero·ResultCard 텍스트 전환
- ResultCard: 1번째만 펼침, 나머지 접힘 상태로 시작
- 펼치기 버튼 텍스트: "영문펼치기" / "접기"
- 우편번호 레이아웃 확정: 라벨 → 숫자 → 복사버튼 세로 고정
- 도로명/지번 행 남색 배경(`#EEF2FA`), 지번 행 `#F4F6FB`
- 섹션 헤더(도로명주소·지번주소·해외 사이트 입력)에 `#EEF2FA` 배경
- 전체 폰트 18px 기준
- State → State / Province 라벨 변경
- "해외 사이트 입력용" → "해외 사이트 입력"

### 추가 완료 (2026-04-25)
- GitHub 연결 (brianpage2/jusoen, private)
- Vercel 배포 완료 (jusoen.co.kr 도메인 연결)
- 도로명주소 검색 API + 영문주소 API 승인키 발급 및 연동
- 지도제공 검색 API 승인키 발급 및 연동 (iframe 방식, CSS 충돌 방지)
- 지도보기/접기 버튼 (ResultCard 인라인 확장)
- 모바일 최적화 (폰트 16px/18px 분리, 헤더 언어토글 항상 표시, 레이아웃 개선)
- City 필드 로직: 도(province)는 sggNm, 광역시는 siNm
- Address Line 1에 emdNm(읍/면/동) 포함
- 펼침 영역: 영문주소만 표시 (한글 행 제거), 메인카드 스타일 통일
- 빨간 핀 아이콘(icon_loc.png) 커스텀 적용
- 번호(1,2,3)가 카드 전체 높이에 걸쳐 표시

### 미완료 / 대기 중
- 영문 계좌 입력 서비스 (/bank-account) — 기획 완료, 구현 예정
- Google AdSense 신청 (2~4주 후 권장)

---

## API 관련 결정사항

### 사용하는 API
| API | 엔드포인트 |
|---|---|
| 도로명주소 검색 | `https://business.juso.go.kr/addrlink/addrLinkApi.do` |
| 영문주소 | `https://business.juso.go.kr/addrlink/addrEngApi.do` |

### 보류한 API
- 팝업 API: UX 불일치 + 세션 이슈
- 상세주소 API: MVP 범위 초과

### 추가 예정 API (사용자 요청 2026-04-21)
- 좌표제공 API + 지도제공 API: 지도보기 버튼 기능 구현 예정

### 옵션 판단
- `firstSort=road` 사용
- `hstryYn=Y` 나중에 검토
- `addInfoYn` 핵심 필드로 쓰지 말 것 (변경 가능성 경고)
- 검색 API와 팝업 API는 승인키 공유 불가

---

## 배포 순서 (아직 미완료)

1. GitHub repository 생성 및 push
2. Vercel 배포 → production URL 확보
3. 그 URL로 API 신청 (민간기관, 인터넷망, 개발용)
4. 승인키 발급 → 환경변수 설정
5. jusoen.co.kr 연결

---

## 사용자가 제공한 자료

- Google Docs 기획서 (2026-04-15 작성): 프로젝트 목표, API 판단 근거, UX 구상, 에러코드, 배포 순서 포함
- 행정안전부 영문주소 검색API 활용 가이드 PDF → `docs/api-eng-guide.md`에 저장
  - 이 매뉴얼을 기반으로 `app/api/search/route.ts`, `lib/juso.ts` 구현함
  - 요청변수, 응답필드, 에러코드, SQL 필터링 로직 모두 이 문서 기준

---

## UI 확정 지침

- 복사 버튼: 아이콘(SVG) 버튼, 텍스트 바로 옆에 붙임. 텍스트 배지 형태 금지
- 섹션 배경 구분색: 단일 연회색(`#F5F7FA`). 파랑/보라/초록 등 임의 색상 금지
- 색상은 항상 juso.go.kr 기준으로 결정
- ResultCard 우편주소 표기방법 / Address Line 표기방법 안내 UI 확정 — 수정 금지
- 영문주소 Row 옆 "우편주소 표기방법 ∨" 버튼 위치 확정 — 수정 금지
- Address Line 1 옆 "우편주소 표기방법 ∨" 버튼 및 동호수 안내(동호수 없을 때/있을 때) 확정 — 수정 금지

## 작업 규칙 (반드시 준수)

- 요청 범위 외의 코드는 함부로 수정하지 않는다
- 불확실하거나 범위가 넓은 변경은 먼저 물어보고 진행한다
- 지침(AGENTS.md)에 추가할 때는 코드도 동시에 해당 지침에 맞게 수정한다
- 한 번 확정된 UI(복사버튼 위치 등)는 다시 바꾸지 않는다

## 주요 결정 원칙

- 디자인: 단순함 우선, 여백과 타이포그래피 중심, juso.go.kr 구조 참고
- 광고: 버튼/내비게이션처럼 보이지 않게 분리
- SEO: Google Search Central 기준, FAQ/설명 콘텐츠 필수
- 컴포넌트: 페이지 간 재사용 가능하게 설계
- 라우트: `jusoen.co.kr/[기능명]` 패턴 유지

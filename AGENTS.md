<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 홈페이지 수정 금지

**`app/page.tsx` (홈페이지)는 완성된 상태 — 명시적 요청 없이 절대 수정 금지**

---

## Jusoen 프로젝트 전용 규칙

**Google SEO 최적화는 선택이 아닌 필수 (AdSense 승인 조건)**

- 모든 페이지에 고유한 `<title>`, `<meta description>` 작성
- JSON-LD 구조화 데이터 적용 (WebSite, FAQPage, SoftwareApplication)
- `sitemap.xml`, `robots.txt` 반드시 포함
- `/about`, `/privacy` 신뢰 페이지 필수
- 기능 페이지에만 의존하지 말고 설명/FAQ/예시 콘텐츠 섹션 포함
- Core Web Vitals: LCP < 2.5s, CLS < 0.1 유지

**확장성 유지**
- 향후 지도 API, 해외계좌 입력 등 기능 추가 예정
- 컴포넌트는 페이지 간 재사용 가능하게 설계
- 라우트: `jusoen.co.kr/[기능명]` 패턴 유지

## UI 지침 (반드시 준수)

- **복사 버튼**: 텍스트 배지 금지. 아이콘(클립보드 SVG) 버튼으로, 복사할 텍스트 바로 옆에 붙임
- **섹션 배경색**: 임의로 파랑/보라/초록 등 색상 구분 금지. 단일 연회색(`#F5F7FA`) 사용
- **색상 결정**: 항상 juso.go.kr 기준으로, AI가 임의로 만들지 않음
- **모든 주요 텍스트 필드**에는 복사 버튼 필수
- **우편번호 레이아웃 확정**: 세로 순서 고정 — ① 라벨("우편번호") ② 번호 숫자 ③ 복사 버튼. 가로 배치 또는 순서 변경 금지

## 영문주소 변환 기능 설계

**핵심 UX**
- 한 페이지에서 검색 → 결과 확인 → 복사 완결
- 검색 전에도 비활성 결과 영역을 먼저 보여주고, 검색 후 채워지는 구조
- 결과 카드: 영문 전체주소, 한글주소, 우편번호, 지번 → 항목별 복사 버튼

**API**
- 사용: 도로명주소 검색 API + 영문주소 API 조합
- 보류: 팝업 API (UX 불일치, 세션 이슈), 좌표/상세주소/지도 API
- 검색 API와 팝업 API는 승인키 공유 불가

**검색 API 옵션**
- `firstSort=road` 사용
- `hstryYn=Y` 나중에 검토 (구주소 대응)
- `addInfoYn` 핵심 필드로 쓰지 말 것 (가이드에서 변경 가능성 경고)

**중요 응답 필드**
- UI 표시: `roadAddr`, `engAddr`, `korAddr`, `jibunAddr`, `zipNo`
- 내부 보관: `admCd`, `rnMgtSn`, `bdMgtSn`, `bdKdcd`
- 영문주소 API에서 동/층/호는 제공 안 될 수 있음

**주의사항**
- keyword UTF-8 인코딩 필수
- SQL 키워드 및 특수문자 필터링 필수
- 실 API 대상 보안 테스트 시 IP 차단 위험

**배포 순서**
1. GitHub push → Vercel production URL 확보
2. 그 URL로 API 신청 (민간기관, 인터넷망)
3. 승인키 발급 후 환경변수 연동
4. jusoen.co.kr 연결

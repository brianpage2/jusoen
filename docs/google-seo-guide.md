# Google SEO 공식 가이드 - Jusoen 적용 기준

출처: Google Search Central (developers.google.com/search/docs)

---

## 1. 콘텐츠 품질

- 사람을 위한 유용한 콘텐츠 작성 (광고 수익만을 위한 thin page 금지)
- 독창적이고 잘 정리된 내용, 맞춤법/문법 준수
- 키워드 반복 남용 금지 (keyword stuffing)
- 콘텐츠 길이보다 **실질적 유용성**이 중요

**Jusoen 적용:**
- 메인 하단에 "영문주소 변환 방법", "자주 묻는 질문", "사용 예시" 섹션 필수
- 기능 페이지만 있는 thin page는 AdSense 승인 거절 원인

---

## 2. Title & Meta Description

- 페이지마다 **고유한** title 작성
- title에 서비스명 + 핵심 키워드 포함
- meta description: 1~2문장, 페이지 내용 요약
- title이 검색 결과의 헤드라인으로 표시됨

**Jusoen 적용:**
```
메인:   영문주소 변환 - 한글 주소를 영문으로 즉시 변환 | Jusoen
영문주소: 영문 도로명주소 변환 및 복사 | Jusoen
about:  서비스 소개 | Jusoen
privacy: 개인정보처리방침 | Jusoen
```

---

## 3. URL 구조

- 의미 있는 단어 사용 (random ID 금지)
- 비슷한 주제는 같은 디렉토리 아래 그룹화
- 정규 URL은 `rel="canonical"` 또는 리다이렉트로 통일

**Jusoen 적용:**
```
jusoen.co.kr/                  홈
jusoen.co.kr/english-address   영문주소 변환
jusoen.co.kr/about             서비스 소개
jusoen.co.kr/privacy           개인정보처리방침
```

---

## 4. 구조화 데이터 (Structured Data)

- **JSON-LD 형식 권장** (head 또는 body에 `<script>` 태그)
- 완전하고 정확한 데이터만 제공 (불완전한 데이터 > 없는 것이 나음)

**Jusoen에 적용할 스키마 타입:**

```json
// 메인 페이지 - WebSite + SearchAction
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Jusoen",
  "url": "https://jusoen.co.kr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://jusoen.co.kr/english-address?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

// FAQ 섹션
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "영문주소 변환은 어떻게 하나요?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "검색창에 한글 주소를 입력하면 즉시 영문 주소로 변환됩니다."
    }
  }]
}

// 서비스 소개
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Jusoen 영문주소변환",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web"
}
```

---

## 5. 사이트맵 & robots.txt

- 신규 사이트, 외부 링크 적을 때 사이트맵 필수
- Next.js에서 자동 생성 가능

**Jusoen 적용:**
```
// next-sitemap 패키지 사용
// public/robots.txt
User-agent: *
Allow: /
Sitemap: https://jusoen.co.kr/sitemap.xml
```

---

## 6. 모바일 최적화

- 모바일 친화적 레이아웃 필수 (Google은 모바일 우선 색인)
- 침입적 광고/팝업 금지
- 콘텐츠 접근을 방해하는 인터스티셜 금지

---

## 7. Core Web Vitals

| 지표 | 기준 | Jusoen 전략 |
|------|------|------------|
| LCP (최대 콘텐츠 렌더링) | < 2.5초 | 이미지 최소화, Next.js Image 컴포넌트 |
| CLS (레이아웃 이동) | < 0.1 | 결과 영역 고정 높이, skeleton UI |
| INP (상호작용) | < 200ms | 검색 debounce, 로딩 상태 즉시 표시 |

---

## 8. 내부 링크 & 앵커 텍스트

- 앵커 텍스트는 연결 페이지 내용을 설명하도록
- 관련 페이지 간 내부 링크 연결

**Jusoen 적용:**
- 메인 → 영문주소변환, 서비스소개, 개인정보처리방침 링크
- 영문주소변환 페이지 → 사용법 섹션 앵커 링크

---

## 9. 이미지

- 관련 텍스트 근처에 배치
- 설명적인 alt 텍스트 필수
- 선명하고 고품질 이미지 사용

---

## 10. AdSense 승인을 위한 추가 체크리스트

- [ ] 실질적 콘텐츠 있는 페이지 최소 5개 이상
- [ ] `/about` - 서비스 목적, 운영자 정보
- [ ] `/privacy` - 개인정보처리방침 (Google 요구사항)
- [ ] 광고가 네비게이션/버튼과 혼동되지 않게 배치
- [ ] 저작권 위반 콘텐츠 없음
- [ ] 사이트 전반적으로 일관된 구조
- [ ] Google Search Console 등록 및 색인 확인

---

## 11. 타겟 키워드 (기획 문서 기반)

| 키워드 | 검색 의도 |
|--------|---------|
| 영문주소 변환 | 한글→영문 변환 필요 |
| 한글주소 영문변환 | 동일 |
| 영문 주소 복사 | 복사 기능 필요 |
| 도로명주소 영문 | 도로명 기준 변환 |
| 영문 도로명주소 | 동일 |
| Address Line 1 한국 | 해외 사이트 가입 |
| 한국 영문 주소 양식 | 해외 양식 작성 |

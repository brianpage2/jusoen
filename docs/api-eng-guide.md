# 영문주소 검색API 활용 가이드 (행정안전부 / KLID)

## API 기본 정보

| 호출방식 | 요청 URL | 출력결과 |
|---|---|---|
| POST/GET | `https://business.juso.go.kr/addrlink/addrEngApi.do` | XML 또는 JSON |
| POST/GET | `https://business.juso.go.kr/addrlink/addrEngApiJsonp.do` | JSONP |

- 검색어는 한글, 영문 모두 가능
- 1 시스템 1 승인키 부여
- 신청 즉시 이용 가능

---

## 요청 변수

| 변수명 | 타입 | 필수 | 기본값 | 설명 |
|---|---|---|---|---|
| confmKey | String | Y | - | 신청시 발급받은 승인키 |
| currentPage | Number | Y | 1 | 현재 페이지 번호 |
| countPerPage | Number | Y | 10 | 페이지당 결과 수 |
| keyword | String | Y | - | 주소 검색어 |
| resultType | String | N | - | json 입력 시 JSON 형식 반환 |

---

## 출력 변수

### common
| 변수명 | 설명 |
|---|---|
| totalCount | 총 검색 데이터수 |
| currentPage | 페이지 번호 |
| countPerPage | 페이지당 결과 수 |
| errorCode | 에러 코드 |
| errorMessage | 에러 메시지 |

### juso
| 변수명 | 필수 | 설명 |
|---|---|---|
| roadAddr | Y | 영문 도로명주소 |
| jibunAddr | Y | 영문 지번 주소 |
| zipNo | Y | 우편번호 |
| admCd | Y | 행정구역코드 |
| rnMgtSn | Y | 도로명코드 |
| bdKdcd | Y | 공동주택여부 (1:공동주택, 0:비공동주택) |
| siNm | Y | 영문 시도명 |
| sggNm | N | 영문 시군구명 |
| emdNm | Y | 영문 읍면동명 |
| liNm | N | 영문 법정리명 |
| rn | Y | 영문 도로명 |
| udrtYn | Y | 지하여부 (0:지상, 1:지하) |
| buldMnnm | Y | 건물본번 |
| buldSlno | Y | 건물부번 (없는 경우 0) |
| mtYn | Y | 산여부 (0:대지, 1:산) |
| lnbrMnnm | Y | 지번본번(번지) |
| lnbrSlno | Y | 지번부번(호) (없는 경우 0) |
| korAddr | Y | 도로명주소(한글) |

---

## 에러코드

| 코드 | 메시지 |
|---|---|
| 0 | 정상 |
| -999 | 시스템에러 |
| E0001 | 승인되지 않은 KEY |
| E0005 | 검색어 미입력 |
| E0006 | 주소를 더 상세히 입력 필요 |
| E0008 | 검색어 너무 짧음 |
| E0009 | 숫자만으로 검색 불가 |
| E0010 | 검색어 너무 김 |
| E0011 | 긴 숫자 포함됨 |
| E0012 | 특수문자+숫자만으로 검색 불가 |
| E0013 | SQL 예약어 또는 특수문자(%,=,>,<,[,]) 불가 |
| E0014 | 승인키 기간 만료 |
| E0015 | 검색 범위 초과 |

---

## 주의사항

- **팝업API와 검색API는 승인키 공유 불가** — E0001이 나오면 연계방식 확인
- 시도/시군구만으로 검색 불가
- 과도한 페이징 불가 (10개 기준 900페이지 초과 시 차단)
- 검색건수 0이면 UTF-8 인코딩 문제 — `URLEncoder.encode(keyword, "UTF-8")` 처리
- **모의해킹 테스트 시 실 API 호출하면 IP 차단됨**

## 차단 사례 (API 차단 보안규칙)

| 패턴 | 사유 |
|---|---|
| `'+or+'1'='1` | SQL Injection 패턴 |
| `' and 'f'='f` | SQL Injection 패턴 |
| `UNION+SELECT` | SQL Injection 패턴 |

조치: API 호출 전 keyword에서 SQL 예약어(`or, select, insert, delete, update, create, drop, exec, union, fetch, declare, truncate`) 및 특수문자(`<,>,=,%`) 제거

---

## JSON 응답 예시

```json
{
  "results": {
    "common": {
      "errorMessage": "정상",
      "countPerPage": "10",
      "totalCount": "110",
      "errorCode": "0",
      "currentPage": "1"
    },
    "juso": [{
      "roadAddr": "6 Gangnam-daero 12-gil, Seocho-gu, Seoul",
      "jibunAddr": "326-1 Yangjae-dong, Seocho-gu, Seoul",
      "zipNo": "06779",
      "admCd": "1165010200",
      "rnMgtSn": "116504163008",
      "bdKdcd": "0",
      "siNm": "Seoul",
      "sggNm": "Seocho-gu",
      "emdNm": "Yangjae-dong",
      "liNm": "",
      "udrtYn": "0",
      "buldMnnm": "6",
      "buldSlno": "0",
      "mtYn": "0",
      "lnbrMnnm": "326",
      "lnbrSlno": "1",
      "korAddr": "서울특별시 서초구 강남대로12길 6"
    }]
  }
}
```

---

## 신청 방법

1. `business.juso.go.kr` → 주소정보 자료제공 → 주소정보 API 연계
2. 영문주소 → 검색 API → 신청하기
3. 신청기관 유형: 민간기관
4. URL(IP): Vercel production 도메인 입력
5. 서비스망: 인터넷망
6. 개발승인키는 본인인증 없이 즉시 발급
7. 마이페이지 → API 인증키 관리에서 승인키 확인

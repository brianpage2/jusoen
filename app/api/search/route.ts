import { NextRequest, NextResponse } from 'next/server'

const JUSO_SEARCH_URL = 'https://business.juso.go.kr/addrlink/addrLinkApi.do'
const JUSO_ENG_URL = 'https://business.juso.go.kr/addrlink/addrEngApi.do'

const SQL_KEYWORDS = ['OR','SELECT','INSERT','DELETE','UPDATE','CREATE','DROP','EXEC','UNION','FETCH','DECLARE','TRUNCATE']

function sanitizeKeyword(keyword: string): string | null {
  const trimmed = keyword.trim()
  if (!trimmed || trimmed.length < 2) return null
  if (/[%=><\[\]]/.test(trimmed)) return null
  for (const word of SQL_KEYWORDS) {
    if (new RegExp(`\\b${word}\\b`, 'gi').test(trimmed)) return null
  }
  return trimmed
}

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('keyword') ?? ''
  const clean = sanitizeKeyword(keyword)

  if (!clean) {
    return NextResponse.json({ error: '검색어를 입력해주세요.' }, { status: 400 })
  }

  const searchApiKey = process.env.JUSO_API_KEY
  const engApiKey = process.env.JUSO_ENG_API_KEY

  if (!searchApiKey) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
  }

  const page = req.nextUrl.searchParams.get('page') ?? '1'

  const searchParams = new URLSearchParams({
    confmKey: searchApiKey,
    currentPage: page,
    countPerPage: '10',
    keyword: clean,
    resultType: 'json',
    firstSort: 'road',
  })

  const engFetch = engApiKey
    ? fetch(`${JUSO_ENG_URL}?${new URLSearchParams({
        confmKey: engApiKey,
        currentPage: page,
        countPerPage: '10',
        keyword: clean,
        resultType: 'json',
      })}`)
    : Promise.resolve(null)

  const [searchRes, engRes] = await Promise.all([
    fetch(`${JUSO_SEARCH_URL}?${searchParams}`),
    engFetch,
  ])

  if (!searchRes.ok) {
    return NextResponse.json({ error: '주소 검색에 실패했습니다.' }, { status: 502 })
  }

  const searchData = await searchRes.json()

  const jusoList: object[] = searchData?.results?.juso ?? []
  let engList: object[] = []

  if (engRes?.ok) {
    const engData = await engRes.json()
    engList = engData?.results?.juso ?? []
  }

  const merged = jusoList.map((juso, i) => ({
    ...juso,
    engResult: engList[i] ?? null,
  }))

  return NextResponse.json({
    results: {
      common: searchData?.results?.common,
      juso: merged,
    },
  })
}

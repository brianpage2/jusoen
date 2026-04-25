import { NextRequest, NextResponse } from 'next/server'

const JUSO_ENG_URL = 'https://business.juso.go.kr/addrlink/addrEngApi.do'

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('keyword') ?? ''
  const trimmed = keyword.trim()

  if (!trimmed) {
    return NextResponse.json({ error: '주소를 입력해주세요.' }, { status: 400 })
  }

  const apiKey = process.env.JUSO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
  }

  const params = new URLSearchParams({
    confmKey: apiKey,
    currentPage: '1',
    countPerPage: '10',
    keyword: trimmed,
    resultType: 'json',
  })

  const res = await fetch(`${JUSO_ENG_URL}?${params}`)
  if (!res.ok) {
    return NextResponse.json({ error: '영문주소 변환에 실패했습니다.' }, { status: 502 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}

export interface EngResult {
  roadAddr: string   // 영문 도로명주소
  jibunAddr: string  // 영문 지번주소
  zipNo: string
  siNm: string       // 영문 시도명
  sggNm: string      // 영문 시군구명
  emdNm: string
  rn: string         // 영문 도로명
  buldMnnm: string
  buldSlno: string
  korAddr: string    // 한글 도로명주소
}

export interface JusoResult {
  roadAddr: string
  roadAddrPart1: string
  roadAddrPart2: string
  jibunAddr: string
  engAddr: string
  zipNo: string
  siNm: string
  sggNm: string
  emdNm: string
  rn: string
  bdNm: string
  buldMnnm: string
  buldSlno: string
  admCd: string
  rnMgtSn: string
  udrtYn: string
  engResult: EngResult | null
}

export interface AddressFormFields {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  country: string
}

// engAddr 예시: "152, Teheran-ro, Gangnam-gu, Seoul"
function parseEngAddr(engAddr: string): { addressLine1: string; city: string; state: string } {
  if (!engAddr) return { addressLine1: '', city: '', state: '' }

  const parts = engAddr.split(',').map(s => s.trim())
  if (parts.length >= 3) {
    const state = parts[parts.length - 1]
    const city = parts[parts.length - 2]
    const addressLine1 = parts.slice(0, parts.length - 2).join(', ')
    return { addressLine1, city, state }
  }

  return { addressLine1: engAddr, city: '', state: '' }
}

export function toAddressForm(juso: JusoResult): AddressFormFields {
  if (juso.engResult) {
    const { siNm, sggNm, emdNm, rn, buldMnnm, buldSlno } = juso.engResult
    const buildingNo = buldSlno !== '0' ? `${buldMnnm}-${buldSlno}` : buldMnnm
    const isProvince = siNm.endsWith('-do')
    const city = isProvince ? (sggNm || siNm) : siNm
    const addrParts = [rn, emdNm, sggNm].filter(Boolean)
    return {
      addressLine1: `${buildingNo} ${addrParts.join(', ')}`,
      addressLine2: '',
      city,
      state: siNm,
      zipCode: juso.zipNo,
      country: 'South Korea',
    }
  }

  // 영문주소 API 키 없을 때 fallback
  const { addressLine1, city, state } = parseEngAddr(juso.engAddr)
  return {
    addressLine1,
    addressLine2: '',
    city,
    state,
    zipCode: juso.zipNo,
    country: 'South Korea',
  }
}

export async function searchAddress(keyword: string, page = 1): Promise<{ juso: JusoResult[]; totalCount: number }> {
  const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}&page=${page}`)
  if (!res.ok) throw new Error('주소 검색에 실패했습니다.')
  const data = await res.json()

  const errorCode = data?.results?.common?.errorCode
  if (errorCode && errorCode !== '0') {
    throw new Error(data?.results?.common?.errorMessage ?? '검색 오류가 발생했습니다.')
  }

  return {
    juso: data?.results?.juso ?? [],
    totalCount: parseInt(data?.results?.common?.totalCount ?? '0', 10),
  }
}

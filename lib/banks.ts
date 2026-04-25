export interface Bank {
  code: string
  nameKo: string
  nameEn: string
  swift: string
  address: string
  addressKo: string
  url: string
  swiftUrl?: string
}

export const BANKS: Bank[] = [
  { code: '004', nameKo: 'KB국민은행',    nameEn: 'Kookmin Bank',                             swift: 'CZNBKRSE',    address: '26, Gukjegeumyung-ro 8-gil, Yeongdeungpo-gu, Seoul, Korea',              addressKo: '서울특별시 영등포구 국제금융로8길 26', url: 'https://www.kbstar.com' },
  { code: '088', nameKo: '신한은행',      nameEn: 'Shinhan Bank',                             swift: 'SHBKKRSE',    address: '70, Sejong-daero, Jung-gu, Seoul, Korea',                               addressKo: '서울특별시 중구 세종대로 70',          url: 'https://www.shinhan.com' },
  { code: '020', nameKo: '우리은행',      nameEn: 'Woori Bank',                               swift: 'HVBKKRSE',    address: '51, Sogong-ro, Jung-gu, Seoul, Korea',                                  addressKo: '서울특별시 중구 소공로 51',            url: 'https://www.wooribank.com' },
  { code: '081', nameKo: '하나은행',      nameEn: 'KEB Hana Bank',                            swift: 'KOEXKRSE',    address: '66, Eulji-ro, Jung-gu, Seoul, Korea',                                   addressKo: '서울특별시 중구 을지로 66',            url: 'https://www.kebhana.com' },
  { code: '003', nameKo: 'IBK기업은행',   nameEn: 'Industrial Bank of Korea',                 swift: 'IBKOKRSE',    address: '79, Eulji-ro, Jung-gu, Seoul, Korea',                                   addressKo: '서울특별시 중구 을지로 79',            url: 'https://www.ibk.co.kr' },
  { code: '011', nameKo: 'NH농협은행',    nameEn: 'Nonghyup Bank',                            swift: 'NACFKRSE',    address: '75, Yulgok-ro, Jongno-gu, Seoul, Korea',                                addressKo: '서울특별시 종로구 율곡로 75',          url: 'https://www.nhbank.com' },
  { code: '023', nameKo: 'SC제일은행',    nameEn: 'Standard Chartered Bank Korea',            swift: 'SCBLKRSE',    address: '100, Cheonggyecheon-ro, Jung-gu, Seoul, Korea',                         addressKo: '서울특별시 중구 청계천로 100',         url: 'https://www.standardchartered.co.kr' },
  { code: '027', nameKo: '씨티은행',      nameEn: 'Citibank Korea',                           swift: 'CITIKRSX',    address: '70, Sejong-daero, Jung-gu, Seoul, Korea',                               addressKo: '서울특별시 중구 세종대로 70',          url: 'https://www.citibank.co.kr' },
  { code: '031', nameKo: 'DGB대구은행',   nameEn: 'Daegu Bank',                               swift: 'DAEBKR22',    address: '150, Suseong-ro, Suseong-gu, Daegu, Korea',                             addressKo: '대구광역시 수성구 수성로 150',         url: 'https://www.dgb.co.kr' },
  { code: '032', nameKo: 'BNK부산은행',   nameEn: 'Busan Bank',                               swift: 'PUSBKR2P',    address: '99, Jungang-daero, Busanjin-gu, Busan, Korea',                          addressKo: '부산광역시 부산진구 중앙대로 99',      url: 'https://www.busanbank.co.kr' },
  { code: '034', nameKo: '광주은행',      nameEn: 'Gwangju Bank',                             swift: 'KWABKR22',    address: '225, Munhwa-ro, Nam-gu, Gwangju, Korea',                                addressKo: '광주광역시 남구 문화로 225',           url: 'https://www.kjbank.com' },
  { code: '035', nameKo: '제주은행',      nameEn: 'Jeju Bank',                                swift: 'JEJUKR22',    address: '1135, Samdoil-dong, Jeju-si, Jeju, Korea',                              addressKo: '제주특별자치도 제주시 삼도일동 1135',  url: 'https://www.jejubank.com' },
  { code: '037', nameKo: 'BNK경남은행',   nameEn: 'Kyongnam Bank',                            swift: 'KYNAKR22',    address: '306, Changwon-daero, Uichang-gu, Changwon-si, Gyeongsangnam-do, Korea', addressKo: '경상남도 창원시 의창구 창원대로 306',  url: 'https://www.knbank.co.kr' },
  { code: '045', nameKo: '새마을금고',    nameEn: 'MG Community Credit Cooperatives',         swift: 'MGCCKRSE',    address: '226, Yangjae-daero, Seocho-gu, Seoul, Korea',                           addressKo: '서울특별시 서초구 양재대로 226',       url: 'https://www.kfcc.co.kr' },
  { code: '048', nameKo: '신협',          nameEn: 'National Credit Union Federation of Korea',swift: 'NACUKRSE',    address: '275, Jugong-ro, Dongjak-gu, Seoul, Korea',                              addressKo: '서울특별시 동작구 주공로 275',         url: 'https://www.cu.co.kr' },
  { code: '071', nameKo: '우체국',        nameEn: 'Korea Post',                               swift: 'SHBKKRSEKPO', address: '154, Sejong-daero, Jongno-gu, Seoul, Korea',                            addressKo: '서울특별시 종로구 세종대로 154',       url: 'https://www.epost.go.kr' },
  { code: '089', nameKo: '케이뱅크',      nameEn: 'K Bank',                                   swift: 'KBANKRSE',    address: '30, Eulji-ro, Jung-gu, Seoul, Korea',                                   addressKo: '서울특별시 중구 을지로 30',            url: 'https://www.kbanknow.com' },
  { code: '090', nameKo: '카카오뱅크',    nameEn: 'KAKAOBANK CORP',                           swift: 'KAKOKR22',    address: '166, Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea',           addressKo: '경기도 성남시 분당구 판교로 166',      url: 'https://cs.kakaobank.com', swiftUrl: 'https://kakaobank.com/Corp/News/Notices/view/14125' },
  { code: '092', nameKo: '토스뱅크',      nameEn: 'Toss Bank',                                swift: 'TOSIKRSE',    address: '5, Teheran-ro 35-gil, Gangnam-gu, Seoul, Korea',                        addressKo: '서울특별시 강남구 테헤란로35길 5',     url: 'https://www.tossbank.com' },
]

export function findBank(code: string): Bank | undefined {
  return BANKS.find(b => b.code === code)
}

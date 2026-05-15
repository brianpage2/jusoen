import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Jusoen 영문주소 변환'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          gap: '24px',
        }}
      >
        {/* 로고 + 사이트명 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="64" height="64" viewBox="0 0 36 36" fill="none">
            <polygon points="18,4 34,18 2,18" fill="#F47B20" />
            <rect x="7" y="18" width="22" height="14" rx="1" fill="#1B6EBE" />
            <rect x="14" y="24" width="8" height="8" rx="1" fill="#FFFFFF" opacity="0.8" />
          </svg>
          <span style={{ fontSize: '50px', fontWeight: '700', color: '#1A1A1A' }}>영문도로명주소</span>
        </div>

        {/* 메인 타이틀 */}
        <div style={{ fontSize: '70px', fontWeight: '800', color: '#1B2B6E' }}>
          영문주소 변환 · 한글 주소 영어로
        </div>

        {/* 서브 */}
        <div style={{ fontSize: '45px', color: '#5A6A7A' }}>
          jusoen.co.kr
        </div>
      </div>
    ),
    { ...size }
  )
}

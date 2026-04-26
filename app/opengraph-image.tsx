import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Jusoen - Korean Address & SWIFT Code'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1B2B6E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }}
        />

        {/* 로고 아이콘 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            background: '#F47B20',
            borderRadius: 20,
            marginBottom: 32,
            fontSize: 44,
            fontWeight: 900,
            color: 'white',
          }}
        >
          J
        </div>

        {/* 브랜드명 */}
        <div
          style={{
            color: 'white',
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: '-2px',
            marginBottom: 20,
          }}
        >
          Jusoen
        </div>

        {/* 서비스 설명 */}
        <div
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 30,
            fontWeight: 400,
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Korean Address · SWIFT Code · Bank Account
        </div>

        {/* 서브 설명 */}
        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 22,
            marginBottom: 40,
          }}
        >
          영문주소 변환 · SWIFT 코드 조회 · 계좌정보 영문전환
        </div>

        {/* 도메인 배지 */}
        <div
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 50,
            paddingLeft: 28,
            paddingRight: 28,
            paddingTop: 12,
            paddingBottom: 12,
            color: 'rgba(255,255,255,0.9)',
            fontSize: 22,
            letterSpacing: '0.5px',
          }}
        >
          jusoen.co.kr
        </div>
      </div>
    ),
    { ...size }
  )
}

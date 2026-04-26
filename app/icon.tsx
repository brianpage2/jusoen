import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1B2B6E',
          borderRadius: 7,
          fontFamily: 'sans-serif',
          fontWeight: 900,
          fontSize: 20,
          color: 'white',
          letterSpacing: '-0.5px',
        }}
      >
        J
      </div>
    ),
    { ...size }
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface MapModalProps {
  admCd: string
  rnMgtSn: string
  udrtYn: string
  buldMnnm: string
  buldSlno: string
  address: string
  onClose: () => void
}

export default function MapModal({ admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno, address, onClose }: MapModalProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_JUSO_MAP_KEY
    ;(window as any).img_icon_loc = `${window.location.origin}/images/icon_loc.png`

    const script = document.createElement('script')
    script.src = `https://business.juso.go.kr/juso_support_center/js/addrlink/map/jusoro_map_api.min.js?confmKey=${key}&skinType=2`
    script.onload = () => {
      setTimeout(() => {
        window.postMessage(
          { functionName: 'callJusoroMapApi', params: [admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno] },
          '*'
        )
      }, 300)
    }
    document.head.appendChild(script)
    scriptRef.current = script

    return () => {
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current)
        scriptRef.current = null
      }
      const mapWrap = document.getElementById('mapWrap')
      if (mapWrap) mapWrap.innerHTML = ''
    }
  }, [admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno])

  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl"
        style={{ height: '500px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#D0DCE8]">
          <span className="text-sm font-medium text-[#1A1A1A] truncate">{address}</span>
          <button onClick={onClose} className="ml-3 shrink-0 text-[#5A6A7A] hover:text-[#1A1A1A] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div id="mapWrap" className="mapWrap" style={{ width: '100%', height: 'calc(100% - 49px)' }} />
      </div>
    </div>,
    document.body
  )
}

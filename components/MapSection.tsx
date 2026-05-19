'use client'

interface MapSectionProps {
  admCd: string
  rnMgtSn: string
  udrtYn: string
  buldMnnm: string
  buldSlno: string
}

export default function MapSection({ admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno }: MapSectionProps) {
  const params = new URLSearchParams({ admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno })
  return (
    <div className="border-t border-[#E2E8F0]">
      <div className="px-4 py-3">
        <p className="text-sm font-semibold text-[#1B2B6E] bg-[#EEF2FA] px-3 py-1.5 rounded flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1B2B6E" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          지도 보기
        </p>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <iframe
          src={`/map?${params}`}
          style={{ width: '100%', minWidth: '600px', height: '400px', border: 'none', display: 'block' }}
          title="지도"
        />
      </div>
    </div>
  )
}

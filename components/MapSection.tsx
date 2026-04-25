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
      <iframe
        src={`/map?${params}`}
        style={{ width: '100%', height: '400px', border: 'none', display: 'block' }}
        title="지도"
      />
    </div>
  )
}

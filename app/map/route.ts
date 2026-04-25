import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const admCd    = sp.get('admCd')    ?? ''
  const rnMgtSn  = sp.get('rnMgtSn')  ?? ''
  const udrtYn   = sp.get('udrtYn')   ?? '0'
  const buldMnnm = sp.get('buldMnnm') ?? ''
  const buldSlno = sp.get('buldSlno') ?? '0'
  const key      = process.env.NEXT_PUBLIC_JUSO_MAP_KEY ?? ''
  const origin   = req.nextUrl.origin

  // 파라미터 단순 검증 (숫자/영문만 허용)
  const safe = (v: string) => v.replace(/[^a-zA-Z0-9]/g, '')

  const mapSrc = `https://business.juso.go.kr/juso_support_center/js/addrlink/map/jusoro_map_api.min.js?confmKey=${key}&skinType=2&searchType=2&admCd=${safe(admCd)}&rnMgtSn=${safe(rnMgtSn)}&udrtYn=${safe(udrtYn)}&buldMnnm=${safe(buldMnnm)}&buldSlno=${safe(buldSlno)}`

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>*{margin:0;padding:0;box-sizing:border-box}html,body,#mapWrap{width:100%;height:100%;overflow:hidden}</style>
</head>
<body>
<div id="mapWrap" class="mapWrap" style="width:100%;height:100%"></div>
<script>var img_icon_loc='${origin}/images/icon_loc.png';</script>
<script src="${mapSrc}"></script>
</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

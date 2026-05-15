'use client'

import { useState } from 'react'
import CopyButton from './CopyButton'
import MapSection from './MapSection'
import { JusoResult, AddressFormFields } from '@/lib/juso'
import { useLang } from '@/lib/language-context'

const addrLineGuide = [
  {
    label: '동호수 없을 때',
    rows: [
      { field: 'Address Line 1', value: '152 Teheran-ro, Gangnam-gu' },
      { field: 'Address Line 2', value: '(비워두세요)' },
    ],
  },
  {
    label: '동호수 있을 때',
    rows: [
      { field: 'Address Line 1', value: '152 Teheran-ro, Gangnam-gu' },
      { field: 'Address Line 2', value: '705-1104' },
    ],
  },
]

const guideTypes = [
  {
    label: '유형1',
    title: '"동"과 "호" 표기',
    desc: '주소가 "세종특별자치시 도움6로 42"이고 "705동 1104호"인 경우',
    example: '705-1104, 42Doum 6-ro, Sejong-si, Republic of Korea',
  },
  {
    label: '유형2',
    title: '"층" 표기',
    desc: '주소가 "세종특별자치시 도움6로 42"이고 "3층"인 경우',
    example: '3F, 42Doum 6-ro, Sejong-si, Republic of Korea',
  },
  {
    label: '유형3',
    title: '"지하" 표기',
    desc: '주소가 "세종특별자치시 도움6로 42"이고 "지하102"인 경우',
    example: 'B102, 42Doum 6-ro, Sejong-si, Republic of Korea',
  },
]

const t = {
  ko: {
    roadAddr: '도로명(한)', jibun: '지번주소', zipNo: '우편번호',
    expandedRoad: '도로명(영)', expandedJibun: '지번주소', expandedIntl: '해외 사이트 입력',
    korean: '한글', english: '영문',
    fold: '— 접기', unfold: '+ 영문펼치기',
  },
  en: {
    roadAddr: 'Road Address', jibun: 'Lot Address', zipNo: 'ZIP Code',
    expandedRoad: 'Road Address', expandedJibun: 'Lot Address', expandedIntl: 'International Form',
    korean: 'Korean', english: 'English',
    fold: '— Collapse', unfold: '+ Show English',
  },
} as const

interface ResultCardProps {
  juso: JusoResult
  form: AddressFormFields
  index: number
}

export default function ResultCard({ juso, form, index }: ResultCardProps) {
  const [expanded, setExpanded] = useState(index === 0)
  const [showGuide, setShowGuide] = useState(false)
  const [showAddrGuide, setShowAddrGuide] = useState(false)
  const [showMap, setShowMap] = useState(index === 0)
  const { lang } = useLang()
  const tx = t[lang]
  const engAddr = juso.engResult?.roadAddr ?? juso.engAddr

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden flex">
      {/* 번호 - 전체 높이 */}
      <span className="text-base font-bold text-[#1B2B6E] w-7 shrink-0 flex items-start justify-center pt-4 border-r border-[#E2E8F0]">{index + 1}</span>

      {/* 콘텐츠 전체 */}
      <div className="flex-1 min-w-0">
      {/* 메인 행 */}
      <div className="px-3 py-3">
        <div className="flex items-stretch gap-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap bg-[#EEF2FA] px-3 py-2 rounded-t min-h-[44px]">
              <span className="shrink-0 text-xs bg-[#1B2B6E] text-white px-2 text-center py-0.5 rounded font-semibold" style={{ minWidth: lang === 'en' ? '96px' : '68px' }}>{tx.roadAddr}</span>
              <span className="text-base text-[#0D1B3E] font-bold leading-snug">{juso.roadAddr}</span>
              <CopyButton value={juso.roadAddr} />
            </div>
            <div className="flex items-center gap-2 flex-wrap bg-[#F4F6FB] px-3 py-2 rounded-b border-t border-[#D8E0F0] min-h-[44px]">
              <span
                className="shrink-0 text-xs bg-[#E5E8EE] text-[#6B7280] px-2 text-center py-0.5 rounded font-semibold"
                style={{ minWidth: lang === 'en' ? '96px' : '68px' }}
              >{tx.jibun}</span>
              <span className="text-base text-[#374151] leading-snug">{juso.jibunAddr}</span>
              <CopyButton value={juso.jibunAddr} />
            </div>
            {/* 모바일: 우편번호 + 버튼 행 */}
            <div className="flex sm:hidden items-center gap-2 pt-2 px-1">
              <span className="text-xs text-[#6B7280]">{tx.zipNo}</span>
              <span className="text-sm font-bold text-[#0D1B3E]">{juso.zipNo}</span>
              <CopyButton value={juso.zipNo} />
              <div className="ml-auto flex gap-1.5">
                <button
                  onClick={() => setExpanded(v => !v)}
                  className="text-xs px-2.5 py-1 bg-[#1B6EBE] hover:bg-[#145A9E] text-white rounded font-medium transition-colors"
                >
                  {expanded ? tx.fold : tx.unfold}
                </button>
                <button
                  onClick={() => setShowMap(v => !v)}
                  className="text-xs px-2.5 py-1 bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#1B2B6E] rounded font-medium transition-colors flex items-center gap-1"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {showMap ? '지도접기' : '지도펼치기'}
                </button>
              </div>
            </div>
          </div>

          {/* 데스크탑: 우편번호 + 버튼 */}
          <div className="hidden sm:flex shrink-0 items-stretch gap-3 pl-3">
            <div className="flex flex-col items-center justify-center gap-1 bg-[#EEF2FA] px-3 rounded">
              <span className="text-xs text-[#6B7280]">{tx.zipNo}</span>
              <span className="text-lg font-bold text-[#0D1B3E]">{juso.zipNo}</span>
              <CopyButton value={juso.zipNo} />
            </div>
            <div className="flex flex-col gap-1.5 self-center">
              <button
                onClick={() => setExpanded(v => !v)}
                className="text-xs px-3 py-1.5 bg-[#1B6EBE] hover:bg-[#145A9E] text-white rounded font-medium transition-colors shrink-0"
              >
                {expanded ? tx.fold : tx.unfold}
              </button>
              <button
                onClick={() => setShowMap(v => !v)}
                className="text-xs px-3 py-1.5 bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#1B2B6E] rounded font-medium transition-colors shrink-0 flex items-center justify-center gap-1"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {showMap ? '지도접기' : '지도펼치기'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 펼침 영역 */}
      {expanded && (
        <div className="border-t border-[#E2E8F0] bg-white px-3 py-4 space-y-4">
          <div>
            {engAddr && (
              <>
                <div className="flex items-center gap-2 flex-wrap bg-[#EEF2FA] px-3 py-2 rounded-t min-h-[44px]">
                  <span className="shrink-0 text-xs bg-[#1B2B6E] text-white px-2 py-0.5 rounded font-semibold">{tx.expandedRoad}</span>
                  <span className="text-base font-[Inter] text-[#0D1B3E] font-bold leading-snug">{engAddr}</span>
                  <CopyButton value={engAddr} />
                  <button
                    onClick={() => setShowGuide(v => !v)}
                    className="text-xs text-[#1B6EBE] hover:underline shrink-0 whitespace-nowrap"
                  >
                    {showGuide ? '우편주소 표기방법 ∧' : '우편주소 표기방법 ∨'}
                  </button>
                </div>
                {showGuide && (
                  <div className="bg-[#F5F7FA] px-4 py-4 space-y-4 border-x border-[#D8E0F0]">
                    <p className="text-xs font-semibold text-[#1A1A1A]">상세주소(동,층,호)를 포함한 영문 우편주소 표기방법 안내</p>
                    {guideTypes.map(({ label, title, desc, example }) => (
                      <div key={label} className="flex gap-3">
                        <span className="shrink-0 text-xs border border-[#D0DCE8] text-[#5A6A7A] px-2 py-0.5 rounded-full font-medium h-fit mt-0.5">{label}</span>
                        <div>
                          <p className="text-xs font-semibold text-[#1A1A1A] mb-0.5">{title}</p>
                          <p className="text-xs text-[#6B7280] mb-0.5">{desc}</p>
                          <p className="text-xs text-[#1B6EBE] font-[Inter]">{example}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {juso.engResult?.jibunAddr && (
              <div className="flex items-center gap-2 flex-wrap bg-[#F4F6FB] px-3 py-2 rounded-b border-t border-[#D8E0F0] min-h-[44px]">
                <span className="shrink-0 text-xs bg-[#E5E8EE] text-[#6B7280] px-2 py-0.5 rounded font-semibold">{tx.expandedJibun}</span>
                <span className="text-base font-[Inter] text-[#374151] leading-snug">{juso.engResult.jibunAddr}</span>
                <CopyButton value={juso.engResult.jibunAddr} />
              </div>
            )}
          </div>
          <div className="border-t border-[#E2E8F0]" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#1B2B6E] bg-[#EEF2FA] px-3 py-1.5 rounded">{tx.expandedIntl}</p>
            <div className="flex items-start gap-2">
              <span className="text-sm text-[#6B7280] w-32 shrink-0 pt-0.5">Address Line 1</span>
              <div className="flex items-center gap-1 flex-wrap min-w-0">
                <span className="text-base font-[Inter] text-[#1A1A1A] font-medium">{form.addressLine1 || <span className="text-[#8A9BB0]">-</span>}</span>
                <CopyButton value={form.addressLine1} />
                <button
                  onClick={() => setShowAddrGuide(v => !v)}
                  className="text-xs text-[#1B6EBE] hover:underline shrink-0 whitespace-nowrap ml-1"
                >
                  {showAddrGuide ? '우편주소 표기방법 ∧' : '우편주소 표기방법 ∨'}
                </button>
              </div>
            </div>
            {showAddrGuide && (
              <div className="ml-32 bg-[#F5F7FA] rounded-lg p-4 space-y-4 border border-[#E2E8F0]">
                <p className="text-xs font-semibold text-[#1A1A1A]">상세주소(동,층,호)를 포함한 영문 우편주소 표기방법 안내</p>
                {addrLineGuide.map(({ label, rows }) => (
                  <div key={label} className="flex gap-3">
                    <span className="shrink-0 text-xs border border-[#D0DCE8] text-[#5A6A7A] px-2 py-0.5 rounded-full font-medium h-fit mt-0.5 whitespace-nowrap">{label}</span>
                    <div className="space-y-1">
                      {rows.map(({ field, value }) => (
                        <div key={field} className="flex gap-2 text-xs">
                          <span className="text-[#6B7280] w-28 shrink-0">{field}</span>
                          <span className={`font-[Inter] ${value.startsWith('(') ? 'text-[#9CA3AF] italic' : 'text-[#1B6EBE]'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="text-sm text-[#6B7280] w-32 shrink-0 pt-0.5">Address Line 2</span>
              <span className="text-sm text-[#9CA3AF] italic">동·호수, 층 등 직접 입력</span>
            </div>
            <Row label="City" value={form.city} english />
            <Row label="State / Province" value={form.state} english />
            <Row label="ZIP Code" value={form.zipCode} english />
            <Row label="Country" value={form.country} english />
          </div>
        </div>
      )}

      {showMap && (
        <MapSection
          admCd={juso.admCd}
          rnMgtSn={juso.rnMgtSn}
          udrtYn={juso.udrtYn}
          buldMnnm={juso.buldMnnm}
          buldSlno={juso.buldSlno}
        />
      )}
      </div>
    </div>
  )
}

function Row({ label, value, english }: { label: string; value: string; english?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-sm text-[#6B7280] w-32 shrink-0 pt-0.5">{label}</span>
      <div className="flex items-center gap-1 flex-wrap min-w-0">
        <span className={`text-base ${english ? 'font-[Inter] text-[#1A1A1A] font-medium' : 'text-[#111827]'}`}>
          {value || <span className="text-[#8A9BB0]">-</span>}
        </span>
        <CopyButton value={value} />
      </div>
    </div>
  )
}

export function ResultCardSkeleton() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden pointer-events-none select-none flex">
      {/* 번호 */}
      <span className="text-base font-bold text-[#1B2B6E] w-7 shrink-0 flex items-start justify-center pt-4 border-r border-[#E2E8F0]">1</span>

      <div className="flex-1 min-w-0">
        {/* 메인 행 */}
        <div className="px-3 py-3">
          <div className="flex items-stretch gap-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap bg-[#EEF2FA] px-3 py-2 rounded-t min-h-[44px]">
                <span className="shrink-0 text-xs bg-[#1B2B6E] text-white w-[68px] text-center py-0.5 rounded font-semibold">도로명(한)</span>
                <span className="text-sm text-[#C0CDD8]">한글 주소는 여기에 표시됩니다.</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap bg-[#F4F6FB] px-3 py-2 rounded-b border-t border-[#D8E0F0] min-h-[44px]">
                <span className="shrink-0 text-xs bg-[#E5E8EE] text-[#6B7280] w-[68px] text-center py-0.5 rounded font-semibold">지번주소</span>
                <span className="text-sm text-[#C0CDD8]">한글 주소는 여기에 표시됩니다.</span>
              </div>
            </div>
            <div className="hidden sm:flex shrink-0 items-stretch gap-3 pl-3">
              <div className="flex flex-col items-center justify-center gap-1 bg-[#EEF2FA] px-3 rounded">
                <span className="text-xs text-[#6B7280]">우편번호</span>
                <div className="w-12 h-5 bg-[#D0DCE8] rounded animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5 self-center">
                <div className="text-xs px-3 py-1.5 bg-[#1B6EBE] text-white rounded font-medium opacity-40">+ 영문펼치기</div>
                <div className="text-xs px-3 py-1.5 bg-[#F0F4F8] text-[#1B2B6E] rounded font-medium opacity-40">지도펼치기</div>
              </div>
            </div>
          </div>
        </div>

        {/* 펼침 미리보기 */}
        <div className="border-t border-[#E2E8F0] bg-white px-3 py-4 space-y-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap bg-[#EEF2FA] px-3 py-2 rounded-t min-h-[44px]">
              <span className="shrink-0 text-xs bg-[#1B2B6E] text-white px-2 py-0.5 rounded font-semibold">도로명(영)</span>
              <span className="text-sm text-[#C0CDD8]">영문 주소는 여기에 표시됩니다.</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap bg-[#F4F6FB] px-3 py-2 rounded-b border-t border-[#D8E0F0] min-h-[44px]">
              <span className="shrink-0 text-xs bg-[#E5E8EE] text-[#6B7280] px-2 py-0.5 rounded font-semibold">지번주소</span>
              <span className="text-sm text-[#C0CDD8]">영문 주소는 여기에 표시됩니다.</span>
            </div>
          </div>
          <div className="border-t border-[#E2E8F0]" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#1B2B6E] bg-[#EEF2FA] px-3 py-1.5 rounded">해외 사이트 입력</p>
            <SkeletonRow label="Address Line 1" />
            <SkeletonRow label="Address Line 2" />
            <SkeletonRow label="City" />
            <SkeletonRow label="State / Province" />
            <SkeletonRow label="ZIP Code" />
            <SkeletonRow label="Country" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#6B7280] w-32 shrink-0">{label}</span>
      <div className="flex-1 h-4 bg-[#D0DCE8] rounded animate-pulse" />
    </div>
  )
}

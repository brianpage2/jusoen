'use client'

import { useState } from 'react'

const SHARE_URL = 'https://jusoen.co.kr'
const SHARE_TITLE = '영문도로명주소 변환 - Jusoen'
const SHARE_TEXT = '한글 주소를 영문 주소로 바로 변환하세요.'

export default function ShareButtons() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SHARE_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleKakao = () => {
    if (navigator.share) {
      navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: SHARE_URL })
    } else {
      window.open(
        `https://sharer.kakao.com/talk/friends/picker/link?app_key=none&validation_action=default&validation_params=%7B%22link_ver%22%3A%224.0%22%2C%22template_id%22%3Anull%7D&ka=sdk%2F2.7.4+os%2Fjavascript+sdk_type%2Fjavascript+lang%2Fko-KR+device%2FWin32+origin%2F${encodeURIComponent(SHARE_URL)}`,
        '_blank'
      )
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-[#1B6EBE] text-white font-medium hover:bg-[#155da0] transition-colors"
      >
        {copied ? (
          <>&#10003; 복사됨</>
        ) : (
          <>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            링크 복사
          </>
        )}
      </button>
      <button
        onClick={handleKakao}
        className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-[#FEE500] text-[#3C1E1E] font-medium hover:bg-[#F5DC00] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#3C1E1E">
          <path d="M12 2C6.48 2 2 5.92 2 10.8c0 3.1 1.7 5.83 4.28 7.47L5.1 22l4.94-2.6c.63.1 1.28.15 1.96.15 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
          <circle cx="8" cy="11" r="1.2" fill="#FEE500"/>
          <circle cx="12" cy="11" r="1.2" fill="#FEE500"/>
          <circle cx="16" cy="11" r="1.2" fill="#FEE500"/>
        </svg>
        카카오톡 공유
      </button>
    </div>
  )
}

'use client'

import { useLang } from '@/lib/language-context'

export default function LanguageToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center border border-[#D0DCE8] rounded overflow-hidden text-sm">
      <button
        onClick={() => setLang('ko')}
        className={`px-3 py-1 transition-colors ${lang === 'ko' ? 'bg-[#1B6EBE] text-white font-semibold' : 'text-[#5A6A7A] hover:bg-[#F5F7FA]'}`}
      >
        한글
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 transition-colors ${lang === 'en' ? 'bg-[#1B6EBE] text-white font-semibold' : 'text-[#5A6A7A] hover:bg-[#F5F7FA]'}`}
      >
        English
      </button>
    </div>
  )
}

import Link from 'next/link'
import LanguageToggle from './LanguageToggle'

function LogoIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 지붕 */}
      <polygon points="18,4 34,18 2,18" fill="#F47B20" />
      {/* 집 몸체 */}
      <rect x="7" y="18" width="22" height="14" rx="1" fill="#1B6EBE" />
      {/* 문 */}
      <rect x="14" y="24" width="8" height="8" rx="1" fill="#FFFFFF" opacity="0.8" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="bg-white border-b border-[#D0DCE8] sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon />
          <span className="text-[18px] font-bold text-[#1A1A1A] leading-tight">
            영문도로명주소
          </span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          <Link href="/about" className="text-sm text-[#5A6A7A] hover:text-[#1B6EBE] transition-colors">
            서비스 소개
          </Link>
          <Link href="/english-address" className="text-sm text-[#5A6A7A] hover:text-[#1B6EBE] transition-colors">
            이용방법
          </Link>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  )
}

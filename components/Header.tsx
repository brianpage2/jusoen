'use client'

import Link from 'next/link'
import { useState } from 'react'
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

const navLinks = [
  { href: '/',            label: '영문주소 변환' },
  { href: '/about',       label: '서비스 소개' },
  { href: '/bank-account',label: '계좌정보 영문전환' },
  { href: '/swift-code',  label: 'SWIFT 코드 조회' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-[#D0DCE8] sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon />
          <span className="text-[18px] font-bold text-[#1A1A1A] leading-tight">
            영문도로명주소
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          {/* 데스크탑 메뉴 */}
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm text-[#5A6A7A] hover:text-[#1B6EBE] transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <LanguageToggle />
          {/* 햄버거 버튼 */}
          <button
            onClick={() => setOpen(v => !v)}
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="메뉴"
          >
            <span className={`block w-5 h-0.5 bg-[#5A6A7A] transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#5A6A7A] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#5A6A7A] transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="sm:hidden border-t border-[#D0DCE8] bg-white">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-[#5A6A7A] hover:text-[#1B6EBE] hover:bg-[#F5F7FA] transition-colors border-b border-[#F0F4F8] last:border-b-0"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

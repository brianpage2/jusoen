import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#F5F7FA] border-t border-[#D0DCE8] mt-16">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#5A6A7A]">© 2026 Jusoen. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/about" className="text-xs text-[#5A6A7A] hover:text-[#1B6EBE] transition-colors">
            서비스 소개
          </Link>
          <Link href="/privacy" className="text-xs text-[#5A6A7A] hover:text-[#1B6EBE] transition-colors">
            개인정보처리방침
          </Link>
        </nav>
      </div>
    </footer>
  )
}

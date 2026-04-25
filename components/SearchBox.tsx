'use client'

import { useState, FormEvent, useEffect } from 'react'

interface SearchBoxProps {
  onSearch: (keyword: string) => void
  loading: boolean
}

const FULL_PLACEHOLDER = '예) 서울 강남구 테헤란로 152'

export default function SearchBox({ onSearch, loading }: SearchBoxProps) {
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i++
      setPlaceholder(FULL_PLACEHOLDER.slice(0, i))
      if (i >= FULL_PLACEHOLDER.length) clearInterval(timer)
    }, 80)
    return () => clearInterval(timer)
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  function handleClear() {
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="-30 -20 60 60">
          <g transform="matrix(-1 0 0 1 24 0)">
            <circle cx="10" cy="10" r="6"/>
            <path d="m14 16 6 6M8 8q2-3 4 0"/>
          </g>
          <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="translate" values="0 0; -15 5; -10 10; -5 5; 0 0"/>
        </svg>
        <div className="relative flex items-center flex-1">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full h-[60px] px-5 pr-24 bg-white rounded-lg text-[#1A1A1A] text-base placeholder-[#7A8FA0] focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-[68px] text-[#B0BEC5] hover:text-[#5A6A7A] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9l6 6" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="absolute right-2 w-[52px] h-[52px] bg-[#F5A623] hover:bg-[#E09515] disabled:bg-[#B0BEC5] text-white rounded-lg flex items-center justify-center transition-colors shadow-md"
        >
          {loading ? (
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          )}
        </button>
        </div>
      </div>
    </form>
  )
}

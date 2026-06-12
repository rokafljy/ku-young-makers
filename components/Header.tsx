'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const MENU = [
  { href: '/#about', label: '사업소개' },
  { href: '/#recruit', label: '모집안내' },
  { href: '/#journey', label: '8주 여정' },
  { href: '/#insight', label: '인사이트' },
  { href: '/careers', label: '채용정보' },
  { href: '/notice', label: '공지·Q&A' },
  { href: '/gallery', label: '갤러리' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  // 서브페이지는 히어로가 짧아 헤더를 항상 불투명하게 유지
  const solid = pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setLoggedIn(!!session?.user))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const accountHref = loggedIn ? '/mypage' : '/login'
  const accountLabel = loggedIn ? '마이페이지' : '로그인'

  return (
    <header className={scrolled || solid || open ? 'scrolled' : ''}>
      <div className="wrap nav">
        <Link href="/" className="logo">
          KU <span className="y">YOUNG</span> MAKERS
        </Link>
        <nav className="menu" aria-label="주메뉴">
          {MENU.map(m => (
            <Link key={m.href} href={m.href}>{m.label}</Link>
          ))}
        </nav>
        <div className="nav-right">
          <Link href={accountHref} className="status-link">{accountLabel}</Link>
          <Link href="/apply" className="btn btn-primary apply">지원하기</Link>
          <button
            className="hamburger"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="모바일 메뉴">
          {MENU.map(m => (
            <Link key={m.href} href={m.href} onClick={() => setOpen(false)}>{m.label}</Link>
          ))}
          <Link href={accountHref} onClick={() => setOpen(false)}>{accountLabel}</Link>
          <Link href="/apply" className="btn btn-primary" onClick={() => setOpen(false)}>지원하기</Link>
        </nav>
      )}
    </header>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV: ({ sec: string } | { href: string; label: string })[] = [
  { href: '/admin', label: '대시보드' },
  { sec: '운영' },
  { href: '/admin/members', label: '회원 관리' },
  { href: '/admin/applications', label: '청년 지원서' },
  { href: '/admin/companies', label: '기업 신청' },
  { href: '/admin/questions', label: '질문 답변' },
  { sec: '콘텐츠' },
  { href: '/admin/notices', label: '공지사항' },
  { href: '/admin/jobs', label: '채용정보' },
  { href: '/admin/videos', label: '인사이트 영상' },
  { href: '/admin/gallery', label: '갤러리' },
  { href: '/admin/reviews', label: '수료생 후기' },
  { sec: '설정' },
  { href: '/admin/settings', label: '사이트 설정' },
]

export default function AdminNav() {
  const pathname = usePathname()
  return (
    <nav className="admin-nav" aria-label="관리자 메뉴">
      {NAV.map((item, i) =>
        'sec' in item ? (
          <span className="nav-sec" key={i}>{item.sec}</span>
        ) : (
          <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
            {item.label}
          </Link>
        ),
      )}
    </nav>
  )
}

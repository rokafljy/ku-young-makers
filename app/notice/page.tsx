import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { getNotices } from '@/lib/content'

export const metadata: Metadata = { title: '공지사항 | KU YOUNG MAKERS' }
export const revalidate = 60

export default async function NoticeListPage() {
  const notices = await getNotices()

  return (
    <>
      <PageHero eyebrow="Notice" title="공지사항" desc="KU YOUNG MAKERS의 최신 소식을 확인하세요." />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="notice-list">
            {notices.map(n => (
              <Link href={`/notice/${n.id}`} key={n.id}>
                <span>
                  {n.pinned && <span className="pin">★</span>}
                  {n.title}
                </span>
                <span className="n-date">{n.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

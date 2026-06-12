import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'
import { notices } from '@/lib/data'

export function generateStaticParams() {
  return notices.map(n => ({ id: n.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const notice = notices.find(n => n.id === id)
  return { title: `${notice?.title ?? '공지사항'} | KU YOUNG MAKERS` }
}

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const notice = notices.find(n => n.id === id)
  if (!notice) notFound()

  return (
    <>
      <PageHero eyebrow="Notice" title="공지사항" />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="notice-detail">
            <h1>
              {notice.pinned && <span className="pin">★ </span>}
              {notice.title}
            </h1>
            <div className="n-meta">{notice.date} · KU YOUNG MAKERS 운영사무국</div>
            <div className="n-body">{notice.body}</div>
            <p style={{ marginTop: 34 }}>
              <Link href="/notice" className="more-link">← 목록으로</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

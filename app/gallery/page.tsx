import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import { getGallery } from '@/lib/content'

export const metadata: Metadata = { title: '갤러리 | KU YOUNG MAKERS' }
export const revalidate = 60

export default async function GalleryPage() {
  const items = await getGallery()

  return (
    <>
      <PageHero eyebrow="Gallery" title="현장의 순간들" desc="발대식부터 수료식까지, 8주의 기록을 모았습니다." />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="gal-grid" style={{ marginTop: 0 }}>
            {items.map(g => (
              <div className="gal" key={g.id}>
                {g.imageUrl
                  ? // eslint-disable-next-line @next/next/no-img-element
                    <img src={g.imageUrl} alt={g.label} />
                  : g.label}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

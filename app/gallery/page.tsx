import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import { galleryItems } from '@/lib/data'

export const metadata: Metadata = { title: '갤러리 | KU YOUNG MAKERS' }

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="현장의 순간들" desc="발대식부터 수료식까지, 8주의 기록을 모았습니다." />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="gal-grid" style={{ marginTop: 0 }}>
            {galleryItems.map(g => (
              <div className="gal" key={g}>{g}</div>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: 26 }}>* 실사진 교체 예정 (placeholder)</p>
        </div>
      </main>
    </>
  )
}

import Link from 'next/link'
import { getGallery } from '@/lib/content'

export default async function GalleryPreview() {
  const items = await getGallery()

  return (
    <section id="gallery">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Gallery</span>
            <h2 className="sec-title">현장의 순간들</h2>
          </div>
          <Link href="/gallery" className="more-link">갤러리 전체 보기 →</Link>
        </div>
        <div className="gal-grid reveal">
          {items.slice(0, 7).map(g => (
            <div className="gal" key={g.id}>
              {g.imageUrl
                ? // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.imageUrl} alt={g.label} />
                : g.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { galleryItems } from '@/lib/data'

export default function GalleryPreview() {
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
          {galleryItems.map(g => (
            <div className="gal" key={g}>{g}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

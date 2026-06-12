'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { revalidatePublic } from '@/app/actions'

type GalleryItem = {
  id: string
  label: string
  image_url: string | null
  sort: number
  published: boolean
}

export default function GalleryAdmin() {
  const supabase = useMemo(() => createClient(), [])
  const [items, setItems] = useState<GalleryItem[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('gallery_items').select('*').order('sort').order('created_at')
    if (error) setError(error.message)
    else setItems((data ?? []) as GalleryItem[])
  }, [supabase])

  useEffect(() => { load() }, [load])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const form = e.currentTarget
    const fd = new FormData(form)
    const label = String(fd.get('label') ?? '').trim()
    const file = fd.get('image') as File | null
    let image_url: string | null = null

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        setError('이미지는 5MB 이하로 올려 주세요.')
        setBusy(false)
        return
      }
      const ext = file.name.split('.').pop() ?? 'jpg'
      const path = `${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from('gallery').upload(path, file)
      if (upErr) {
        setError(`업로드 실패: ${upErr.message}`)
        setBusy(false)
        return
      }
      image_url = supabase.storage.from('gallery').getPublicUrl(path).data.publicUrl
    }

    const { error: insErr } = await supabase.from('gallery_items').insert({
      label,
      image_url,
      sort: items.length,
    })
    if (insErr) setError(insErr.message)
    else {
      form.reset()
      await load()
      await revalidatePublic()
    }
    setBusy(false)
  }

  async function togglePublished(item: GalleryItem) {
    await supabase.from('gallery_items').update({ published: !item.published }).eq('id', item.id)
    await load()
    await revalidatePublic()
  }

  async function remove(item: GalleryItem) {
    if (!confirm('정말 삭제하시겠습니까?')) return
    if (item.image_url) {
      const path = item.image_url.split('/gallery/').pop()
      if (path) await supabase.storage.from('gallery').remove([path])
    }
    await supabase.from('gallery_items').delete().eq('id', item.id)
    await load()
    await revalidatePublic()
  }

  return (
    <div>
      <div className="admin-form">
        <h3>갤러리 사진 등록</h3>
        <form className="form" style={{ marginTop: 0, maxWidth: 'none' }} onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="g-label">설명 (예: 발대식 현장) *</label>
            <input id="g-label" name="label" required />
          </div>
          <div className="field">
            <label htmlFor="g-image">사진 파일 (5MB 이하)</label>
            <input id="g-image" name="image" type="file" accept="image/*" />
          </div>
          {error && <p className="form-note" role="alert">⚠️ {error}</p>}
          <button type="submit" className="btn btn-primary" disabled={busy} style={{ padding: '12px 24px', fontSize: 14, justifySelf: 'start' }}>
            {busy ? '업로드 중…' : '등록하기'}
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', opacity: item.published ? 1 : 0.5 }}>
            <div style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg,#dfe8d8,#c5d4bb)', display: 'grid', placeItems: 'center' }}>
              {item.image_url
                ? // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image_url} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>사진 없음</span>}
            </div>
            <div style={{ padding: '12px 14px' }}>
              <b style={{ fontSize: 13.5 }}>{item.label}</b>
              <div className="row-actions" style={{ marginTop: 10 }}>
                <button className={`btn-sm ${item.published ? 'primary' : ''}`} onClick={() => togglePublished(item)}>
                  {item.published ? '노출 중' : '비노출'}
                </button>
                <button className="btn-sm danger" onClick={() => remove(item)}>삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="form-note">등록된 사진이 없습니다.</p>}
    </div>
  )
}

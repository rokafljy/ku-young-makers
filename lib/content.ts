// 공개 페이지용 콘텐츠 조회 — Supabase(published만) 우선, DB가 비어있으면 lib/data.ts 폴백
// 쿠키를 쓰지 않는 익명 클라이언트 → 페이지가 ISR(revalidate) 캐싱 가능
import { createClient as createAnonClient, SupabaseClient } from '@supabase/supabase-js'
import {
  notices as fbNotices,
  jobs as fbJobs,
  videos as fbVideos,
  galleryItems as fbGallery,
} from './data'

function db(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createAnonClient(url, key, { auth: { persistSession: false } })
}

export type NoticeView = { id: string; title: string; date: string; pinned: boolean; body: string }
export type JobView = { id: string; company: string; title: string; meta: string; dday: string; link: string | null }
export type VideoView = { id: string; cat: string; title: string; desc: string; videoId: string | null }
export type GalleryView = { id: string; label: string; imageUrl: string | null }
export type ReviewView = { id: string; name: string; cohort: string; track: string; content: string }

export async function getNotices(): Promise<NoticeView[]> {
  try {
    const supabase = db()
    if (!supabase) throw new Error('no env')
    const { data } = await supabase
      .from('notices').select('*').eq('published', true)
      .order('pinned', { ascending: false }).order('created_at', { ascending: false })
    if (data && data.length) {
      return data.map(n => ({
        id: n.id, title: n.title, date: String(n.created_at).slice(0, 10), pinned: n.pinned, body: n.body,
      }))
    }
  } catch {}
  return fbNotices.map(n => ({ ...n, pinned: !!n.pinned }))
}

export async function getNotice(id: string): Promise<NoticeView | null> {
  const all = await getNotices()
  return all.find(n => n.id === id) ?? null
}

export async function getJobs(): Promise<JobView[]> {
  try {
    const supabase = db()
    if (!supabase) throw new Error('no env')
    const { data } = await supabase
      .from('jobs').select('*').eq('published', true).order('created_at', { ascending: false })
    if (data && data.length) {
      return data.map(j => ({ id: j.id, company: j.company, title: j.title, meta: j.meta, dday: j.dday, link: j.link }))
    }
  } catch {}
  return fbJobs.map(j => ({ ...j, link: null }))
}

export async function getVideos(): Promise<VideoView[]> {
  try {
    const supabase = db()
    if (!supabase) throw new Error('no env')
    const { data } = await supabase
      .from('videos').select('*').eq('published', true).order('sort').order('created_at')
    if (data && data.length) {
      return data.map(v => ({ id: v.id, cat: v.cat, title: v.title, desc: v.description, videoId: v.video_id }))
    }
  } catch {}
  return fbVideos.map((v, i) => ({ id: String(i), ...v }))
}

export async function getGallery(): Promise<GalleryView[]> {
  try {
    const supabase = db()
    if (!supabase) throw new Error('no env')
    const { data } = await supabase
      .from('gallery_items').select('*').eq('published', true).order('sort').order('created_at')
    if (data && data.length) {
      return data.map(g => ({ id: g.id, label: g.label, imageUrl: g.image_url }))
    }
  } catch {}
  return fbGallery.map((label, i) => ({ id: String(i), label, imageUrl: null }))
}

export async function getReviews(): Promise<ReviewView[]> {
  try {
    const supabase = db()
    if (!supabase) throw new Error('no env')
    const { data } = await supabase
      .from('reviews').select('*').eq('published', true).order('created_at', { ascending: false })
    if (data) {
      return data.map(r => ({ id: r.id, name: r.name, cohort: r.cohort, track: r.track, content: r.content }))
    }
  } catch {}
  return []
}

export async function getSetting(key: string, fallback = ''): Promise<string> {
  try {
    const supabase = db()
    if (!supabase) throw new Error('no env')
    const { data } = await supabase.from('site_settings').select('value').eq('key', key).single()
    if (data && data.value) return data.value
  } catch {}
  return fallback
}

export async function getSettings(): Promise<Record<string, string>> {
  try {
    const supabase = db()
    if (!supabase) throw new Error('no env')
    const { data } = await supabase.from('site_settings').select('key, value')
    if (data) return Object.fromEntries(data.map(r => [r.key, r.value]))
  } catch {}
  return {}
}

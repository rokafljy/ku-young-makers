import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // 서버 컴포넌트에서 호출되면 쿠키 쓰기가 불가 — 미들웨어가 세션을 갱신하므로 무시
          }
        },
      },
    },
  )
}

export type Profile = {
  id: string
  email: string
  name: string
  phone: string
  school: string | null
  role: 'member' | 'admin'
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn'
  created_at: string
}

// 현재 로그인 사용자와 프로필을 함께 반환 (비로그인 시 둘 다 null)
export async function getUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { supabase, user: null, profile: null }
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return { supabase, user, profile: profile as Profile | null }
}

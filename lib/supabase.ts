import { createClient, SupabaseClient } from '@supabase/supabase-js'

// 환경변수 미설정 시 null 반환 → 폼은 "연동 전" 안내로 동작 (배포 전 로컬에서도 안전)
// 회원가입(Auth) 도입 시 @supabase/ssr 기반 클라이언트로 확장 예정
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

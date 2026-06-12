import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [pendingMembers, applications, unanswered] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('youth_applications').select('*', { count: 'exact', head: true }),
    supabase.from('questions').select('*', { count: 'exact', head: true }).is('answer', null),
  ])

  return (
    <div>
      <div className="admin-stats">
        <Link href="/admin/members" className="admin-stat">
          <b>{pendingMembers.count ?? 0}</b>
          <small>승인 대기 회원</small>
        </Link>
        <Link href="/admin/applications" className="admin-stat">
          <b>{applications.count ?? 0}</b>
          <small>누적 청년 지원서</small>
        </Link>
        <Link href="/admin/questions" className="admin-stat">
          <b>{unanswered.count ?? 0}</b>
          <small>미답변 질문</small>
        </Link>
      </div>
      <p className="form-note" style={{ marginTop: 24 }}>
        왼쪽 메뉴에서 회원 승인, 접수 관리, 콘텐츠 등록·수정·노출 관리를 할 수 있습니다.
        콘텐츠 변경은 공개 사이트에 즉시 반영됩니다.
      </p>
    </div>
  )
}

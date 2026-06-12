import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import { getUserProfile } from '@/lib/supabase/server'

export const metadata: Metadata = { title: '관리자 | KU YOUNG MAKERS' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getUserProfile()
  if (!profile || profile.role !== 'admin' || profile.status !== 'approved') redirect('/')

  return (
    <>
      <div className="page-hero" style={{ padding: '120px 0 40px' }}>
        <div className="wrap">
          <span className="eyebrow">Admin</span>
          <h1>관리자 페이지</h1>
        </div>
      </div>
      <main id="content" className="page-main">
        <div className="wrap admin-layout">
          <AdminNav />
          <div>{children}</div>
        </div>
      </main>
    </>
  )
}

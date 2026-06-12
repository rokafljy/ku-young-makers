'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/server'

const STATUS_LABEL: Record<string, string> = {
  pending: '승인 대기',
  approved: '승인 완료',
  rejected: '거절',
  withdrawn: '탈회',
}

export default function MembersAdmin() {
  const supabase = useMemo(() => createClient(), [])
  const [members, setMembers] = useState<Profile[]>([])
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setMembers((data ?? []) as Profile[])
  }, [supabase])

  useEffect(() => { load() }, [load])

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from('profiles').update({ status }).eq('id', id)
    if (error) setError(error.message)
    await load()
  }

  return (
    <div>
      {error && <p className="form-note" role="alert" style={{ marginBottom: 12 }}>⚠️ {error}</p>}
      <table className="admin-table">
        <thead>
          <tr><th>이름</th><th>이메일</th><th>연락처</th><th>학교/전공</th><th>가입일</th><th>상태</th><th>관리</th></tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td><b>{m.name}</b>{m.role === 'admin' && ' 👑'}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{m.school ?? '—'}</td>
              <td>{new Date(m.created_at).toLocaleDateString('ko-KR')}</td>
              <td><span className={`st ${m.status}`}>{STATUS_LABEL[m.status] ?? m.status}</span></td>
              <td>
                <div className="row-actions">
                  {m.status === 'pending' && (
                    <>
                      <button className="btn-sm primary" onClick={() => setStatus(m.id, 'approved')}>승인</button>
                      <button className="btn-sm danger" onClick={() => setStatus(m.id, 'rejected')}>거절</button>
                    </>
                  )}
                  {m.status === 'approved' && m.role !== 'admin' && (
                    <button className="btn-sm danger" onClick={() => { if (confirm('이 회원을 탈회 처리할까요?')) setStatus(m.id, 'withdrawn') }}>탈회 처리</button>
                  )}
                  {(m.status === 'rejected' || m.status === 'withdrawn') && (
                    <button className="btn-sm" onClick={() => setStatus(m.id, 'approved')}>재승인</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {members.length === 0 && (
            <tr><td colSpan={7} style={{ color: 'var(--ink-soft)' }}>가입한 회원이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

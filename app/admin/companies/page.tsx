'use client'

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type CompanyApp = {
  id: string
  created_at: string
  company: string
  industry: string
  manager: string
  phone: string
  email: string
  project: string
  status: string
}

const STATUSES = ['접수완료', '상담중', '협약체결', '보류']

export default function CompaniesAdmin() {
  const supabase = useMemo(() => createClient(), [])
  const [apps, setApps] = useState<CompanyApp[]>([])
  const [openId, setOpenId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('company_applications').select('*').order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setApps((data ?? []) as CompanyApp[])
  }, [supabase])

  useEffect(() => { load() }, [load])

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from('company_applications').update({ status }).eq('id', id)
    if (error) setError(error.message)
    await load()
  }

  return (
    <div>
      {error && <p className="form-note" role="alert" style={{ marginBottom: 12 }}>⚠️ {error}</p>}
      <table className="admin-table">
        <thead>
          <tr><th>신청일</th><th>기업명</th><th>업종</th><th>담당자</th><th>상태</th><th>관리</th></tr>
        </thead>
        <tbody>
          {apps.map(a => (
            <Fragment key={a.id}>
              <tr>
                <td>{a.created_at.slice(0, 10)}</td>
                <td><b>{a.company}</b></td>
                <td>{a.industry}</td>
                <td>{a.manager}</td>
                <td>
                  <select value={a.status} onChange={e => setStatus(a.id, e.target.value)}
                    style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid var(--line)', fontFamily: 'var(--body)', fontSize: 13 }}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <button className="btn-sm" onClick={() => setOpenId(openId === a.id ? null : a.id)}>
                    {openId === a.id ? '닫기' : '상세'}
                  </button>
                </td>
              </tr>
              {openId === a.id && (
                <tr>
                  <td colSpan={6}>
                    <div className="admin-detail">
                      연락처: {a.phone} · 이메일: {a.email}
                      {'\n\n'}[제안 과제 개요]{'\n'}{a.project}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
          {apps.length === 0 && (
            <tr><td colSpan={6} style={{ color: 'var(--ink-soft)' }}>접수된 기업 신청이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

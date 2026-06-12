'use client'

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type App = {
  id: string
  created_at: string
  name: string
  birth: string
  phone: string
  email: string
  school: string | null
  state: string
  track: string
  motive: string
  status: string
}

const STATUSES = ['접수완료', '서류통과', '면접대상', '최종합격', '불합격']

export default function ApplicationsAdmin() {
  const supabase = useMemo(() => createClient(), [])
  const [apps, setApps] = useState<App[]>([])
  const [openId, setOpenId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('youth_applications').select('*').order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setApps((data ?? []) as App[])
  }, [supabase])

  useEffect(() => { load() }, [load])

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from('youth_applications').update({ status }).eq('id', id)
    if (error) setError(error.message)
    await load()
  }

  function exportCsv() {
    const header = ['접수일', '이름', '생년월일', '연락처', '이메일', '학교/전공', '상태구분', '희망직무', '지원동기', '진행상태']
    const rows = apps.map(a => [
      a.created_at.slice(0, 10), a.name, a.birth, a.phone, a.email, a.school ?? '', a.state, a.track,
      a.motive.replace(/"/g, '""').replace(/\r?\n/g, ' '), a.status,
    ])
    const csv = [header, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\r\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'youth_applications.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
        <p className="form-note">총 {apps.length}건</p>
        <button className="btn-sm" onClick={exportCsv}>📥 엑셀(CSV) 내보내기</button>
      </div>
      {error && <p className="form-note" role="alert" style={{ marginBottom: 12 }}>⚠️ {error}</p>}
      <table className="admin-table">
        <thead>
          <tr><th>접수일</th><th>이름</th><th>연락처</th><th>희망직무</th><th>진행상태</th><th>관리</th></tr>
        </thead>
        <tbody>
          {apps.map(a => (
            <Fragment key={a.id}>
              <tr>
                <td>{a.created_at.slice(0, 10)}</td>
                <td><b>{a.name}</b></td>
                <td>{a.phone}</td>
                <td>{a.track}</td>
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
                      이메일: {a.email} · 생년월일: {a.birth} · 학교/전공: {a.school ?? '—'} · 상태: {a.state}
                      {'\n\n'}[지원 동기 및 수행 계획]{'\n'}{a.motive}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
          {apps.length === 0 && (
            <tr><td colSpan={6} style={{ color: 'var(--ink-soft)' }}>접수된 지원서가 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { revalidatePublic } from '@/app/actions'

const SETTINGS: { key: string; label: string; type?: string; hint?: string }[] = [
  { key: 'recruit_start', label: '모집 시작일', type: 'date' },
  { key: 'recruit_end', label: '모집 마감일', type: 'date', hint: '입력하면 메인에 D-day 배너가 표시됩니다' },
  { key: 'contact_phone', label: '문의 전화' },
  { key: 'contact_email', label: '문의 이메일' },
  { key: 'youtube_channel', label: '유튜브 채널 URL', hint: '인사이트 섹션의 "채널 전체 보기" 링크' },
]

export default function SettingsAdmin() {
  const supabase = useMemo(() => createClient(), [])
  const [values, setValues] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.from('site_settings').select('key, value').then(({ data }) => {
      if (data) setValues(Object.fromEntries(data.map(r => [r.key, r.value])))
    })
  }, [supabase])

  async function save() {
    setBusy(true)
    setMessage('')
    const rows = SETTINGS.map(s => ({ key: s.key, value: values[s.key] ?? '', updated_at: new Date().toISOString() }))
    const { error } = await supabase.from('site_settings').upsert(rows)
    if (error) setMessage(`⚠️ ${error.message}`)
    else {
      await revalidatePublic()
      setMessage('✅ 저장되었습니다. 공개 사이트에 반영됩니다.')
    }
    setBusy(false)
  }

  return (
    <div className="admin-form">
      <h3>사이트 설정</h3>
      <div className="form" style={{ marginTop: 0, maxWidth: 560 }}>
        {SETTINGS.map(s => (
          <div className="field" key={s.key}>
            <label htmlFor={`set-${s.key}`}>{s.label}</label>
            <input
              id={`set-${s.key}`}
              type={s.type ?? 'text'}
              value={values[s.key] ?? ''}
              onChange={e => setValues(v => ({ ...v, [s.key]: e.target.value }))}
            />
            {s.hint && <small style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{s.hint}</small>}
          </div>
        ))}
        {message && <p className="form-note" role="status">{message}</p>}
        <button className="btn btn-primary" disabled={busy} onClick={save} style={{ padding: '12px 24px', fontSize: 14, justifySelf: 'start' }}>
          {busy ? '저장 중…' : '설정 저장'}
        </button>
      </div>
    </div>
  )
}

'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { revalidatePublic } from '@/app/actions'

export type Field = {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'checkbox' | 'number' | 'date'
  required?: boolean
  placeholder?: string
}

type Item = Record<string, any>

// 콘텐츠 테이블 공용 관리 UI: 목록 + 등록/수정 폼 + 노출 토글 + 삭제
export default function ContentManager({
  table,
  title,
  fields,
  listCols,
}: {
  table: string
  title: string
  fields: Field[]
  listCols: { key: string; label: string }[]
}) {
  const supabase = useMemo(() => createClient(), [])
  const [items, setItems] = useState<Item[]>([])
  const [editing, setEditing] = useState<Item | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setItems(data ?? [])
  }, [supabase, table])

  useEffect(() => { load() }, [load])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const row: Item = {}
    for (const f of fields) {
      if (f.type === 'checkbox') row[f.key] = fd.get(f.key) === 'on'
      else if (f.type === 'number') row[f.key] = Number(fd.get(f.key) || 0)
      else row[f.key] = String(fd.get(f.key) ?? '').trim()
    }
    const { error } = editing
      ? await supabase.from(table).update(row).eq('id', editing.id)
      : await supabase.from(table).insert(row)
    if (error) setError(error.message)
    else {
      setEditing(null)
      await load()
      await revalidatePublic()
    }
    setBusy(false)
  }

  async function togglePublished(item: Item) {
    await supabase.from(table).update({ published: !item.published }).eq('id', item.id)
    await load()
    await revalidatePublic()
  }

  async function remove(item: Item) {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await supabase.from(table).delete().eq('id', item.id)
    await load()
    await revalidatePublic()
  }

  return (
    <div>
      <div className="admin-form">
        <h3>{editing ? `${title} 수정` : `${title} 등록`}</h3>
        <form className="form" style={{ marginTop: 0, maxWidth: 'none' }} onSubmit={onSubmit} key={editing?.id ?? 'new'}>
          {fields.map(f =>
            f.type === 'checkbox' ? (
              <label className="check-row" key={f.key}>
                <input type="checkbox" name={f.key} defaultChecked={editing ? !!editing[f.key] : f.key === 'published'} />
                <span>{f.label}</span>
              </label>
            ) : (
              <div className="field" key={f.key}>
                <label htmlFor={`cm-${f.key}`}>{f.label}{f.required ? ' *' : ''}</label>
                {f.type === 'textarea' ? (
                  <textarea id={`cm-${f.key}`} name={f.key} required={f.required} placeholder={f.placeholder} defaultValue={editing?.[f.key] ?? ''} />
                ) : (
                  <input id={`cm-${f.key}`} name={f.key} type={f.type ?? 'text'} required={f.required} placeholder={f.placeholder} defaultValue={editing?.[f.key] ?? ''} />
                )}
              </div>
            ),
          )}
          {error && <p className="form-note" role="alert">⚠️ {error}</p>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary" disabled={busy} style={{ padding: '12px 24px', fontSize: 14 }}>
              {busy ? '저장 중…' : editing ? '수정 저장' : '등록하기'}
            </button>
            {editing && (
              <button type="button" className="btn btn-outline-dark" style={{ padding: '12px 24px', fontSize: 14 }} onClick={() => setEditing(null)}>
                취소
              </button>
            )}
          </div>
        </form>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            {listCols.map(c => <th key={c.key}>{c.label}</th>)}
            <th>노출</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} style={item.published ? undefined : { opacity: 0.5 }}>
              {listCols.map(c => (
                <td key={c.key}>{typeof item[c.key] === 'boolean' ? (item[c.key] ? '✓' : '—') : String(item[c.key] ?? '').slice(0, 40)}</td>
              ))}
              <td>
                <button className={`btn-sm ${item.published ? 'primary' : ''}`} onClick={() => togglePublished(item)}>
                  {item.published ? '노출 중' : '비노출'}
                </button>
              </td>
              <td>
                <div className="row-actions">
                  <button className="btn-sm" onClick={() => setEditing(item)}>수정</button>
                  <button className="btn-sm danger" onClick={() => remove(item)}>삭제</button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={listCols.length + 2} style={{ color: 'var(--ink-soft)' }}>등록된 항목이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

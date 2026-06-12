'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Question = {
  id: string
  created_at: string
  name: string
  email: string
  question: string
  answer: string | null
  answered_at: string | null
}

export default function QuestionsAdmin() {
  const supabase = useMemo(() => createClient(), [])
  const [questions, setQuestions] = useState<Question[]>([])
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('questions').select('*').order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setQuestions((data ?? []) as Question[])
  }, [supabase])

  useEffect(() => { load() }, [load])

  async function saveAnswer(id: string) {
    const answer = (drafts[id] ?? '').trim()
    if (!answer) return
    const { error } = await supabase
      .from('questions')
      .update({ answer, answered_at: new Date().toISOString() })
      .eq('id', id)
    if (error) setError(error.message)
    setDrafts(d => ({ ...d, [id]: '' }))
    await load()
  }

  return (
    <div>
      {error && <p className="form-note" role="alert" style={{ marginBottom: 12 }}>⚠️ {error}</p>}
      {questions.map(q => (
        <div className="admin-form" key={q.id}>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 8 }}>
            {q.created_at.slice(0, 10)} · {q.name} ({q.email})
            {q.answer
              ? <span className="st approved" style={{ marginLeft: 10 }}>답변 완료</span>
              : <span className="st pending" style={{ marginLeft: 10 }}>답변 대기</span>}
          </p>
          <p style={{ fontSize: 15, fontWeight: 600 }}>Q. {q.question}</p>
          {q.answer && <div className="mp-answer" style={{ marginTop: 10 }}><b>A.</b> {q.answer}</div>}
          <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'flex-start' }}>
            <textarea
              placeholder={q.answer ? '답변 수정...' : '답변 작성...'}
              value={drafts[q.id] ?? ''}
              onChange={e => setDrafts(d => ({ ...d, [q.id]: e.target.value }))}
              style={{ flex: 1, minHeight: 70, padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 12, fontFamily: 'var(--body)', fontSize: 14, resize: 'vertical' }}
            />
            <button className="btn-sm primary" onClick={() => saveAnswer(q.id)} style={{ marginTop: 4 }}>
              {q.answer ? '수정' : '답변 등록'}
            </button>
          </div>
        </div>
      ))}
      {questions.length === 0 && <p className="form-note">등록된 질문이 없습니다.</p>}
    </div>
  )
}

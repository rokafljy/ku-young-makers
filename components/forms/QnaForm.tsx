'use client'

import { useActionState } from 'react'
import { submitQuestion } from '@/app/actions'

export default function QnaForm() {
  const [result, formAction, pending] = useActionState(submitQuestion, null)

  if (result?.ok) {
    return <div className="form-done">✅ {result.message}</div>
  }

  return (
    <form className="form" action={formAction}>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="q-name">이름 *</label>
          <input id="q-name" name="name" required placeholder="홍길동" />
        </div>
        <div className="field">
          <label htmlFor="q-email">이메일 *</label>
          <input id="q-email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="q-question">질문 내용 *</label>
        <textarea id="q-question" name="question" required placeholder="궁금한 점을 남겨 주세요." />
      </div>
      {result && !result.ok && <p className="form-note" role="alert">⚠️ {result.message}</p>}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? '등록 중…' : '질문 남기기 →'}
      </button>
    </form>
  )
}

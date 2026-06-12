'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { submitQuestion } from '@/app/actions'

export default function QnaForm() {
  const [result, formAction, pending] = useActionState(submitQuestion, null)

  if (result?.ok) {
    return (
      <div className="form-done">
        ✅ {result.message}
        <p style={{ marginTop: 12 }}>
          <Link href="/mypage" className="more-link">마이페이지에서 확인하기 →</Link>
        </p>
      </div>
    )
  }

  return (
    <form className="form" action={formAction}>
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

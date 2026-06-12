'use client'

import { useActionState } from 'react'
import { lookupStatus } from '@/app/actions'

export default function StatusForm() {
  const [result, formAction, pending] = useActionState(lookupStatus, null)

  return (
    <>
      <form className="form" action={formAction}>
        <div className="form-grid2">
          <div className="field">
            <label htmlFor="s-name">이름 *</label>
            <input id="s-name" name="name" required placeholder="홍길동" />
          </div>
          <div className="field">
            <label htmlFor="s-email">지원 시 입력한 이메일 *</label>
            <input id="s-email" name="email" type="email" required placeholder="you@example.com" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? '조회 중…' : '조회하기 →'}
        </button>
      </form>
      {result && (
        <div className="form-done" role="status">
          {result.ok ? '✅' : 'ℹ️'} {result.message}
        </div>
      )}
    </>
  )
}

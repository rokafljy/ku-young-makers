'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signIn } from '@/app/actions'

export default function LoginForm() {
  const [result, formAction, pending] = useActionState(signIn, null)

  return (
    <form className="form" action={formAction}>
      <div className="field">
        <label htmlFor="li-email">이메일 *</label>
        <input id="li-email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="li-password">비밀번호 *</label>
        <input id="li-password" name="password" type="password" required />
      </div>
      {result && !result.ok && <p className="form-note" role="alert">⚠️ {result.message}</p>}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? '로그인 중…' : '로그인 →'}
      </button>
      <p className="form-note">
        아직 회원이 아니신가요? <Link href="/signup" className="more-link">회원가입</Link>
      </p>
    </form>
  )
}

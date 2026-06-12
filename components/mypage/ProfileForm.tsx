'use client'

import { useActionState } from 'react'
import { updateProfile } from '@/app/actions'
import type { Profile } from '@/lib/supabase/server'

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [result, formAction, pending] = useActionState(updateProfile, null)

  return (
    <form className="form" action={formAction}>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="pf-name">이름 *</label>
          <input id="pf-name" name="name" required defaultValue={profile.name} />
        </div>
        <div className="field">
          <label htmlFor="pf-phone">연락처 *</label>
          <input id="pf-phone" name="phone" type="tel" required defaultValue={profile.phone} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="pf-school">학교 / 전공</label>
        <input id="pf-school" name="school" defaultValue={profile.school ?? ''} />
      </div>
      {result && (
        <p className="form-note" role={result.ok ? 'status' : 'alert'}>
          {result.ok ? '✅' : '⚠️'} {result.message}
        </p>
      )}
      <button type="submit" className="btn btn-dark" disabled={pending} style={{ justifySelf: 'start' }}>
        {pending ? '저장 중…' : '회원정보 저장'}
      </button>
    </form>
  )
}

'use client'

import { useTransition } from 'react'
import { withdrawMembership } from '@/app/actions'

export default function WithdrawButton() {
  const [pending, startTransition] = useTransition()

  function onClick() {
    if (!confirm('정말 탈회하시겠습니까?\n탈회 후에는 지원 현황을 확인할 수 없습니다.')) return
    startTransition(() => withdrawMembership())
  }

  return (
    <button onClick={onClick} disabled={pending} className="btn btn-outline-dark" style={{ fontSize: 13.5, padding: '10px 20px' }}>
      {pending ? '처리 중…' : '회원 탈회'}
    </button>
  )
}

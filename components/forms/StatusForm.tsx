'use client'

import { FormEvent, useState } from 'react'

// TODO: Firebase(Auth/Firestore) 연동 시 실제 지원현황 조회 구현
export default function StatusForm() {
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <div className="form-done">
        ℹ️ 지원현황 조회는 2026 모집 접수가 시작된 후 제공됩니다. (Firebase 연동 예정)<br />
        모집 일정은 공지사항에서 확인해 주세요.
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
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
      <button type="submit" className="btn btn-primary">조회하기 →</button>
    </form>
  )
}

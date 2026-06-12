'use client'

import { FormEvent, useState } from 'react'

// TODO: Firebase(Firestore) 연동 시 Q&A 게시판으로 전환 (별도 프로젝트 권장 — CLAUDE.md)
export default function QnaForm() {
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <div className="form-done">
        ✅ 질문 내용이 확인되었습니다.<br />
        현재는 프로토타입 단계로, Q&amp;A 게시판은 Firebase 연동 후 제공됩니다. 급한 문의는 문의처로 연락해 주세요.
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
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
      <button type="submit" className="btn btn-primary">질문 남기기 →</button>
    </form>
  )
}

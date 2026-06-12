import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import PageHero from '@/components/PageHero'
import ProfileForm from '@/components/mypage/ProfileForm'
import WithdrawButton from '@/components/mypage/WithdrawButton'
import { getUserProfile } from '@/lib/supabase/server'
import { signOutAction } from '@/app/actions'

export const metadata: Metadata = { title: '마이페이지 | KU YOUNG MAKERS' }

const STATUS_LABEL: Record<string, string> = {
  pending: '승인 대기',
  approved: '승인 완료',
  rejected: '승인 거절',
  withdrawn: '탈회',
}

export default async function MyPage() {
  const { supabase, user, profile } = await getUserProfile()
  if (!user || !profile) redirect('/login')

  const [{ data: applications }, { data: questions }] = await Promise.all([
    supabase.from('youth_applications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('questions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
  ])

  return (
    <>
      <PageHero eyebrow="My Page" title="마이페이지" desc={`${profile.name || user.email}님, 환영합니다.`} />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="mp-card">
            <div className="mp-head">
              <h2>회원 상태</h2>
              <span className={`st ${profile.status}`}>{STATUS_LABEL[profile.status] ?? profile.status}</span>
            </div>
            {profile.status === 'pending' && (
              <p className="form-note">운영자 승인 후 지원서 제출이 가능합니다. 승인은 영업일 기준 1~2일 내 처리됩니다.</p>
            )}
            {profile.status === 'approved' && (
              <p className="form-note">
                승인된 회원입니다. <Link href="/apply" className="more-link">지원서 제출하기 →</Link>
              </p>
            )}
            {profile.role === 'admin' && (
              <p className="form-note">
                관리자 계정입니다. <Link href="/admin" className="more-link">관리자 페이지 →</Link>
              </p>
            )}
          </div>

          <div className="mp-card">
            <div className="mp-head"><h2>내 지원 현황</h2></div>
            {applications && applications.length > 0 ? (
              <div className="mp-list">
                {applications.map(a => (
                  <div className="mp-row" key={a.id}>
                    <div>
                      <b>{a.track}</b>
                      <small>{new Date(a.created_at).toLocaleDateString('ko-KR')} 접수</small>
                    </div>
                    <span className="st approved">{a.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="form-note">제출한 지원서가 없습니다.</p>
            )}
          </div>

          <div className="mp-card">
            <div className="mp-head"><h2>내 질문</h2></div>
            {questions && questions.length > 0 ? (
              <div className="mp-list">
                {questions.map(q => (
                  <div className="mp-qa" key={q.id}>
                    <p><b>Q.</b> {q.question}</p>
                    {q.answer ? (
                      <p className="mp-answer"><b>A.</b> {q.answer}</p>
                    ) : (
                      <p className="form-note">답변 대기 중</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="form-note">
                등록한 질문이 없습니다. <Link href="/qna" className="more-link">질문 남기기 →</Link>
              </p>
            )}
          </div>

          <div className="mp-card">
            <div className="mp-head"><h2>회원정보 수정</h2></div>
            <ProfileForm profile={profile} />
          </div>

          <div className="mp-actions">
            <form action={signOutAction}>
              <button type="submit" className="btn btn-dark" style={{ fontSize: 13.5, padding: '10px 20px' }}>로그아웃</button>
            </form>
            <WithdrawButton />
          </div>
        </div>
      </main>
    </>
  )
}

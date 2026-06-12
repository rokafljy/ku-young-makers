import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = { title: '개인정보처리방침 | KU YOUNG MAKERS' }

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="개인정보처리방침" />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="notice-detail">
            <div className="n-body" style={{ whiteSpace: 'pre-wrap', borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
{`건국대학교 한국지속가능경영연구원(이하 "운영기관")은 KU YOUNG MAKERS 홈페이지(이하 "사이트") 운영과 관련하여 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 다음과 같이 처리합니다.

1. 수집하는 개인정보 항목
- 회원가입: 이름, 이메일, 비밀번호, 연락처, 학교/전공(선택)
- 일경험 지원서: 이름, 생년월일, 연락처, 이메일, 학교/전공, 재학상태, 희망직무, 지원동기
- 기업 참여 신청: 기업명, 업종, 담당자명, 연락처, 이메일, 제안 과제
- Q&A: 이름, 이메일, 질문 내용

2. 개인정보의 수집·이용 목적
- 미래내일 일경험 지원사업 참여자 모집·선발·운영 및 결과 안내
- 회원 관리(가입 승인, 본인 확인, 문의 응대)
- 참여기업 매칭 및 상담

3. 보유 및 이용 기간
- 회원 탈퇴 또는 사업 종료 후 지체 없이 파기합니다. 단, 관계 법령 및 고용노동부·한국산업인력공단의 사업 지침에 따라 보존이 필요한 정보는 해당 기간 동안 보관합니다. (보존 기간: 사업 지침 확인 후 업데이트)

4. 개인정보의 제3자 제공
- 미래내일 일경험 지원사업 운영을 위해 고용노동부, 한국산업인력공단 및 참여기업에 선발·매칭에 필요한 최소한의 정보가 제공될 수 있습니다.

5. 정보주체의 권리
- 이용자는 언제든지 본인의 개인정보 열람·정정·삭제·처리정지를 요구할 수 있으며, 마이페이지에서 직접 수정하거나 탈회할 수 있습니다.

6. 개인정보 보호책임자
- 소속: 건국대학교 한국지속가능경영연구원
- 연락처: 02-000-0000 / kym@konkuk.ac.kr (업데이트)

본 방침은 2026년 6월 12일부터 적용됩니다.
※ 본 문서는 초안이며, 사업 지침 확정 후 보존 기간·책임자 정보 등을 운영기관 확인을 거쳐 갱신해야 합니다.`}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

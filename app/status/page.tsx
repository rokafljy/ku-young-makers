import { redirect } from 'next/navigation'

// 지원현황 조회는 마이페이지로 통합됨
export default function StatusPage() {
  redirect('/mypage')
}

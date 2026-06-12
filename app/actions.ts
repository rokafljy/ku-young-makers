'use server'

import { getSupabase } from '@/lib/supabase'

export type FormResult = { ok: boolean; message: string }

const NOT_CONFIGURED: FormResult = {
  ok: false,
  message: '아직 접수 시스템 연동 전입니다. 모집 시작 시 공지사항을 확인해 주세요.',
}

const SUBMIT_ERROR: FormResult = {
  ok: false,
  message: '접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
}

function required(formData: FormData, keys: string[]): Record<string, string> | null {
  const out: Record<string, string> = {}
  for (const k of keys) {
    const v = formData.get(k)
    if (typeof v !== 'string' || !v.trim()) return null
    out[k] = v.trim()
  }
  return out
}

export async function submitYouthApplication(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const supabase = getSupabase()
  if (!supabase) return NOT_CONFIGURED

  const data = required(formData, ['name', 'birth', 'phone', 'email', 'state', 'track', 'motive'])
  if (!data) return { ok: false, message: '필수 항목을 모두 입력해 주세요.' }

  const { error } = await supabase.from('youth_applications').insert({
    ...data,
    school: String(formData.get('school') ?? '').trim() || null,
  })
  if (error) {
    console.error('youth_applications insert:', error.message)
    return SUBMIT_ERROR
  }
  return {
    ok: true,
    message: '지원서가 접수되었습니다. 서류 결과는 입력하신 이메일과 지원현황 조회 페이지에서 확인할 수 있습니다.',
  }
}

export async function submitCompanyApplication(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const supabase = getSupabase()
  if (!supabase) return NOT_CONFIGURED

  const data = required(formData, ['company', 'industry', 'manager', 'phone', 'email', 'project'])
  if (!data) return { ok: false, message: '필수 항목을 모두 입력해 주세요.' }

  const { error } = await supabase.from('company_applications').insert(data)
  if (error) {
    console.error('company_applications insert:', error.message)
    return SUBMIT_ERROR
  }
  return {
    ok: true,
    message: '기업 참여 신청이 접수되었습니다. 운영사무국에서 과제 정의 상담을 위해 연락드리겠습니다.',
  }
}

export async function submitQuestion(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const supabase = getSupabase()
  if (!supabase) return NOT_CONFIGURED

  const data = required(formData, ['name', 'email', 'question'])
  if (!data) return { ok: false, message: '필수 항목을 모두 입력해 주세요.' }

  const { error } = await supabase.from('questions').insert(data)
  if (error) {
    console.error('questions insert:', error.message)
    return SUBMIT_ERROR
  }
  return { ok: true, message: '질문이 등록되었습니다. 답변은 입력하신 이메일로 안내드립니다.' }
}

export async function lookupStatus(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const supabase = getSupabase()
  if (!supabase) {
    return { ok: false, message: '지원현황 조회는 모집 접수가 시작된 후 제공됩니다.' }
  }

  const data = required(formData, ['name', 'email'])
  if (!data) return { ok: false, message: '이름과 이메일을 모두 입력해 주세요.' }

  // RLS로 테이블 직접 조회는 차단 — security definer 함수로만 본인 상태 조회
  const { data: status, error } = await supabase.rpc('lookup_application_status', {
    p_name: data.name,
    p_email: data.email,
  })
  if (error) {
    console.error('lookup_application_status:', error.message)
    return SUBMIT_ERROR
  }
  if (!status) {
    return { ok: false, message: '조회 결과가 없습니다. 지원 시 입력한 이름과 이메일을 다시 확인해 주세요.' }
  }
  return { ok: true, message: `현재 지원 상태: ${status}` }
}

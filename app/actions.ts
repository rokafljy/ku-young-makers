'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, getUserProfile } from '@/lib/supabase/server'

export type FormResult = { ok: boolean; message: string }

const SUBMIT_ERROR: FormResult = {
  ok: false,
  message: '처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
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

// ===== 회원 =====

export async function signUp(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const data = required(formData, ['name', 'email', 'password', 'phone'])
  if (!data) return { ok: false, message: '필수 항목을 모두 입력해 주세요.' }
  if (formData.get('consent') !== 'on') {
    return { ok: false, message: '개인정보 수집·이용에 동의해 주세요.' }
  }
  if (data.password.length < 8) {
    return { ok: false, message: '비밀번호는 8자 이상이어야 합니다.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        phone: data.phone,
        school: String(formData.get('school') ?? '').trim() || null,
      },
    },
  })
  if (error) {
    console.error('signUp:', error.message)
    if (error.message.includes('already registered')) {
      return { ok: false, message: '이미 가입된 이메일입니다. 로그인해 주세요.' }
    }
    return SUBMIT_ERROR
  }
  redirect('/mypage')
}

export async function signIn(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const data = required(formData, ['email', 'password'])
  if (!data) return { ok: false, message: '이메일과 비밀번호를 입력해 주세요.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  if (error) {
    return { ok: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' }
  }
  redirect('/mypage')
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function updateProfile(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const { supabase, user } = await getUserProfile()
  if (!user) return { ok: false, message: '로그인이 필요합니다.' }

  const data = required(formData, ['name', 'phone'])
  if (!data) return { ok: false, message: '이름과 연락처를 입력해 주세요.' }

  const { error } = await supabase
    .from('profiles')
    .update({ name: data.name, phone: data.phone, school: String(formData.get('school') ?? '').trim() || null })
    .eq('id', user.id)
  if (error) {
    console.error('updateProfile:', error.message)
    return SUBMIT_ERROR
  }
  revalidatePath('/mypage')
  return { ok: true, message: '회원정보가 수정되었습니다.' }
}

export async function withdrawMembership(): Promise<void> {
  const { supabase, user } = await getUserProfile()
  if (user) {
    await supabase.from('profiles').update({ status: 'withdrawn' }).eq('id', user.id)
    await supabase.auth.signOut()
  }
  redirect('/?withdrawn=1')
}

// ===== 접수 =====

export async function submitYouthApplication(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const { supabase, user, profile } = await getUserProfile()
  if (!user || !profile) return { ok: false, message: '로그인이 필요합니다.' }
  if (profile.status !== 'approved') {
    return { ok: false, message: '운영자 승인 후 지원할 수 있습니다. 승인 상태는 마이페이지에서 확인해 주세요.' }
  }
  if (formData.get('consent') !== 'on') {
    return { ok: false, message: '개인정보 수집·이용에 동의해 주세요.' }
  }

  const data = required(formData, ['name', 'birth', 'phone', 'email', 'state', 'track', 'motive'])
  if (!data) return { ok: false, message: '필수 항목을 모두 입력해 주세요.' }

  const { error } = await supabase.from('youth_applications').insert({
    ...data,
    school: String(formData.get('school') ?? '').trim() || null,
    user_id: user.id,
  })
  if (error) {
    console.error('youth_applications insert:', error.message)
    return SUBMIT_ERROR
  }
  revalidatePath('/mypage')
  return { ok: true, message: '지원서가 접수되었습니다. 진행 상태는 마이페이지에서 확인할 수 있습니다.' }
}

export async function submitCompanyApplication(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const supabase = await createClient()
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
  const { supabase, user, profile } = await getUserProfile()
  if (!user || !profile) return { ok: false, message: '질문 작성은 로그인 후 가능합니다.' }

  const question = String(formData.get('question') ?? '').trim()
  if (!question) return { ok: false, message: '질문 내용을 입력해 주세요.' }

  const { error } = await supabase.from('questions').insert({
    name: profile.name || user.email,
    email: user.email,
    question,
    user_id: user.id,
  })
  if (error) {
    console.error('questions insert:', error.message)
    return SUBMIT_ERROR
  }
  revalidatePath('/mypage')
  return { ok: true, message: '질문이 등록되었습니다. 답변은 마이페이지에서 확인할 수 있습니다.' }
}

// ===== 관리자 보조 =====

// 관리자 페이지(클라이언트)에서 콘텐츠 변경 후 공개 페이지 캐시 무효화
export async function revalidatePublic(): Promise<void> {
  revalidatePath('/', 'layout')
}

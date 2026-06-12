'use client'

import ContentManager from '@/components/admin/ContentManager'

export default function JobsAdmin() {
  return (
    <ContentManager
      table="jobs"
      title="채용공고"
      fields={[
        { key: 'company', label: '기업명', required: true },
        { key: 'title', label: '공고 제목', required: true },
        { key: 'meta', label: '근무 조건 (예: 서울 · 신입 · 정규직)', required: true },
        { key: 'dday', label: '마감 표시 (예: D-14, 상시)', required: true, placeholder: '상시' },
        { key: 'link', label: '공고 링크 (URL)', placeholder: 'https://...' },
        { key: 'published', label: '사이트에 노출', type: 'checkbox' },
      ]}
      listCols={[
        { key: 'company', label: '기업' },
        { key: 'title', label: '공고' },
        { key: 'dday', label: '마감' },
      ]}
    />
  )
}

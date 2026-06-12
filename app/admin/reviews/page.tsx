'use client'

import ContentManager from '@/components/admin/ContentManager'

export default function ReviewsAdmin() {
  return (
    <ContentManager
      table="reviews"
      title="수료생 후기"
      fields={[
        { key: 'name', label: '이름 (예: 김OO)', required: true },
        { key: 'cohort', label: '기수 (예: 2025년 참여)', required: true },
        { key: 'track', label: '참여 트랙 (예: 롯데홈쇼핑 라이브커머스)', required: true },
        { key: 'content', label: '후기 내용', type: 'textarea', required: true },
        { key: 'published', label: '사이트에 노출', type: 'checkbox' },
      ]}
      listCols={[
        { key: 'name', label: '이름' },
        { key: 'cohort', label: '기수' },
        { key: 'content', label: '내용' },
      ]}
    />
  )
}

'use client'

import ContentManager from '@/components/admin/ContentManager'

export default function NoticesAdmin() {
  return (
    <ContentManager
      table="notices"
      title="공지사항"
      fields={[
        { key: 'title', label: '제목', required: true },
        { key: 'body', label: '내용', type: 'textarea', required: true },
        { key: 'pinned', label: '상단 고정 (★)', type: 'checkbox' },
        { key: 'published', label: '사이트에 노출', type: 'checkbox' },
      ]}
      listCols={[
        { key: 'title', label: '제목' },
        { key: 'pinned', label: '고정' },
      ]}
    />
  )
}

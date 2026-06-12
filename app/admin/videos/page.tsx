'use client'

import ContentManager from '@/components/admin/ContentManager'

export default function VideosAdmin() {
  return (
    <ContentManager
      table="videos"
      title="인사이트 영상"
      fields={[
        { key: 'cat', label: '카테고리 (예: 직무 교육)', required: true },
        { key: 'title', label: '영상 제목', required: true },
        { key: 'description', label: '한 줄 설명' },
        { key: 'video_id', label: '유튜브 영상 ID (예: dQw4w9WgXcQ — 주소의 v= 뒷부분)', placeholder: '입력하면 자동 임베드됩니다' },
        { key: 'sort', label: '정렬 순서 (숫자가 작을수록 앞)', type: 'number' },
        { key: 'published', label: '사이트에 노출', type: 'checkbox' },
      ]}
      listCols={[
        { key: 'cat', label: '카테고리' },
        { key: 'title', label: '제목' },
        { key: 'video_id', label: '영상 ID' },
      ]}
    />
  )
}

import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'

export const metadata: Metadata = {
  title: 'KU YOUNG MAKERS | 2026 미래내일 일경험 지원사업',
  description: '건국대학교 KU YOUNG MAKERS — 기업 실전 프로젝트 8주, 일경험이 커리어가 되는 시간',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#content" className="skip">본문 바로가기</a>
        <RevealObserver />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

import Hero from '@/components/home/Hero'
import QuickHub from '@/components/home/QuickHub'
import About from '@/components/home/About'
import Recruit from '@/components/home/Recruit'
import Journey from '@/components/home/Journey'
import Companies from '@/components/home/Companies'
import Insight from '@/components/home/Insight'
import CareersPreview from '@/components/home/CareersPreview'
import NoticeFaq from '@/components/home/NoticeFaq'
import GalleryPreview from '@/components/home/GalleryPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <main id="content">
        <QuickHub />
        <About />
        <Recruit />
        <Journey />
        <Companies />
        <Insight />
        <CareersPreview />
        <NoticeFaq />
        <GalleryPreview />
      </main>
    </>
  )
}

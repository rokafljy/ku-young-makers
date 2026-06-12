import Hero from '@/components/home/Hero'
import QuickHub from '@/components/home/QuickHub'
import About from '@/components/home/About'
import Recruit from '@/components/home/Recruit'
import Journey from '@/components/home/Journey'
import Companies from '@/components/home/Companies'
import Reviews from '@/components/home/Reviews'
import Insight from '@/components/home/Insight'
import CareersPreview from '@/components/home/CareersPreview'
import NoticeFaq from '@/components/home/NoticeFaq'
import GalleryPreview from '@/components/home/GalleryPreview'

export const revalidate = 60

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
        <Reviews />
        <Insight />
        <CareersPreview />
        <NoticeFaq />
        <GalleryPreview />
      </main>
    </>
  )
}

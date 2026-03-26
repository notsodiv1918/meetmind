import Header from '@/components/layout/Header'
import Hero from '@/components/layout/Hero'
import MeetingInput from '@/components/mom/MeetingInput'
import Footer from '@/components/layout/Footer'
import ShaderBackground from '@/components/ui/ShaderBackground'
import CursorOrb from '@/components/ui/CursorOrb'
import FeaturesSection from '@/components/layout/FeaturesSection'

export default function Home() {
  return (
    <>
      <CursorOrb />
      <ShaderBackground>
        <Header />
        <Hero />

        <div
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.88) 6%, rgba(0,0,0,0.96) 100%)',
          }}
        >
          {/* Features section — nav "Features" scrolls here */}
          <FeaturesSection />

          {/* App / Generate section */}
          <div id="app-section" className="max-w-8xl mx-auto px-6 lg:px-12 pt-10 pb-32">
            <MeetingInput />
          </div>

          <Footer />
        </div>
      </ShaderBackground>
    </>
  )
}

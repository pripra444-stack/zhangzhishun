// src/App.tsx
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BiographyScroll from './components/BiographyScroll'
import PracticeSection from './components/PracticeSection'

function Footer() {
  const { t } = useTranslation()
  return (
    <footer
      className="py-10 text-center bg-[#040810]"
      style={{ borderTop: '1px solid #d4a85322' }}
    >
      <div className="font-serif text-gold text-xl tracking-widest gold-glow mb-2">
        炁體源流
      </div>
      <div className="text-[#44556677] text-xs tracking-widest font-sans">
        {t('footer.sub')}
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BiographyScroll />
        <PracticeSection
          sectionKey="jingang"
          bgClass="bg-bg-section"
          bgImage="/images/фон 3.png"
          bgImageOpacity={0.65}
        />
        <PracticeSection sectionKey="changshou" bgClass="bg-bg-darker" />
      </main>
      <Footer />
    </>
  )
}

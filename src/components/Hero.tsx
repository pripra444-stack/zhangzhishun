// src/components/Hero.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative w-full overflow-hidden bg-[#03070f]" style={{ minHeight: '100svh' }}>

      {/* BG: mountains — bottom 60%, full width */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '65%' }}
      >
        <img
          src="/images/bg-mountains.png"
          alt=""
          className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.75)' }}
        />
        {/* Gradient fade top → transparent */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #03070f 0%, transparent 35%, transparent 100%)' }}
        />
      </div>

      {/* Gradient: bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #03070f 0%, transparent 100%)' }}
      />

      {/* Master PNG — centered, tall */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[2]"
        style={{ width: 'min(320px, 72vw)', height: 'min(500px, 72vh)' }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        <img
          src="/images/master.png"
          alt="张至顺"
          className="w-full h-full object-contain object-bottom"
          style={{ filter: 'drop-shadow(0 0 60px #d4a85333) drop-shadow(0 -10px 40px #00000088)' }}
        />
      </motion.div>

      {/* TOP TEXT — above master */}
      <motion.div
        className="relative z-[4] flex flex-col items-center text-center pt-16 pb-4 px-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9 }}
      >
        {/* Small top label */}
        <p
          className="text-[#8899aa] tracking-[0.4em] uppercase mb-3"
          style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.7rem)', fontFamily: 'sans-serif' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* Big Chinese title — KNYuanmo font */}
        <h1
          className="text-gold leading-none"
          style={{
            fontFamily: '"KNYuanmo", "MFLiHei", serif',
            fontSize: 'clamp(3rem, 14vw, 6rem)',
            letterSpacing: '0.08em',
            textShadow: '0 0 60px #d4a85566, 0 0 120px #d4a85322',
          }}
        >
          {t('hero.hieroglyph')}
        </h1>
      </motion.div>

      {/* Master name — bottom of hero, over master image */}
      <motion.div
        className="absolute z-[5] bottom-6 left-0 right-0 flex flex-col items-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div
          className="text-gold tracking-[0.25em]"
          style={{
            fontFamily: '"MFLiHei", serif',
            fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
            textShadow: '0 0 20px #d4a85588',
          }}
        >
          {t('hero.masterZh')}
        </div>
        <div
          className="text-[#8899aacc] tracking-[0.2em] mt-1"
          style={{ fontSize: 'clamp(0.55rem, 2vw, 0.72rem)', fontFamily: 'sans-serif' }}
        >
          {t('hero.masterRu')}
        </div>

        {/* Scroll hint */}
        <motion.div
          className="mt-4 text-[#4488cc55] tracking-[0.18em] font-sans"
          style={{ fontSize: '0.6rem' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t('hero.scrollHint')}
        </motion.div>
      </motion.div>

    </section>
  )
}

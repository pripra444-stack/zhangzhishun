// src/components/Hero.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 600, background: '#050912' }}
    >
      {/* ── LAYER 0: mountains — full bleed background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg-mountains.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.82)' }}
        />
        {/* dark top vignette so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #050912cc 0%, #05091266 18%, transparent 45%, transparent 75%, #050912aa 100%)',
          }}
        />
      </div>

      {/* ── LAYER 1: master PNG — large, centered ── */}
      <motion.div
        className="absolute z-[2] bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: 'min(680px, 92vw)', height: '88%' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.1 }}
      >
        <img
          src="/images/master.png"
          alt="张至顺"
          className="w-full h-full object-contain object-bottom"
          style={{
            filter: 'drop-shadow(0 0 80px #d4a85322) drop-shadow(0 20px 60px #000000aa)',
          }}
        />
      </motion.div>

      {/* ── LAYER 3: top text (above master) ── */}
      <motion.div
        className="absolute z-[4] top-0 left-0 right-0 flex flex-col items-center pt-8 md:pt-10 px-4 text-center"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.85 }}
      >
        {/* ДАОССКИЕ ПРАКТИКИ */}
        <p
          className="font-sans font-bold text-white tracking-[0.45em] uppercase"
          style={{ fontSize: 'clamp(0.85rem, 2.8vw, 1.4rem)' }}
        >
          {t('hero.title')}
        </p>

        {/* ЗДОРОВЬЕ И ДОЛГОЛЕТИЕ */}
        <p
          className="font-sans text-[#aabbcc] tracking-[0.25em] uppercase mt-1"
          style={{ fontSize: 'clamp(0.55rem, 1.6vw, 0.8rem)' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* 炁體源流 — Chinese title, positioned in mid-hero */}
        <motion.div
          className="mt-[clamp(20px,5vh,56px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          {/* Try SVG first (user will provide), fallback to text */}
          <h1
            className="text-gold leading-none"
            style={{
              fontFamily: '"KNYuanmo", "MFLiHei", "STKaiti", "KaiTi", serif',
              fontSize: 'clamp(3.2rem, 12vw, 7rem)',
              letterSpacing: '0.12em',
              textShadow: '0 0 60px #d4a85577, 0 0 120px #d4a85333',
            }}
          >
            炁體源流
          </h1>
        </motion.div>
      </motion.div>

      {/* ── LAYER 4: master name at bottom ── */}
      <motion.div
        className="absolute z-[5] bottom-5 left-0 right-0 flex flex-col items-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div
          className="text-gold tracking-[0.22em]"
          style={{
            fontFamily: '"MFLiHei", "STKaiti", serif',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
            textShadow: '0 0 24px #d4a85599',
          }}
        >
          {t('hero.masterZh')}
        </div>
        <div
          className="font-sans text-[#9aacbbcc] tracking-[0.3em] uppercase mt-1"
          style={{ fontSize: 'clamp(0.55rem, 1.6vw, 0.72rem)' }}
        >
          {t('hero.masterRu')}
        </div>

        {/* scroll hint */}
        <motion.div
          className="mt-3 font-sans text-[#4488cc55] tracking-[0.2em]"
          style={{ fontSize: '0.58rem' }}
          animate={{ opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t('hero.scrollHint')}
        </motion.div>
      </motion.div>
    </section>
  )
}

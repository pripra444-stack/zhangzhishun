// src/components/Hero.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 580, background: '#040810' }}
    >
      {/* ─────────────────────────────────────────
          Z:0  Фон — горы на весь экран
      ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg-mountains.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.78)' }}
        />
        {/* тёмная вуаль сверху под текст */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #04081099 0%, #04081055 22%, transparent 45%, transparent 80%, #04081099 100%)',
          }}
        />
      </div>

      {/* ─────────────────────────────────────────
          Z:1  Мастер — крупно, строго по центру
      ───────────────────────────────────────── */}
      <motion.img
        src="/images/master.png"
        alt="张至顺"
        className="absolute z-[1] bottom-0"
        style={{
          height: 'min(88vh, 820px)',
          width: 'auto',
          left: '50%',
          transform: 'translateX(-50%)',
          objectFit: 'contain',
          objectPosition: 'bottom center',
          filter: 'drop-shadow(0 0 80px #d4a85322)',
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 1.1, ease: 'easeOut' }}
      />

      {/* ─────────────────────────────────────────
          Z:2  SVG заголовок — поверх мастера,
               примерно на уровне груди/книги
      ───────────────────────────────────────── */}
      <motion.div
        className="absolute z-[2] left-0 right-0 flex justify-center"
        style={{ top: '26%' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.95 }}
      >
        <img
          src="/images/title.svg"
          alt="炁體源流"
          style={{
            width: 'min(78vw, 640px)',
            height: 'auto',
            filter: 'drop-shadow(0 0 40px #d4a85566)',
          }}
        />
      </motion.div>

      {/* ─────────────────────────────────────────
          Z:3  Текст сверху — ДАОССКИЕ ПРАКТИКИ
      ───────────────────────────────────────── */}
      <motion.div
        className="absolute z-[3] top-0 left-0 right-0 flex flex-col items-center text-center"
        style={{ paddingTop: 'clamp(28px, 5vh, 56px)' }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.8 }}
      >
        <p
          className="font-sans font-bold text-white tracking-[0.5em] uppercase"
          style={{ fontSize: 'clamp(0.85rem, 2.4vw, 1.35rem)', letterSpacing: '0.5em' }}
        >
          {t('hero.title')}
        </p>
        <p
          className="font-sans text-[#c8b98a] tracking-[0.28em] uppercase mt-2"
          style={{ fontSize: 'clamp(0.55rem, 1.4vw, 0.75rem)' }}
        >
          {t('hero.subtitle')}
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────
          Z:3  Текст снизу — имя мастера
      ───────────────────────────────────────── */}
      <motion.div
        className="absolute z-[3] bottom-0 left-0 right-0 flex flex-col items-center text-center"
        style={{ paddingBottom: 'clamp(18px, 4vh, 40px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div
          className="text-gold tracking-[0.22em]"
          style={{
            fontFamily: '"MFLiHei", "STKaiti", "KaiTi", serif',
            fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
            textShadow: '0 0 20px #d4a85588',
          }}
        >
          {t('hero.masterZh')}
        </div>
        <div
          className="font-sans text-[#99abbccc] tracking-[0.32em] uppercase mt-1"
          style={{ fontSize: 'clamp(0.52rem, 1.5vw, 0.7rem)' }}
        >
          {t('hero.masterRu')}
        </div>
        <motion.div
          className="font-sans text-[#4488cc44] tracking-[0.2em] mt-3"
          style={{ fontSize: '0.55rem' }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t('hero.scrollHint')}
        </motion.div>
      </motion.div>
    </section>
  )
}

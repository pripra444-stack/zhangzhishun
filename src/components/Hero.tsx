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
      {/* Z:0 — горы, весь экран */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg-mountains.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.78)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #04081099 0%, #04081044 18%, transparent 42%, transparent 80%, #040810bb 100%)',
          }}
        />
      </div>

      {/* Z:1 — мастер, занимает весь экран, object-contain центрирует фигуру */}
      <motion.img
        src="/images/master.png"
        alt="张至顺"
        className="absolute z-[1] inset-0 w-full h-full"
        style={{
          objectFit: 'contain',
          objectPosition: 'center bottom',
          filter: 'drop-shadow(0 0 60px #d4a85322)',
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 1.1, ease: 'easeOut' }}
      />

      {/* Z:2 — SVG "炁體源流" поверх тела мастера */}
      <motion.div
        className="absolute z-[2] left-0 right-0 flex justify-center"
        style={{ top: '30%' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.9 }}
      >
        <img
          src="/images/title.svg"
          alt="炁體源流"
          style={{
            width: 'min(70vw, 700px)',
            height: 'auto',
            filter: 'drop-shadow(0 0 40px #d4a85566)',
          }}
        />
      </motion.div>

      {/* Z:3 — текст сверху */}
      <motion.div
        className="absolute z-[3] top-0 left-0 right-0 flex flex-col items-center text-center"
        style={{ paddingTop: 'clamp(24px, 4.5vh, 52px)' }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.8 }}
      >
        <p
          className="font-sans font-bold text-white uppercase"
          style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)', letterSpacing: '0.5em' }}
        >
          {t('hero.title')}
        </p>
        <p
          className="font-sans text-[#c8b98a] uppercase mt-2"
          style={{ fontSize: 'clamp(0.55rem, 1.4vw, 0.75rem)', letterSpacing: '0.28em' }}
        >
          {t('hero.subtitle')}
        </p>
      </motion.div>

      {/* Z:3 — имя мастера снизу */}
      <motion.div
        className="absolute z-[3] bottom-0 left-0 right-0 flex flex-col items-center text-center"
        style={{ paddingBottom: 'clamp(16px, 3.5vh, 36px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div
          className="text-gold tracking-[0.22em]"
          style={{
            fontFamily: '"MFLiHei", "STKaiti", "KaiTi", serif',
            fontSize: 'clamp(1.2rem, 3.2vw, 1.9rem)',
            textShadow: '0 0 24px #d4a85599',
          }}
        >
          {t('hero.masterZh')}
        </div>
        <div
          className="font-sans text-[#99abbccc] uppercase mt-1"
          style={{ fontSize: 'clamp(0.52rem, 1.3vw, 0.68rem)', letterSpacing: '0.32em' }}
        >
          {t('hero.masterRu')}
        </div>
        <motion.div
          className="font-sans text-[#4488cc44] mt-3"
          style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t('hero.scrollHint')}
        </motion.div>
      </motion.div>
    </section>
  )
}

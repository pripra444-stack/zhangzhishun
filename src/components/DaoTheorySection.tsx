// src/components/DaoTheorySection.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { img } from '../utils/assets'

export default function DaoTheorySection() {
  const { t } = useTranslation()

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '60vh', background: '#040810' }}
    >
      {/* Фоновое изображение */}
      <img
        src={img('/images/dao-theory-bg.png')}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.72, objectPosition: 'center center' }}
      />

      {/* Затемнение сверху и снизу */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #040810ff 0%, #04081088 12%, transparent 28%, transparent 72%, #04081088 88%, #040810ff 100%)',
        }}
      />

      {/* Контент поверх */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ padding: 'clamp(60px, 10vh, 120px) 7.69vw' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Китайский заголовок */}
        <div
          style={{
            fontFamily: '"KNYuanmo", "MFLiHei", serif',
            fontSize: 'clamp(2.8rem, 9vw, 5rem)',
            letterSpacing: '0.18em',
            color: '#d4a855',
            textShadow: '0 0 40px rgba(212,168,83,0.75), 0 0 80px rgba(212,168,83,0.35)',
            lineHeight: 1.1,
          }}
        >
          {t('sections.daoTheory.zh')}
        </div>

        {/* Разделитель */}
        <div
          className="my-5"
          style={{
            width: 'clamp(80px, 12vw, 160px)',
            height: 1,
            background: 'linear-gradient(90deg, transparent, #d4a85366, transparent)',
          }}
        />

        {/* Русский подзаголовок */}
        <div
          className="font-sans uppercase tracking-[0.35em]"
          style={{
            fontSize: 'clamp(0.6rem, 1.4vw, 0.78rem)',
            color: 'rgba(200,185,140,0.6)',
          }}
        >
          {t('sections.daoTheory.sub')}
        </div>
      </motion.div>
    </section>
  )
}

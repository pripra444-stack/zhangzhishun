// src/components/DaoTheorySection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { img } from '../utils/assets'
import DaoTreatiseModal from './DaoTreatiseModal'

export default function DaoTheorySection() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
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
            className="font-sans uppercase tracking-[0.35em] mb-10"
            style={{
              fontSize: 'clamp(0.6rem, 1.4vw, 0.78rem)',
              color: 'rgba(200,185,140,0.6)',
            }}
          >
            {t('sections.daoTheory.sub')}
          </div>

          {/* ── Кнопка открытия трактата ── */}
          <motion.button
            onClick={() => setIsOpen(true)}
            style={{
              background: 'none',
              border: '1px solid rgba(212,168,83,0.45)',
              borderRadius: 4,
              padding: '14px 36px',
              cursor: 'pointer',
              fontFamily: '"STKaiti","KaiTi",serif',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
              color: 'rgba(212,168,83,0.85)',
              letterSpacing: '0.22em',
              transition: 'all 0.25s',
            }}
            animate={{ boxShadow: ['0 0 0px rgba(212,168,83,0)', '0 0 18px rgba(212,168,83,0.35)', '0 0 0px rgba(212,168,83,0)'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(212,168,83,0.1)'
              e.currentTarget.style.color = '#d4a855'
              e.currentTarget.style.borderColor = 'rgba(212,168,83,0.8)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.color = 'rgba(212,168,83,0.85)'
              e.currentTarget.style.borderColor = 'rgba(212,168,83,0.45)'
            }}
          >
            {t('dao.openBtn')}
          </motion.button>
        </motion.div>
      </section>

      {/* Полноэкранный читальный режим */}
      <DaoTreatiseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

// src/components/DaoTheorySection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { img } from '../utils/assets'

export default function DaoTheorySection() {
  const { t } = useTranslation()
  const [isFlipped, setIsFlipped] = useState(false)

  const CARD_W = 'clamp(220px, 26vw, 310px)'
  const CARD_H = 'clamp(290px, 34vw, 415px)'

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

      {/* Затемнение сверху/снизу */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom,#040810ff 0%,#04081088 12%,transparent 28%,transparent 72%,#04081088 88%,#040810ff 100%)',
        }}
      />

      {/* Флип-карточка */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <div
          style={{ perspective: '1000px', cursor: 'default' }}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{
              transformStyle: 'preserve-3d',
              position: 'relative',
              width: CARD_W,
              minHeight: CARD_H,
              borderRadius: 18,
              background: 'transparent',
            }}
          >
            {/* ── Лицо: золотой 道学 + ТЕОРИЯ ДАО ── */}
            <div style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: 'transparent',
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              padding: '32px 28px',
            }}>
              <div style={{
                fontFamily: '"KNYuanmo","MFLiHei",serif',
                fontSize: 'clamp(2.6rem,7vw,4.2rem)',
                letterSpacing: '0.18em',
                color: '#d4a855',
                textShadow: '0 0 40px rgba(212,168,83,0.75), 0 0 80px rgba(212,168,83,0.35)',
                lineHeight: 1.1,
              }}>
                {t('sections.daoTheory.zh')}
              </div>
              <div style={{
                width: 'clamp(60px,10vw,120px)', height: 1,
                background: 'linear-gradient(90deg,transparent,#d4a85366,transparent)',
                margin: '18px 0',
              }} />
              <div className="font-sans uppercase" style={{
                fontSize: 'clamp(0.55rem,1.2vw,0.72rem)',
                color: 'rgba(200,185,140,0.55)',
                letterSpacing: '0.35em',
              }}>
                {t('sections.daoTheory.sub')}
              </div>
            </div>

            {/* ── Изнанка: голубой 道学 + ЧИТАТЬ ── */}
            <div style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'transparent',
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              padding: '32px 28px',
            }}>
              <div style={{
                fontFamily: '"KNYuanmo","MFLiHei",serif',
                fontSize: 'clamp(2.6rem,7vw,4.2rem)',
                letterSpacing: '0.18em',
                color: '#00d4ff',
                textShadow: '0 0 30px rgba(0,212,255,0.9), 0 0 60px rgba(0,212,255,0.5), 0 0 100px rgba(0,212,255,0.25)',
                lineHeight: 1.1,
              }}>
                {t('sections.daoTheory.zh')}
              </div>
              <div style={{
                width: 'clamp(60px,10vw,120px)', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(0,212,255,0.45),transparent)',
                margin: '18px 0',
              }} />
              <div className="font-sans uppercase" style={{
                fontSize: 'clamp(0.55rem,1.2vw,0.72rem)',
                color: 'rgba(0,212,255,0.65)',
                letterSpacing: '0.35em',
              }}>
                {t('sections.daoTheory.read')}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

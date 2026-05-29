// src/components/DaoTheorySection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { img } from '../utils/assets'
import DaoTreatiseModal from './DaoTreatiseModal'

export default function DaoTheorySection() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen]       = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

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
            style={{ perspective: '1000px', cursor: 'pointer' }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => { if (isFlipped) setIsOpen(true) }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformStyle: 'preserve-3d',
                position: 'relative',
                width: 'clamp(220px, 26vw, 310px)',
                minHeight: 'clamp(290px, 34vw, 415px)',
                borderRadius: 18,
                background: 'transparent',
              }}
            >
              {/* ── Лицо: 道学 + подпись — без рамки, невидимая карточка ── */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  background: 'transparent',
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center',
                  padding: '32px 28px',
                }}
              >
                <div
                  style={{
                    fontFamily: '"KNYuanmo","MFLiHei",serif',
                    fontSize: 'clamp(2.6rem,7vw,4.2rem)',
                    letterSpacing: '0.18em',
                    color: '#d4a855',
                    textShadow: '0 0 40px rgba(212,168,83,0.75), 0 0 80px rgba(212,168,83,0.35)',
                    lineHeight: 1.1,
                  }}
                >
                  {t('sections.daoTheory.zh')}
                </div>
                <div
                  style={{
                    width: 'clamp(60px,10vw,120px)', height: 1,
                    background: 'linear-gradient(90deg,transparent,#d4a85366,transparent)',
                    margin: '18px 0',
                  }}
                />
                <div
                  className="font-sans uppercase"
                  style={{
                    fontSize: 'clamp(0.55rem,1.2vw,0.72rem)',
                    color: 'rgba(200,185,140,0.55)',
                    letterSpacing: '0.35em',
                  }}
                >
                  {t('sections.daoTheory.sub')}
                </div>
              </div>

              {/* ── Изнанка: фото мастера + «Читать дальше» ── */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  position: 'absolute', inset: 0,
                  borderRadius: 18,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={img('/images/master-reading.png')}
                  alt="Мастер Чжан Чжи Шунь"
                  draggable={false}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top center',
                    display: 'block',
                  }}
                />
                {/* Градиент снизу + надпись */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top,rgba(4,8,16,0.92) 0%,rgba(4,8,16,0.3) 40%,transparent 70%)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'flex-end',
                    padding: '0 20px 24px',
                  }}
                >
                  <div style={{
                    fontFamily: 'sans-serif',
                    fontSize: 'clamp(0.58rem,1.1vw,0.68rem)',
                    color: 'rgba(212,168,83,0.75)',
                    letterSpacing: '0.38em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}>
                    Читать дальше
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <DaoTreatiseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

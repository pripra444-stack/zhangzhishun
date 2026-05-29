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

        {/* Затемнение сверху и снизу */}
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
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Perspective-обёртка: hover переворачивает, click открывает */}
          <div
            style={{ perspective: '1000px', cursor: 'pointer' }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => { if (isFlipped) setIsOpen(true) }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformStyle: 'preserve-3d',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 'clamp(32px,5vw,56px) clamp(40px,7vw,80px)',
                minWidth: 'clamp(260px,42vw,500px)',
              }}
            >
              {/* ── Лицевая сторона: 道学 + подпись ── */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: '"KNYuanmo","MFLiHei",serif',
                    fontSize: 'clamp(2.8rem,9vw,5rem)',
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
                    width: 'clamp(80px,12vw,160px)',
                    height: 1,
                    background: 'linear-gradient(90deg,transparent,#d4a85366,transparent)',
                    margin: '20px 0',
                  }}
                />

                <div
                  className="font-sans uppercase"
                  style={{
                    fontSize: 'clamp(0.6rem,1.4vw,0.78rem)',
                    color: 'rgba(200,185,140,0.6)',
                    letterSpacing: '0.35em',
                  }}
                >
                  {t('sections.daoTheory.sub')}
                </div>
              </div>

              {/* ── Обратная сторона: «Открыть» ── */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                {/* Крупный иероглиф-пиктограмма */}
                <div style={{
                  fontFamily: '"STKaiti","KaiTi",serif',
                  fontSize: 'clamp(2rem,5vw,3.5rem)',
                  color: '#d4a855',
                  letterSpacing: '0.15em',
                  textShadow: '0 0 36px rgba(212,168,83,0.85), 0 0 70px rgba(212,168,83,0.35)',
                  lineHeight: 1,
                }}>
                  開卷
                </div>

                {/* Русская подпись */}
                <div style={{
                  fontFamily: 'sans-serif',
                  fontSize: 'clamp(0.55rem,1.1vw,0.68rem)',
                  color: 'rgba(212,168,83,0.55)',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                }}>
                  открыть
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Полноэкранный читальный режим */}
      <DaoTreatiseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

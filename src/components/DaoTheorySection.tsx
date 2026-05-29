// src/components/DaoTheorySection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { img } from '../utils/assets'
import DaoTreatiseModal from './DaoTreatiseModal'

export default function DaoTheorySection() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen]       = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const goldColor = '#d4a855'
  const cyanColor = '#00d4ff'

  const textColor      = isHovered ? cyanColor : goldColor
  const textShadow     = isHovered
    ? '0 0 30px rgba(0,212,255,0.9), 0 0 60px rgba(0,212,255,0.5), 0 0 100px rgba(0,212,255,0.25)'
    : '0 0 40px rgba(212,168,83,0.75), 0 0 80px rgba(212,168,83,0.35)'
  const dividerBg      = isHovered
    ? 'linear-gradient(90deg,transparent,rgba(0,212,255,0.5),transparent)'
    : 'linear-gradient(90deg,transparent,#d4a85366,transparent)'
  const subColor       = isHovered ? 'rgba(0,212,255,0.55)' : 'rgba(200,185,140,0.55)'

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

        {/* Карточка — hover меняет цвет на голубой */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <div
            style={{
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              padding: '32px 28px',
              width: 'clamp(220px, 26vw, 310px)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsOpen(true)}
          >
            <div
              style={{
                fontFamily: '"KNYuanmo","MFLiHei",serif',
                fontSize: 'clamp(2.6rem,7vw,4.2rem)',
                letterSpacing: '0.18em',
                color: textColor,
                textShadow,
                lineHeight: 1.1,
                transition: 'color 0.35s ease, text-shadow 0.35s ease',
              }}
            >
              {t('sections.daoTheory.zh')}
            </div>
            <div
              style={{
                width: 'clamp(60px,10vw,120px)', height: 1,
                background: dividerBg,
                margin: '18px 0',
                transition: 'background 0.35s ease',
              }}
            />
            <div
              className="font-sans uppercase"
              style={{
                fontSize: 'clamp(0.55rem,1.2vw,0.72rem)',
                color: subColor,
                letterSpacing: '0.35em',
                transition: 'color 0.35s ease',
              }}
            >
              {t('sections.daoTheory.sub')}
            </div>
          </div>
        </motion.div>
      </section>

      <DaoTreatiseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

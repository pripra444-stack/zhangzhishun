// src/components/DaoTreatiseModal.tsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MERIDIAN_DIAGRAMS } from '../data/daoChapters'
import { img } from '../utils/assets'

interface Props {
  isOpen: boolean
  onClose: () => void
}

// Один круг меридиана — золотая рамка + фото или пустое кольцо
function MeridianCircle({ zhName, ruName, image }: { zhName: string; ruName: string; image: string }) {
  return (
    <div className="flex flex-col items-center select-none" style={{ width: '100%' }}>
      {/* Рамка + фото */}
      <div className="relative w-full" style={{ aspectRatio: '1' }}>
        {/* Круглая рамка */}
        <img
          src={img('/images/circle-frame-gold.png')}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            zIndex: 2,
            filter: [
              'drop-shadow(0 6px 18px rgba(0,4,18,0.98))',
              'drop-shadow(0 14px 40px rgba(0,8,30,0.85))',
            ].join(' '),
          }}
        />
        {/* Фото или пустое тёмное кольцо */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '72%', height: '72%',
            top: '14%', left: '14%',
            zIndex: 1,
            background: image ? 'transparent' : 'rgba(4,8,16,0.7)',
            border: image ? 'none' : '1px dashed rgba(212,168,83,0.12)',
          }}
        >
          {image && (
            <img
              src={img(`/images/${image}`)}
              alt={ruName}
              draggable={false}
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>
      </div>

      {/* Китайское название */}
      <div style={{
        marginTop: 6,
        fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
        fontSize: 'clamp(1.1rem,2vw,1.8rem)',
        color: image ? '#d4a855' : 'rgba(212,168,83,0.25)',
        letterSpacing: '0.12em',
        textShadow: image ? '0 0 18px rgba(212,168,83,0.4)' : 'none',
        lineHeight: 1,
        textAlign: 'center',
      }}>
        {zhName}
      </div>

      {/* Русское название */}
      <div style={{
        marginTop: 4,
        fontFamily: 'sans-serif',
        fontSize: 'clamp(0.5rem,0.95vw,0.7rem)',
        color: image ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.18)',
        textAlign: 'center',
        lineHeight: 1.35,
        letterSpacing: '0.02em',
        maxWidth: '110%',
      }}>
        {ruName}
      </div>
    </div>
  )
}

export default function DaoTreatiseModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex flex-col"
          style={{ zIndex: 400, background: '#040810' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
        >
          {/* ── Шапка ── */}
          <div
            className="flex items-center justify-between flex-shrink-0"
            style={{
              padding: '14px 28px',
              borderBottom: '1px solid rgba(212,168,83,0.12)',
              background: 'rgba(4,8,16,0.95)',
            }}
          >
            <div className="flex items-center gap-4">
              <span style={{
                fontFamily: '"KNYuanmo","MFLiHei",serif',
                fontSize: 'clamp(1.1rem,2.5vw,1.5rem)',
                color: '#d4a855',
                letterSpacing: '0.18em',
                textShadow: '0 0 20px rgba(212,168,83,0.5)',
              }}>
                道学
              </span>
              <div style={{ width: 1, height: 18, background: 'rgba(212,168,83,0.2)' }} />
              <span style={{
                fontSize: '0.65rem',
                color: 'rgba(212,168,83,0.4)',
                letterSpacing: '0.28em',
                fontFamily: 'sans-serif',
              }}>
                ТЕОРИЯ ДАО
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.75rem', color: 'rgba(212,168,83,0.6)',
                letterSpacing: '0.18em', fontFamily: 'sans-serif',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.6)')}
            >
              {t('dao.closeBtn')}
            </button>
          </div>

          {/* ── Тело: прокручиваемый центр с драконом/тигром за сеткой ── */}
          <div className="flex-1 overflow-y-auto relative" style={{ padding: 'clamp(32px,4vw,56px) 7.69vw' }}>

            {/* Дракон — левый фланг, позади сетки */}
            <img
              src={img('/images/dao-dragon.png')}
              alt="" aria-hidden draggable={false}
              className="absolute pointer-events-none select-none"
              style={{
                top: 0, left: 0,
                height: '100%', width: 'auto',
                maxWidth: '28vw',
                objectFit: 'contain',
                objectPosition: 'top left',
                opacity: 0.65,
                zIndex: 1,
              }}
            />

            {/* Тигр — правый фланг, позади сетки */}
            <img
              src={img('/images/dao-tiger.png')}
              alt="" aria-hidden draggable={false}
              className="absolute pointer-events-none select-none"
              style={{
                top: 0, right: 0,
                height: '100%', width: 'auto',
                maxWidth: '28vw',
                objectFit: 'contain',
                objectPosition: 'top right',
                opacity: 0.55,
                zIndex: 1,
              }}
            />

            {/* Контент поверх */}
            <div className="relative flex flex-col items-center gap-10" style={{ zIndex: 10 }}>

              {/* Заголовок */}
              <div className="text-center">
                <div style={{
                  fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                  fontSize: 'clamp(2rem,4.5vw,3.5rem)',
                  color: '#d4a855',
                  letterSpacing: '0.18em',
                  textShadow: '0 0 40px rgba(212,168,83,0.6), 0 0 80px rgba(212,168,83,0.25)',
                  lineHeight: 1,
                  marginBottom: 14,
                }}>
                  八个大动脉
                </div>
                <div style={{
                  width: 'clamp(50px,8vw,120px)', height: 1,
                  background: 'linear-gradient(90deg,transparent,#d4a85566,transparent)',
                  margin: '14px auto',
                }} />
                <div style={{
                  fontFamily: 'sans-serif',
                  fontSize: 'clamp(0.55rem,1.1vw,0.68rem)',
                  color: 'rgba(212,168,83,0.4)',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                }}>
                  {t('dao.meridianSection')}
                </div>
              </div>

              {/* 8 кругов — 4 колонки × 2 ряда */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(16px,3vw,40px)',
                width: '100%',
                maxWidth: '72vw',
              }}>
                {MERIDIAN_DIAGRAMS.map(m => (
                  <MeridianCircle
                    key={m.id}
                    zhName={m.zhName}
                    ruName={m.ruName}
                    image={m.image}
                  />
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

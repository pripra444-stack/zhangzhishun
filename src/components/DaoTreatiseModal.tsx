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

export default function DaoTreatiseModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation()

  // Close on Escape, lock body scroll
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

  const withImage    = MERIDIAN_DIAGRAMS.filter(m => m.image !== '')
  const withoutImage = MERIDIAN_DIAGRAMS.filter(m => m.image === '')

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

          {/* ── Прокручиваемый контент ── */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,8vw,120px)' }}
          >
            {/* Заголовок раздела */}
            <div className="text-center" style={{ marginBottom: 'clamp(40px,6vw,72px)' }}>
              <div style={{
                fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                fontSize: 'clamp(2.2rem,5vw,3.8rem)',
                color: '#d4a855',
                letterSpacing: '0.18em',
                textShadow: '0 0 40px rgba(212,168,83,0.6), 0 0 80px rgba(212,168,83,0.25)',
                lineHeight: 1,
                marginBottom: 16,
              }}>
                奇经八脉
              </div>
              <div style={{
                width: 'clamp(60px,10vw,140px)',
                height: 1,
                background: 'linear-gradient(90deg,transparent,#d4a85366,transparent)',
                margin: '16px auto',
              }} />
              <div style={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(0.58rem,1.2vw,0.72rem)',
                color: 'rgba(212,168,83,0.4)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
              }}>
                {t('dao.meridianSection')}
              </div>
            </div>

            {/* ── 4 канала с фотографиями ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%),1fr))',
              gap: 'clamp(20px,3vw,40px)',
              marginBottom: 'clamp(48px,7vw,96px)',
            }}>
              {withImage.map(m => (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                  {/* Фото */}
                  <div style={{
                    width: '100%',
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid rgba(212,168,83,0.18)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                  }}>
                    <img
                      src={img(`/images/${m.image}`)}
                      alt={m.ruName}
                      draggable={false}
                      style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                    />
                  </div>
                  {/* Иероглифы */}
                  <div style={{
                    fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                    fontSize: 'clamp(1.6rem,3vw,2.4rem)',
                    color: '#d4a855',
                    letterSpacing: '0.12em',
                    textShadow: '0 0 24px rgba(212,168,83,0.45)',
                    lineHeight: 1,
                  }}>
                    {m.zhName}
                  </div>
                  {/* Русское название */}
                  <div style={{
                    fontFamily: 'sans-serif',
                    fontSize: 'clamp(0.68rem,1.3vw,0.82rem)',
                    color: 'rgba(212,168,83,0.55)',
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}>
                    {m.ruName}
                  </div>
                </div>
              ))}
            </div>

            {/* ── 4 канала — плейсхолдеры ── */}
            {withoutImage.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%),1fr))',
                gap: 'clamp(20px,3vw,40px)',
              }}>
                {withoutImage.map(m => (
                  <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                    {/* Плейсхолдер */}
                    <div style={{
                      width: '100%',
                      aspectRatio: '3 / 4',
                      borderRadius: 8,
                      border: '1px dashed rgba(212,168,83,0.12)',
                      background: 'rgba(4,8,16,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(212,168,83,0.18)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.22em',
                      fontFamily: 'sans-serif',
                    }}>
                      {t('dao.meridianPlaceholder')}
                    </div>
                    {/* Иероглифы */}
                    <div style={{
                      fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                      fontSize: 'clamp(1.6rem,3vw,2.4rem)',
                      color: 'rgba(212,168,83,0.25)',
                      letterSpacing: '0.12em',
                      lineHeight: 1,
                    }}>
                      {m.zhName}
                    </div>
                    {/* Русское название */}
                    <div style={{
                      fontFamily: 'sans-serif',
                      fontSize: 'clamp(0.68rem,1.3vw,0.82rem)',
                      color: 'rgba(212,168,83,0.2)',
                      letterSpacing: '0.05em',
                      textAlign: 'center',
                      lineHeight: 1.4,
                    }}>
                      {m.ruName}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

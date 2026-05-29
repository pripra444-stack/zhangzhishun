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

          {/* ── Тело: три колонки — Дракон | Контент | Тигр ── */}
          <div
            className="flex-1 overflow-hidden"
            style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(130px,18vw,260px) 1fr clamp(130px,18vw,260px)',
            }}
          >
            {/* Левый декор — Дракон (липкий) */}
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img
                src={img('/images/dao-dragon.png')}
                alt=""
                aria-hidden
                draggable={false}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                  display: 'block',
                  opacity: 0.75,
                }}
              />
            </div>

            {/* Центральный контент — прокручивается */}
            <div
              className="overflow-y-auto"
              style={{ padding: 'clamp(32px,5vw,64px) clamp(16px,4vw,48px)' }}
            >
              {/* Заголовок */}
              <div className="text-center" style={{ marginBottom: 'clamp(32px,5vw,56px)' }}>
                <div style={{
                  fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                  fontSize: 'clamp(2rem,4.5vw,3.5rem)',
                  color: '#d4a855',
                  letterSpacing: '0.18em',
                  textShadow: '0 0 40px rgba(212,168,83,0.6), 0 0 80px rgba(212,168,83,0.25)',
                  lineHeight: 1,
                  marginBottom: 14,
                }}>
                  八大动脉
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

              {/* 4 канала с фото — в ряд */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(10px,2vw,24px)',
                marginBottom: 'clamp(32px,5vw,56px)',
              }}>
                {withImage.map(m => (
                  <div key={m.id} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  }}>
                    <div style={{
                      width: '100%',
                      maxHeight: 'clamp(110px,14vw,180px)',
                      overflow: 'hidden',
                      borderRadius: 4,
                    }}>
                      <img
                        src={img(`/images/${m.image}`)}
                        alt={m.ruName}
                        draggable={false}
                        style={{
                          width: '100%', height: '100%',
                          objectFit: 'cover', objectPosition: 'top center',
                          display: 'block',
                        }}
                      />
                    </div>
                    <div style={{
                      fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                      fontSize: 'clamp(1.1rem,2vw,1.8rem)',
                      color: '#d4a855',
                      letterSpacing: '0.12em',
                      textShadow: '0 0 18px rgba(212,168,83,0.4)',
                      lineHeight: 1,
                      textAlign: 'center',
                    }}>
                      {m.zhName}
                    </div>
                    <div style={{
                      fontFamily: 'sans-serif',
                      fontSize: 'clamp(0.55rem,1vw,0.72rem)',
                      color: 'rgba(212,168,83,0.5)',
                      textAlign: 'center',
                      lineHeight: 1.35,
                      letterSpacing: '0.03em',
                    }}>
                      {m.ruName}
                    </div>
                  </div>
                ))}
              </div>

              {/* 4 плейсхолдера */}
              {withoutImage.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 'clamp(10px,2vw,24px)',
                }}>
                  {withoutImage.map(m => (
                    <div key={m.id} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    }}>
                      <div style={{
                        width: '100%', maxHeight: 'clamp(110px,14vw,180px)',
                        aspectRatio: '3 / 4', borderRadius: 4,
                        border: '1px dashed rgba(212,168,83,0.1)',
                        background: 'rgba(4,8,16,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(212,168,83,0.15)',
                        fontSize: '0.55rem', letterSpacing: '0.2em', fontFamily: 'sans-serif',
                      }}>
                        {t('dao.meridianPlaceholder')}
                      </div>
                      <div style={{
                        fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                        fontSize: 'clamp(1.1rem,2vw,1.8rem)',
                        color: 'rgba(212,168,83,0.22)',
                        letterSpacing: '0.12em', lineHeight: 1, textAlign: 'center',
                      }}>
                        {m.zhName}
                      </div>
                      <div style={{
                        fontFamily: 'sans-serif',
                        fontSize: 'clamp(0.55rem,1vw,0.72rem)',
                        color: 'rgba(212,168,83,0.18)',
                        textAlign: 'center', lineHeight: 1.35, letterSpacing: '0.03em',
                      }}>
                        {m.ruName}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Правый декор — Тигр */}
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img
                src={img('/images/dao-tiger.png')}
                alt=""
                aria-hidden
                draggable={false}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                  display: 'block',
                  opacity: 0.6,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

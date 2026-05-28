// src/components/DaoTreatiseModal.tsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { DAO_CHAPTERS, MERIDIAN_DIAGRAMS } from '../data/daoChapters'

interface Props {
  isOpen: boolean
  onClose: () => void
}

// Renders one paragraph block; splits body text by \n
function ChapterBody({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-5">
      {text.split('\n').filter(Boolean).map((para, i) => (
        <p
          key={i}
          style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            lineHeight: 1.85,
            color: 'rgba(220,205,170,0.85)',
            fontFamily: 'sans-serif',
            letterSpacing: '0.02em',
          }}
        >
          {para}
        </p>
      ))}
    </div>
  )
}

// Placeholder box shown where a meridian image will eventually go
function MeridianPlaceholder({ zhName, ruName, index }: { zhName: string; ruName: string; index: number }) {
  const { t } = useTranslation()
  return (
    <div
      style={{
        border: '1px solid rgba(0,216,255,0.25)',
        borderRadius: 6,
        padding: '24px 20px',
        background: 'rgba(0,20,40,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
      }}
    >
      {/* Number */}
      <div style={{ fontSize: '0.6rem', color: 'rgba(0,216,255,0.35)', letterSpacing: '0.3em', fontFamily: 'sans-serif' }}>
        {index + 1} / 8
      </div>
      {/* Chinese name */}
      <div style={{
        fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
        color: '#00D8FF',
        letterSpacing: '0.15em',
        textShadow: '0 0 20px rgba(0,216,255,0.4)',
      }}>
        {zhName}
      </div>
      {/* Russian name */}
      <div style={{ fontSize: '0.72rem', color: 'rgba(0,216,255,0.55)', fontFamily: 'sans-serif', textAlign: 'center' }}>
        {ruName}
      </div>
      {/* Placeholder area */}
      <div style={{
        width: '100%',
        height: 180,
        border: '1px dashed rgba(0,216,255,0.15)',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        color: 'rgba(0,216,255,0.25)',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        fontFamily: 'sans-serif',
      }}>
        {t('dao.meridianPlaceholder')}
      </div>
    </div>
  )
}

export default function DaoTreatiseModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState(1)
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Close on Escape
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

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    if (!isOpen) return
    const observers: IntersectionObserver[] = []
    chapterRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(DAO_CHAPTERS[i].id) },
        { root: scrollRef.current, threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [isOpen])

  const scrollToChapter = (index: number) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
              <span style={{ fontSize: '0.65rem', color: 'rgba(212,168,83,0.4)', letterSpacing: '0.28em', fontFamily: 'sans-serif' }}>
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

          {/* ── Тело: сайдбар + контент ── */}
          <div className="flex flex-1 overflow-hidden">

            {/* Левый сайдбар */}
            <div
              className="flex-shrink-0 flex flex-col gap-1 overflow-y-auto"
              style={{
                width: 'clamp(140px, 18vw, 220px)',
                padding: '28px 16px',
                borderRight: '1px solid rgba(212,168,83,0.08)',
                background: 'rgba(4,8,16,0.6)',
              }}
            >
              {DAO_CHAPTERS.map((ch, i) => {
                const isActive = ch.id === activeId
                return (
                  <button
                    key={ch.id}
                    onClick={() => scrollToChapter(i)}
                    style={{
                      background: isActive ? 'rgba(212,168,83,0.08)' : 'none',
                      border: isActive ? '1px solid rgba(212,168,83,0.25)' : '1px solid transparent',
                      borderRadius: 5,
                      padding: '10px 12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.25s',
                    }}
                  >
                    <div style={{
                      fontFamily: '"STKaiti","KaiTi",serif',
                      fontSize: 'clamp(1rem,1.8vw,1.3rem)',
                      color: isActive ? '#d4a855' : 'rgba(212,168,83,0.35)',
                      letterSpacing: '0.1em',
                      lineHeight: 1,
                      marginBottom: 4,
                      transition: 'color 0.25s',
                    }}>
                      {ch.zhTitle}
                    </div>
                    <div style={{
                      fontSize: '0.6rem',
                      color: isActive ? 'rgba(212,168,83,0.6)' : 'rgba(212,168,83,0.2)',
                      letterSpacing: '0.08em',
                      fontFamily: 'sans-serif',
                      transition: 'color 0.25s',
                    }}>
                      {t(ch.titleKey)}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Правая — прокручиваемый контент */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto"
              style={{ padding: 'clamp(28px,5vw,60px) clamp(20px,6vw,80px)' }}
            >
              {DAO_CHAPTERS.map((ch, i) => (
                <div
                  key={ch.id}
                  ref={el => { chapterRefs.current[i] = el }}
                  style={{ marginBottom: 'clamp(48px,8vw,96px)' }}
                >
                  {/* Номер главы */}
                  <div style={{ fontSize: '0.6rem', color: 'rgba(212,168,83,0.3)', letterSpacing: '0.35em', fontFamily: 'sans-serif', marginBottom: 10 }}>
                    {t('dao.chapterLabel')} {ch.id}
                  </div>

                  {/* Заголовок */}
                  <div className="flex items-baseline gap-4 mb-6">
                    <span style={{
                      fontFamily: '"STKaiti","KaiTi",serif',
                      fontSize: 'clamp(2rem,4vw,3rem)',
                      color: '#d4a855',
                      letterSpacing: '0.15em',
                      textShadow: '0 0 30px rgba(212,168,83,0.4)',
                      lineHeight: 1,
                    }}>
                      {ch.zhTitle}
                    </span>
                    <span style={{
                      fontSize: 'clamp(0.9rem,1.8vw,1.15rem)',
                      color: 'rgba(212,168,83,0.5)',
                      fontFamily: 'sans-serif',
                      letterSpacing: '0.05em',
                    }}>
                      {t(ch.titleKey)}
                    </span>
                  </div>

                  {/* Разделитель */}
                  <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(212,168,83,0.3),transparent)', marginBottom: 24 }} />

                  {/* Текст */}
                  <ChapterBody text={t(ch.bodyKey)} />

                  {/* Схемы меридианов — только в главе 3 */}
                  {ch.id === 3 && (
                    <div style={{ marginTop: 40 }}>
                      <div style={{
                        fontSize: '0.65rem',
                        color: 'rgba(0,216,255,0.5)',
                        letterSpacing: '0.3em',
                        fontFamily: 'sans-serif',
                        marginBottom: 24,
                        textTransform: 'uppercase',
                      }}>
                        {t('dao.meridianSection')}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                        {MERIDIAN_DIAGRAMS.map((m, idx) => (
                          <MeridianPlaceholder key={m.id} zhName={m.zhName} ruName={m.ruName} index={idx} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

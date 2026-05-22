// src/components/ExerciseModal.tsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise, SectionKey } from '../data/exercises'
import { getExercisesBySection } from '../data/exercises'

interface Props {
  exercise: Exercise | null
  sectionKey: SectionKey | null
  onClose: () => void
  onNavigate: (exercise: Exercise) => void
}

// Разбиваем описание на строки
function DescriptionText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="flex flex-col gap-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 5 }} />
        const isStep   = /^[①②③④⑤⑥⑦⑧]/.test(line)
        const isHeader = line.startsWith('步骤')
        const isChinese = /^[生长化收藏]/.test(line)
        return (
          <p
            key={i}
            className="font-sans"
            style={{
              fontSize: 'clamp(0.73rem, 1.05vw, 0.86rem)',
              color: isHeader ? '#d4a853' : isChinese ? '#c8a96e' : isStep ? '#c8bfb0' : '#8fa0b4',
              lineHeight: 1.72,
              letterSpacing: isHeader ? '0.1em' : '0.02em',
              fontWeight: isHeader ? 600 : 400,
              paddingLeft: isStep ? '0.8em' : 0,
            }}
          >
            {line}
          </p>
        )
      })}
    </div>
  )
}

const ZH_NUM = ['一','二','三','四','五','六','七','八']

export default function ExerciseModal({ exercise, sectionKey, onClose, onNavigate }: Props) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!exercise) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [exercise, onClose])

  const exercises = sectionKey ? getExercisesBySection(sectionKey) : []
  const currentIndex = exercise ? exercises.findIndex(e => e.id === exercise.id) : -1
  const prev = currentIndex > 0 ? exercises[currentIndex - 1] : null
  const next = currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null
  const zhNum = exercise ? (ZH_NUM[exercise.id - 1] ?? exercise.id) : ''
  const sectionZh = sectionKey ? t(`sections.${sectionKey}.zh`) : ''

  return (
    <AnimatePresence>
      {exercise && (
        <motion.div
          className="fixed inset-0 flex items-stretch justify-center"
          style={{
            zIndex: 300,
            background: '#06091B',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* ── Облако слева — правый край всегда вплотную к модалке ── */}
          <div className="flex-1 overflow-hidden flex items-center justify-end">
            <img
              src="/images/modal-bg.png"
              aria-hidden draggable={false}
              className="pointer-events-none select-none h-full w-auto object-cover object-right"
              style={{ opacity: 0.85 }}
            />
          </div>

          {/* ── Модальное окно ── */}
          <div
            className="flex items-center justify-center flex-shrink-0 py-4"
            style={{ width: 'min(820px, 90vw)' }}
            onClick={onClose}
          >
          <motion.div
            className="relative w-full overflow-hidden flex flex-col"
            style={{
              maxHeight: '94vh',
              borderRadius: 6,
              background: '#06091B',
              boxShadow: '0 50px 140px rgba(0,2,18,0.98)',
            }}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
          >


            {/* ── Весь контент выше фона ── */}
            <div className="relative flex flex-col" style={{ zIndex: 1, minHeight: 0 }}>

              {/* ── Шапка: 第N式 · секция · закрыть ── */}
              <div className="flex items-center justify-between px-7 pt-4 pb-2">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                      fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                      color: '#d4a853',
                      lineHeight: 1,
                      textShadow: '0 0 20px rgba(212,168,83,0.5)',
                    }}
                  >
                    第{zhNum}式
                  </div>
                  <div style={{ width: 1, height: 20, background: 'rgba(212,168,83,0.22)' }} />
                  <div
                    style={{
                      fontFamily: '"STKaiti","KaiTi",serif',
                      fontSize: 'clamp(0.68rem, 1.2vw, 0.85rem)',
                      color: 'rgba(212,168,83,0.48)',
                      letterSpacing: '0.2em',
                    }}
                  >
                    {sectionZh}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    fontSize: '0.65rem',
                    color: 'rgba(212,168,83,0.38)',
                    letterSpacing: '0.22em',
                    fontFamily: 'sans-serif',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.38)')}
                >
                  ✕ закрыть
                </button>
              </div>

              {/* ── Название по центру ── */}
              <div className="text-center px-7 pt-1 pb-3">
                <div
                  style={{
                    fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                    fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
                    color: '#e8d090',
                    letterSpacing: '0.18em',
                    lineHeight: 1.2,
                    textShadow: '0 0 32px rgba(212,168,83,0.35)',
                  }}
                >
                  {t(exercise.nameKey)}
                </div>
                <div
                  className="font-sans mt-1.5"
                  style={{
                    fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                    color: 'rgba(160,188,215,0.42)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t(exercise.labelKey)}
                </div>
              </div>

              {/* ── Разделитель ── */}
              <div className="mx-7 mb-3" style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.3) 25%, rgba(212,168,83,0.3) 75%, transparent)',
              }} />

              {/* ── Видео — широкое, по центру ── */}
              <div className="px-7 mb-4 flex-shrink-0">
                <div
                  className="relative overflow-hidden w-full"
                  style={{
                    aspectRatio: '16/9',
                    background: '#010306',
                    borderRadius: 4,
                  }}
                >
                  {exercise.video ? (
                    exercise.video.endsWith('.mp4') ? (
                      <video
                        src={exercise.video}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        playsInline
                      />
                    ) : (
                      <iframe
                        src={exercise.video}
                        className="w-full h-full"
                        allowFullScreen
                        title={t(exercise.nameKey)}
                      />
                    )
                  ) : exercise.image ? (
                    <img
                      src={exercise.image}
                      alt={t(exercise.nameKey)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <div style={{ fontFamily: '"STKaiti",serif', fontSize: '3.5rem', color: 'rgba(212,168,83,0.1)' }}>
                        ☯
                      </div>
                      <div style={{ fontSize: '0.52rem', color: 'rgba(212,168,83,0.2)', letterSpacing: '0.2em' }}>
                        ВИДЕО БУДЕТ ДОБАВЛЕНО
                      </div>
                    </div>
                  )}
                  {/* виньетка */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 50px rgba(1,3,12,0.55)', borderRadius: 4 }}
                  />
                </div>
              </div>

              {/* ── Описание — скролл ── */}
              <div
                className="px-7 pb-2 overflow-y-auto flex-1"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(212,168,83,0.15) transparent',
                  minHeight: 0,
                }}
              >
                <DescriptionText text={t(exercise.descriptionKey)} />
              </div>

              {/* ── Нижняя навигация ── */}
              <div
                className="flex items-center justify-between px-7 py-3 flex-shrink-0"
                style={{ borderTop: '1px solid rgba(212,168,83,0.08)' }}
              >
                <button
                  type="button"
                  onClick={() => prev && onNavigate(prev)}
                  disabled={!prev}
                  className="font-sans"
                  style={{
                    fontSize: '0.63rem',
                    letterSpacing: '0.18em',
                    color: prev ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.14)',
                    background: 'none', border: 'none',
                    cursor: prev ? 'pointer' : 'default',
                    padding: '4px 0',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { if (prev) e.currentTarget.style.color = 'rgba(212,168,83,0.95)' }}
                  onMouseLeave={e => { if (prev) e.currentTarget.style.color = 'rgba(212,168,83,0.5)' }}
                >
                  ← 上一式
                </button>

                <div className="flex gap-1.5 items-center">
                  {exercises.map((ex) => (
                    <div
                      key={ex.id}
                      onClick={() => onNavigate(ex)}
                      style={{
                        width: ex.id === exercise.id ? 16 : 5,
                        height: 5,
                        borderRadius: 3,
                        background: ex.id === exercise.id ? 'rgba(212,168,83,0.75)' : 'rgba(212,168,83,0.17)',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => next && onNavigate(next)}
                  disabled={!next}
                  className="font-sans"
                  style={{
                    fontSize: '0.63rem',
                    letterSpacing: '0.18em',
                    color: next ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.14)',
                    background: 'none', border: 'none',
                    cursor: next ? 'pointer' : 'default',
                    padding: '4px 0',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { if (next) e.currentTarget.style.color = 'rgba(212,168,83,0.95)' }}
                  onMouseLeave={e => { if (next) e.currentTarget.style.color = 'rgba(212,168,83,0.5)' }}
                >
                  下一式 →
                </button>
              </div>

            </div>{/* /контент */}
          </motion.div>
          </div>{/* /центр */}

          {/* ── Облако справа — левый край вплотную к модалке ── */}
          <div className="flex-1 overflow-hidden flex items-center justify-start">
            <img
              src="/images/modal-bg.png"
              aria-hidden draggable={false}
              className="pointer-events-none select-none h-full w-auto object-cover object-left"
              style={{ opacity: 0.85, transform: 'scaleX(-1)' }}
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

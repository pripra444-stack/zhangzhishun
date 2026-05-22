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

// Разбиваем описание на параграфы по \n
function DescriptionText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="flex flex-col gap-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 4 }} />
        const isStep = /^[①②③④⑤⑥⑦⑧]/.test(line)
        const isHeader = line.startsWith('步骤')
        const isChinese = /^[生长化收藏]/.test(line)
        return (
          <p
            key={i}
            className="font-sans"
            style={{
              fontSize: 'clamp(0.72rem, 1.05vw, 0.84rem)',
              color: isHeader ? '#d4a853' : isChinese ? '#c8a96e' : isStep ? '#c8bfb0' : '#8fa0b4',
              lineHeight: 1.7,
              letterSpacing: isHeader ? '0.1em' : '0.02em',
              fontWeight: isHeader ? 600 : 400,
              paddingLeft: isStep ? '0.75em' : 0,
            }}
          >
            {line}
          </p>
        )
      })}
    </div>
  )
}

// Китайские числительные для номера упражнения
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
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: 300,
            background: 'rgba(2,5,14,0.92)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: 'clamp(12px, 3vw, 40px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: 900,
              maxHeight: '92vh',
              background: 'linear-gradient(160deg, #0b1726 0%, #060e1c 55%, #040910 100%)',
              boxShadow: '0 40px 120px rgba(0,4,20,0.97)',
              borderRadius: 6,
            }}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={e => e.stopPropagation()}
          >

            {/* ── Шапка ── */}
            <div className="flex items-center justify-between px-7 pt-5 pb-3">
              <div className="flex items-center gap-3">
                {/* Номер упражнения */}
                <div
                  style={{
                    fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    color: '#d4a853',
                    lineHeight: 1,
                    textShadow: '0 0 24px rgba(212,168,83,0.45)',
                  }}
                >
                  第{zhNum}式
                </div>
                <div style={{ width: 1, height: 24, background: 'rgba(212,168,83,0.2)' }} />
                <div
                  style={{
                    fontFamily: '"STKaiti","KaiTi",serif',
                    fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)',
                    color: 'rgba(212,168,83,0.5)',
                    letterSpacing: '0.18em',
                  }}
                >
                  {sectionZh}
                </div>
              </div>

              {/* Кнопка закрыть */}
              <button
                type="button"
                onClick={onClose}
                style={{
                  fontSize: '0.68rem',
                  color: 'rgba(212,168,83,0.4)',
                  letterSpacing: '0.22em',
                  fontFamily: 'sans-serif',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.85)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.4)')}
              >
                ✕ закрыть
              </button>
            </div>

            {/* ── Название упражнения ── */}
            <div className="px-7 pb-3">
              <div
                style={{
                  fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                  fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)',
                  color: '#e8d090',
                  letterSpacing: '0.14em',
                  lineHeight: 1.2,
                  textShadow: '0 0 28px rgba(212,168,83,0.25)',
                }}
              >
                {t(exercise.nameKey)}
              </div>
              <div
                className="font-sans mt-1"
                style={{
                  fontSize: 'clamp(0.62rem, 1vw, 0.78rem)',
                  color: 'rgba(160,185,210,0.45)',
                  letterSpacing: '0.04em',
                }}
              >
                {t(exercise.labelKey)}
              </div>
            </div>

            {/* ── Тонкий разделитель ── */}
            <div className="mx-7 mb-4" style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.25) 30%, rgba(212,168,83,0.25) 70%, transparent)',
            }} />

            {/* ── Основное тело: видео + описание ── */}
            <div
              className="flex gap-6 px-7 pb-4"
              style={{ maxHeight: 'calc(92vh - 210px)', overflow: 'hidden' }}
            >
              {/* ─ Левая колонка: видео / изображение ─ */}
              <div className="flex-shrink-0" style={{ width: '45%' }}>

                {/* Видео / фото — без рамки, тёмный фон с виньеткой */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: '4/3',
                    background: '#020608',
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
                      <div
                        style={{
                          fontFamily: '"STKaiti",serif',
                          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                          color: 'rgba(212,168,83,0.12)',
                          lineHeight: 1,
                        }}
                      >
                        ☯
                      </div>
                      <div style={{ fontSize: '0.55rem', color: 'rgba(212,168,83,0.25)', letterSpacing: '0.2em' }}>
                        ВИДЕО БУДЕТ ДОБАВЛЕНО
                      </div>
                    </div>
                  )}

                  {/* Мягкая виньетка по краям */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 40px rgba(2,6,14,0.6)',
                      borderRadius: 4,
                    }}
                  />
                </div>

                {/* Подпись под видео */}
                <div
                  className="mt-2 text-center font-sans"
                  style={{ fontSize: '0.55rem', color: 'rgba(160,180,200,0.25)', letterSpacing: '0.18em' }}
                >
                  {sectionZh} · 第{zhNum}式 · {exercise.id}/8
                </div>
              </div>

              {/* ─ Правая колонка: описание ─ */}
              <div
                className="flex-1 overflow-y-auto pr-1"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.15) transparent' }}
              >
                <DescriptionText text={t(exercise.descriptionKey)} />
              </div>
            </div>

            {/* ── Нижняя навигация ── */}
            <div
              className="flex items-center justify-between px-7 py-3"
              style={{ borderTop: '1px solid rgba(212,168,83,0.08)' }}
            >
              <button
                type="button"
                onClick={() => prev && onNavigate(prev)}
                disabled={!prev}
                className="font-sans"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: prev ? 'rgba(212,168,83,0.55)' : 'rgba(212,168,83,0.15)',
                  background: 'none',
                  border: 'none',
                  cursor: prev ? 'pointer' : 'default',
                  padding: '6px 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (prev) e.currentTarget.style.color = 'rgba(212,168,83,0.95)' }}
                onMouseLeave={e => { if (prev) e.currentTarget.style.color = 'rgba(212,168,83,0.55)' }}
              >
                ← 上一式
              </button>

              {/* Точки-пагинация */}
              <div className="flex gap-1.5 items-center">
                {exercises.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => onNavigate(ex)}
                    style={{
                      width: ex.id === exercise.id ? 16 : 5,
                      height: 5,
                      borderRadius: 3,
                      background: ex.id === exercise.id ? 'rgba(212,168,83,0.75)' : 'rgba(212,168,83,0.18)',
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
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: next ? 'rgba(212,168,83,0.55)' : 'rgba(212,168,83,0.15)',
                  background: 'none',
                  border: 'none',
                  cursor: next ? 'pointer' : 'default',
                  padding: '6px 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (next) e.currentTarget.style.color = 'rgba(212,168,83,0.95)' }}
                onMouseLeave={e => { if (next) e.currentTarget.style.color = 'rgba(212,168,83,0.55)' }}
              >
                下一式 →
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

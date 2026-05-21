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

// Угловые декоративные уголки
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 22
  const t = pos.includes('t') ? 0 : 'auto'
  const b = pos.includes('b') ? 0 : 'auto'
  const l = pos.includes('l') ? 0 : 'auto'
  const r = pos.includes('r') ? 0 : 'auto'
  return (
    <div style={{
      position: 'absolute', top: t, bottom: b, left: l, right: r,
      width: size, height: size,
      borderTop:    pos.includes('t') ? '1.5px solid #d4a853' : undefined,
      borderBottom: pos.includes('b') ? '1.5px solid #d4a853' : undefined,
      borderLeft:   pos.includes('l') ? '1.5px solid #d4a853' : undefined,
      borderRight:  pos.includes('r') ? '1.5px solid #d4a853' : undefined,
      pointerEvents: 'none',
    }} />
  )
}

// Разбиваем описание на параграфы по \n
function DescriptionText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="flex flex-col gap-2">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 6 }} />
        const isStep = /^[①②③④⑤⑥⑦⑧]/.test(line)
        const isHeader = line.startsWith('步骤')
        return (
          <p
            key={i}
            className="font-sans"
            style={{
              fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)',
              color: isHeader ? '#d4a853' : isStep ? '#c8bfb0' : '#9aaabb',
              lineHeight: 1.75,
              letterSpacing: isHeader ? '0.12em' : '0.02em',
              fontWeight: isHeader ? 600 : 400,
              paddingLeft: isStep ? '0.5em' : 0,
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
            background: 'rgba(2,5,14,0.88)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
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
              maxWidth: 880,
              maxHeight: '92vh',
              background: 'linear-gradient(160deg, #0c1828 0%, #060e1c 60%, #04091a 100%)',
              border: '1px solid rgba(212,168,83,0.35)',
              boxShadow: [
                '0 0 0 1px rgba(212,168,83,0.08)',
                '0 0 60px rgba(212,168,83,0.08)',
                '0 30px 100px rgba(0,8,30,0.9)',
              ].join(', '),
              borderRadius: 4,
            }}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Угловые уголки */}
            <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

            {/* ── Шапка ── */}
            <div
              className="flex items-center justify-between px-6 pt-5 pb-3"
              style={{ borderBottom: '1px solid rgba(212,168,83,0.15)' }}
            >
              <div className="flex items-center gap-3">
                {/* Номер упражнения по-китайски */}
                <div
                  style={{
                    fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    color: '#d4a853',
                    lineHeight: 1,
                    textShadow: '0 0 20px rgba(212,168,83,0.5)',
                  }}
                >
                  第{zhNum}式
                </div>
                {/* Разделитель */}
                <div style={{ width: 1, height: 28, background: 'rgba(212,168,83,0.25)' }} />
                {/* Название секции */}
                <div
                  style={{
                    fontFamily: '"STKaiti","KaiTi",serif',
                    fontSize: 'clamp(0.75rem, 1.3vw, 0.95rem)',
                    color: 'rgba(212,168,83,0.6)',
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
                  fontSize: '0.7rem',
                  color: 'rgba(212,168,83,0.45)',
                  letterSpacing: '0.25em',
                  fontFamily: 'sans-serif',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.45)')}
              >
                ✕ закрыть
              </button>
            </div>

            {/* ── Название упражнения ── */}
            <div className="px-6 pt-4 pb-3">
              <div
                style={{
                  fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
                  fontSize: 'clamp(1.3rem, 2.8vw, 2rem)',
                  color: '#e8d090',
                  letterSpacing: '0.14em',
                  lineHeight: 1.2,
                  textShadow: '0 0 30px rgba(212,168,83,0.3)',
                }}
              >
                {t(exercise.nameKey)}
              </div>
              <div
                className="font-sans mt-1"
                style={{
                  fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)',
                  color: 'rgba(180,200,220,0.55)',
                  letterSpacing: '0.04em',
                }}
              >
                {t(exercise.labelKey)}
              </div>
            </div>

            {/* ── Горизонтальный разделитель ── */}
            <div className="mx-6 mb-4" style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.4) 30%, rgba(212,168,83,0.4) 70%, transparent)',
            }} />

            {/* ── Основное тело: видео + описание ── */}
            <div
              className="flex gap-5 px-6 pb-4"
              style={{ maxHeight: 'calc(92vh - 230px)', overflow: 'hidden' }}
            >
              {/* ─ Левая колонка: видео / изображение ─ */}
              <div className="flex-shrink-0" style={{ width: '46%' }}>
                {/* Заголовок блока */}
                <div
                  className="flex items-center gap-2 mb-2"
                  style={{ fontSize: '0.6rem', color: 'rgba(212,168,83,0.5)', letterSpacing: '0.2em' }}
                >
                  <span>▸</span>
                  <span>ВИДЕО · ДЕМОНСТРАЦИЯ</span>
                </div>

                {/* Видео / фото блок */}
                <div
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{
                    aspectRatio: '4/3',
                    background: 'radial-gradient(ellipse at 50% 40%, #0d2040 0%, #04091a 70%)',
                    border: '1px solid rgba(212,168,83,0.25)',
                    borderRadius: 3,
                  }}
                >
                  {/* Угловые уголки внутри видео-блока */}
                  <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

                  {exercise.video ? (
                    exercise.video.endsWith('.mp4') ? (
                      <video
                        src={exercise.video}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        playsInline
                        title={t(exercise.nameKey)}
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
                    <div className="flex flex-col items-center gap-3">
                      <div
                        style={{
                          fontFamily: '"STKaiti",serif',
                          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                          color: 'rgba(212,168,83,0.15)',
                          lineHeight: 1,
                        }}
                      >
                        ☯
                      </div>
                      <div style={{ fontSize: '0.58rem', color: 'rgba(212,168,83,0.3)', letterSpacing: '0.2em' }}>
                        ВИДЕО БУДЕТ ДОБАВЛЕНО
                      </div>
                    </div>
                  )}
                </div>

                {/* Подпись под видео */}
                <div
                  className="mt-2 text-center font-sans"
                  style={{ fontSize: '0.58rem', color: 'rgba(180,190,210,0.3)', letterSpacing: '0.15em' }}
                >
                  {sectionZh} · 第{zhNum}式 · {exercise.id}/8
                </div>
              </div>

              {/* ─ Правая колонка: описание ─ */}
              <div className="flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.2) transparent' }}>
                <div
                  className="flex items-center gap-2 mb-3"
                  style={{ fontSize: '0.6rem', color: 'rgba(212,168,83,0.5)', letterSpacing: '0.2em' }}
                >
                  <span>▸</span>
                  <span>ОПИСАНИЕ · ТЕХНИКА</span>
                </div>
                <DescriptionText text={t(exercise.descriptionKey)} />
              </div>
            </div>

            {/* ── Нижняя навигация ── */}
            <div
              className="flex items-center justify-between px-6 py-3"
              style={{ borderTop: '1px solid rgba(212,168,83,0.12)' }}
            >
              <button
                type="button"
                onClick={() => prev && onNavigate(prev)}
                disabled={!prev}
                className="font-sans"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: prev ? 'rgba(212,168,83,0.6)' : 'rgba(212,168,83,0.2)',
                  background: 'none',
                  border: 'none',
                  cursor: prev ? 'pointer' : 'default',
                  padding: '6px 12px',
                  borderLeft: `1px solid ${prev ? 'rgba(212,168,83,0.3)' : 'rgba(212,168,83,0.1)'}`,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (prev) e.currentTarget.style.color = 'rgba(212,168,83,0.95)' }}
                onMouseLeave={e => { if (prev) e.currentTarget.style.color = 'rgba(212,168,83,0.6)' }}
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
                      width: ex.id === exercise.id ? 14 : 5,
                      height: 5,
                      borderRadius: 3,
                      background: ex.id === exercise.id ? 'rgba(212,168,83,0.8)' : 'rgba(212,168,83,0.2)',
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
                  color: next ? 'rgba(212,168,83,0.6)' : 'rgba(212,168,83,0.2)',
                  background: 'none',
                  border: 'none',
                  cursor: next ? 'pointer' : 'default',
                  padding: '6px 12px',
                  borderRight: `1px solid ${next ? 'rgba(212,168,83,0.3)' : 'rgba(212,168,83,0.1)'}`,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (next) e.currentTarget.style.color = 'rgba(212,168,83,0.95)' }}
                onMouseLeave={e => { if (next) e.currentTarget.style.color = 'rgba(212,168,83,0.6)' }}
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

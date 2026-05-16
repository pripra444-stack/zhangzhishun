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

  const sectionZh = sectionKey ? t(`sections.${sectionKey}.zh`) : ''

  return (
    <AnimatePresence>
      {exercise && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: '#03070fcc' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #0d1e36, #081428)',
              border: '1px solid #4488cc55',
              boxShadow: '0 0 60px #4488cc22',
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Media area */}
            <div
              className="h-48 flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, #1a4080, #060e1e)',
                borderBottom: '1px solid #4488cc33',
              }}
            >
              <span className="absolute top-3 left-4 text-[0.55rem] text-portal-blue/60 font-sans tracking-widest">
                {sectionZh} · {t('modal.exercise')} {exercise.id}
              </span>

              {exercise.video ? (
                <iframe
                  src={exercise.video}
                  className="w-full h-full"
                  allowFullScreen
                  title={t(exercise.nameKey)}
                />
              ) : exercise.image ? (
                <img src={exercise.image} alt={t(exercise.nameKey)} className="h-full object-contain" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-portal-blue/40">
                  <span className="text-4xl">☯</span>
                  <span className="text-xs font-sans tracking-wider">{t('modal.placeholder')}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              <h3 className="text-gold font-serif text-lg tracking-wider mb-3">
                {t(exercise.nameKey)}
              </h3>
              <p className="text-text-muted text-sm leading-7 font-sans">
                {t(exercise.descriptionKey)}
              </p>
            </div>

            {/* Footer nav */}
            <div
              className="flex items-center justify-between px-6 py-3"
              style={{ borderTop: '1px solid #4488cc22' }}
            >
              <button
                onClick={() => prev && onNavigate(prev)}
                disabled={!prev}
                className="text-xs text-portal-blue/60 tracking-wider font-sans px-3 py-1.5 border rounded transition-colors duration-200 disabled:opacity-20 hover:text-portal-blue hover:border-portal-blue/50"
                style={{ borderColor: '#4488cc33' }}
              >
                {t('modal.prev')}
              </button>

              <button
                onClick={onClose}
                className="text-xs text-portal-blue/40 font-sans tracking-wider hover:text-portal-blue transition-colors"
              >
                {t('modal.close')}
              </button>

              <button
                onClick={() => next && onNavigate(next)}
                disabled={!next}
                className="text-xs text-portal-blue/60 tracking-wider font-sans px-3 py-1.5 border rounded transition-colors duration-200 disabled:opacity-20 hover:text-portal-blue hover:border-portal-blue/50"
                style={{ borderColor: '#4488cc33' }}
              >
                {t('modal.next')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

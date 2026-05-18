// src/components/PracticeSection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GateCircle from './GateCircle'
import ExerciseModal from './ExerciseModal'
import { getExercisesBySection } from '../data/exercises'
import type { Exercise, SectionKey } from '../data/exercises'

interface Props {
  sectionKey: SectionKey
  bgClass?: string
  bgImage?: string        // путь к фоновой картинке (Феникс и т.д.)
  bgImageOpacity?: number // прозрачность фона (0-1), по умолчанию 0.35
}

export default function PracticeSection({
  sectionKey,
  bgClass = 'bg-bg-section',
  bgImage,
  bgImageOpacity = 0.35,
}: Props) {
  const { t } = useTranslation()
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null)
  const exercises = getExercisesBySection(sectionKey)

  return (
    <section className={`${bgClass} py-20 px-4 flex flex-col items-center gap-10 relative overflow-hidden`}>

      {/* Фоновое изображение (Феникс и т.д.) */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{
            opacity: bgImageOpacity,
            zIndex: 0,
            mixBlendMode: 'screen',
          }}
          draggable={false}
        />
      )}

      {/* Весь контент поверх фона */}
      <div className="relative z-10 flex flex-col items-center gap-10 w-full">

        {/* Заголовок */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="text-gold gold-glow"
            style={{
              fontFamily: '"KNYuanmo", "MFLiHei", serif',
              fontSize: 'clamp(2rem, 8vw, 3.5rem)',
              letterSpacing: '0.12em',
            }}
          >
            {t(`sections.${sectionKey}.zh`)}
          </div>
          <div className="text-text-muted text-xs tracking-[0.3em] font-sans mt-2 uppercase">
            {t(`sections.${sectionKey}.sub`)}
          </div>
        </motion.div>

        {/* Разделитель */}
        <div
          className="w-32 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #d4a85366, transparent)' }}
        />

        {/* Сетка кружков — 2 колонки */}
        <motion.div
          className="grid grid-cols-2 gap-6"
          style={{ maxWidth: 'min(880px, 96vw)', width: '100%' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {exercises.map(exercise => (
            <GateCircle
              key={exercise.id}
              exercise={exercise}
              onClick={setActiveExercise}
            />
          ))}
        </motion.div>

      </div>

      {/* Модальное окно */}
      <ExerciseModal
        exercise={activeExercise}
        sectionKey={sectionKey}
        onClose={() => setActiveExercise(null)}
        onNavigate={setActiveExercise}
      />
    </section>
  )
}

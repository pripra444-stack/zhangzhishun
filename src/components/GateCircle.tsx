// src/components/GateCircle.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise } from '../data/exercises'

interface Props {
  exercise: Exercise
  onClick: (exercise: Exercise) => void
}

// Размер одного элемента — подбирается под контейнер 380px, 2 колонки
const CARD_SIZE = 'clamp(160px, 42vw, 260px)'

export default function GateCircle({ exercise, onClick }: Props) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer select-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onClick={() => onClick(exercise)}
    >
      {/* Номер упражнения */}
      <div
        className="text-gold mb-1 font-sans"
        style={{ fontSize: '0.72rem', letterSpacing: '0.12em', opacity: 0.85 }}
      >
        {exercise.id}
      </div>

      {/* Квадратная карточка — фрейм + фото */}
      <div
        className="relative"
        style={{ width: CARD_SIZE, height: CARD_SIZE }}
      >
        {/* Фото упражнения — круг, занимает 78% карточки, центрирован */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '78%',
            height: '78%',
            top: '11%',
            left: '11%',
            zIndex: 1,
            background: 'radial-gradient(circle at 40% 35%, #1a4080 0%, #0a1e3a 60%, #060e1e 100%)',
          }}
        >
          {exercise.image ? (
            <img
              src={exercise.image}
              alt={t(exercise.nameKey)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#4488cc44] text-3xl">☯</span>
            </div>
          )}
        </div>

        {/* Золотая круглая рамка — mix-blend-mode: screen делает чёрный прозрачным */}
        <img
          src="/images/circle-frame.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            zIndex: 2,
            mixBlendMode: 'screen',
            filter: 'brightness(1.1)',
          }}
        />
      </div>

      {/* Подпись */}
      <div
        className="mt-1 text-center font-sans"
        style={{
          fontSize: '0.6rem',
          color: '#a89060',
          letterSpacing: '0.06em',
          maxWidth: '90%',
        }}
      >
        {t(exercise.labelKey)}
      </div>
    </motion.div>
  )
}

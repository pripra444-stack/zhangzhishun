// src/components/GateCircle.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise } from '../data/exercises'

interface Props {
  exercise: Exercise
  onClick: (exercise: Exercise) => void
}

// Размер карточки — крупный, чтобы заполнять 2 колонки
const CARD_SIZE = 'clamp(170px, 45vw, 320px)'

export default function GateCircle({ exercise, onClick }: Props) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer select-none"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onClick={() => onClick(exercise)}
    >
      {/* Номер упражнения */}
      <div
        className="text-gold mb-1 font-sans"
        style={{ fontSize: '0.8rem', letterSpacing: '0.14em', opacity: 0.85 }}
      >
        {exercise.id}
      </div>

      {/* Квадратная карточка — рамка + фото */}
      <div
        className="relative"
        style={{ width: CARD_SIZE, height: CARD_SIZE }}
      >
        {/* Фото упражнения — круг 78% карточки, без синего фона */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '78%',
            height: '78%',
            top: '11%',
            left: '11%',
            zIndex: 1,
          }}
        >
          {exercise.image && (
            <img
              src={exercise.image}
              alt={t(exercise.nameKey)}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Золотая круглая рамка (circle-frame.png) — screen убирает чёрный фон */}
        <img
          src="/images/circle-frame.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            zIndex: 2,
            mixBlendMode: 'screen',
            filter: 'brightness(1.15)',
          }}
        />
      </div>

      {/* Подпись */}
      <div
        className="mt-2 text-center font-sans"
        style={{
          fontSize: '0.65rem',
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

// src/components/GateCircle.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise } from '../data/exercises'

interface Props {
  exercise: Exercise
  onClick: (exercise: Exercise) => void
}

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
        className="font-sans mb-1"
        style={{ fontSize: '0.78rem', letterSpacing: '0.14em', color: '#d4a853', opacity: 0.85 }}
      >
        {exercise.id}
      </div>

      {/* Карточка — рамка + фото */}
      <div
        className="relative"
        style={{ width: CARD_SIZE, height: CARD_SIZE }}
      >
        {/* Фото / заглушка внутри круга (78% карточки, центр) */}
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

        {/* Золотая рамка поверх */}
        <img
          src="/images/circle-frame.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ zIndex: 2, mixBlendMode: 'screen', filter: 'brightness(1.15)' }}
        />
      </div>

      {/* Китайское название — золотым */}
      <div
        className="mt-2 text-center font-sans"
        style={{
          fontSize: '0.7rem',
          color: '#d4a853',
          letterSpacing: '0.08em',
          lineHeight: 1.3,
        }}
      >
        {t(exercise.nameKey)}
      </div>

      {/* Русский перевод — белым */}
      <div
        className="text-center font-sans"
        style={{
          fontSize: '0.58rem',
          color: '#d8cfc4',
          letterSpacing: '0.04em',
          maxWidth: '95%',
          marginTop: '2px',
          lineHeight: 1.3,
        }}
      >
        {t(exercise.labelKey)}
      </div>
    </motion.div>
  )
}

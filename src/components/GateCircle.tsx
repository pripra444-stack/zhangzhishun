// src/components/GateCircle.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise } from '../data/exercises'

interface Props {
  exercise: Exercise
  onClick: (exercise: Exercise) => void
}

export default function GateCircle({ exercise, onClick }: Props) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer select-none w-full"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onClick={() => onClick(exercise)}
    >
      {/* Карточка — рамка + фото, заполняет колонку */}
      <div
        className="relative w-full"
        style={{ aspectRatio: '1' }}
      >
        {/* Фото внутри круга */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '60%',
            height: '60%',
            top: '20%',
            left: '20%',
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

        {/* Синяя рамка поверх */}
        <img
          src="/images/circle-frame-blue.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            zIndex: 2,
            mixBlendMode: 'screen',
            filter: 'invert(1) hue-rotate(195deg) brightness(1.4) saturate(2.5)',
          }}
          draggable={false}
        />
      </div>

      {/* Китайское название — близко к кругу */}
      <div
        className="mt-0.5 text-center font-sans"
        style={{
          fontSize: 'clamp(0.55rem, 1.1vw, 0.85rem)',
          color: '#7ec8f5',
          letterSpacing: '0.06em',
          lineHeight: 1.3,
        }}
      >
        {t(exercise.nameKey)}
      </div>

      {/* Русский перевод */}
      <div
        className="text-center font-sans px-1"
        style={{
          fontSize: 'clamp(0.42rem, 0.85vw, 0.65rem)',
          color: '#d8cfc4',
          letterSpacing: '0.03em',
          lineHeight: 1.3,
          marginTop: '1px',
          maxWidth: '110%',
        }}
      >
        {t(exercise.labelKey)}
      </div>
    </motion.div>
  )
}

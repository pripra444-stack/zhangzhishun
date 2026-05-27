// src/components/GateCircle.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise } from '../data/exercises'
import { img } from '../utils/assets'

interface Props {
  exercise: Exercise
  onClick: (exercise: Exercise) => void
  sectionKey?: string
}

export default function GateCircle({ exercise, onClick, sectionKey }: Props) {
  const { t } = useTranslation()
  const isChangshou = sectionKey === 'changshou'

  const frameImg  = isChangshou ? img('/images/circle-frame-blue.png') : img('/images/circle-frame-gold.png')
  const nameColor = isChangshou ? '#00D8FF' : '#d4a855'
  const frameShadow = isChangshou
    ? [
        'drop-shadow(0 6px 18px rgba(0,30,50,0.98))',
        'drop-shadow(0 14px 40px rgba(0,60,80,0.75))',
        'drop-shadow(-4px -4px 10px rgba(0,20,40,0.6))',
      ].join(' ')
    : [
        'drop-shadow(0 6px 18px rgba(0,4,18,0.98))',
        'drop-shadow(0 14px 40px rgba(0,8,30,0.85))',
        'drop-shadow(-4px -4px 10px rgba(0,2,12,0.7))',
      ].join(' ')

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
        {/* Рамка */}
        <img
          src={frameImg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          style={{ zIndex: 2, filter: frameShadow }}
          draggable={false}
        />

        {/* Фото — круглое, центрировано в кольце */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{ width: '72%', height: '72%', top: '14%', left: '14%', zIndex: 1 }}
        >
          {exercise.image && (
            <img
              src={exercise.image}
              alt={t(exercise.nameKey)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Китайское название */}
      <div
        className="mt-1 text-center"
        style={{
          fontFamily: '"STKaiti", "KaiTi", "AR PL UKai CN", "Noto Serif SC", serif',
          fontSize: 'clamp(1.65rem, 3.3vw, 2.55rem)',
          color: nameColor,
          letterSpacing: '0.1em',
          lineHeight: 1.2,
          textShadow: isChangshou ? '0 0 18px rgba(0,216,255,0.35)' : 'none',
        }}
      >
        {t(exercise.nameKey)}
      </div>

      {/* Русский перевод */}
      <div
        className="text-center font-sans px-1"
        style={{
          fontSize: 'clamp(0.63rem, 1.28vw, 0.98rem)',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.02em',
          lineHeight: 1.35,
          marginTop: '3px',
          maxWidth: '120%',
        }}
      >
        {t(exercise.labelKey)}
      </div>
    </motion.div>
  )
}

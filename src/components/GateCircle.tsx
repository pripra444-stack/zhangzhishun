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
      className="flex flex-col items-center gap-2 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onClick(exercise)}
    >
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-full relative overflow-hidden border-2 transition-all duration-300"
        style={{
          borderColor: '#4488cc66',
          background: 'radial-gradient(circle at 40% 35%, #1a4080 0%, #0a1e3a 60%, #060e1e 100%)',
          boxShadow: '0 0 15px #4488cc33, 0 0 30px #4488cc11, inset 0 0 20px #0a2040',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 0 25px #4488cc66, 0 0 50px #4488cc22, inset 0 0 20px #0a2040'
          el.style.borderColor = '#4488cc99'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 0 15px #4488cc33, 0 0 30px #4488cc11, inset 0 0 20px #0a2040'
          el.style.borderColor = '#4488cc66'
        }}
      >
        {exercise.image ? (
          <img
            src={exercise.image}
            alt={t(exercise.nameKey)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            <span className="text-portal-blue/30 text-lg">☯</span>
            <span className="text-portal-blue/40 text-[0.42rem] font-sans tracking-wider text-center">
              {exercise.id}
            </span>
          </div>
        )}

        {/* Mist at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 rounded-b-full pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #1a406077, transparent)' }}
        />
      </div>

      <span
        className="text-[0.6rem] font-sans tracking-wider text-portal-blue/70 px-2 py-0.5 rounded-full border"
        style={{ borderColor: '#4488cc33', background: '#0a1628' }}
      >
        {exercise.id} · {t(exercise.labelKey)}
      </span>
    </motion.div>
  )
}

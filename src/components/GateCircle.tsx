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
      className="flex flex-col items-center cursor-pointer select-none"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onClick={() => onClick(exercise)}
    >
      {/* Number above */}
      <div
        className="text-gold mb-1 font-sans"
        style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.8 }}
      >
        {exercise.id}
      </div>

      {/* Gate frame card */}
      <div
        className="relative"
        style={{ width: 'clamp(130px, 42vw, 170px)', height: 'clamp(130px, 42vw, 170px)' }}
      >
        {/* Gate frame image — full card */}
        <img
          src="/images/gate-frame.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover z-[2] pointer-events-none"
          style={{ filter: 'brightness(0.9)' }}
        />

        {/* Exercise photo / placeholder — circular, centered in gate opening (~62%) */}
        <div
          className="absolute rounded-full overflow-hidden z-[1]"
          style={{
            width: '62%',
            height: '62%',
            top: '19%',
            left: '19%',
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
              <span className="text-[#4488cc44] text-2xl">☯</span>
            </div>
          )}
        </div>

        {/* Hover glow overlay */}
        <motion.div
          className="absolute inset-0 rounded-full z-[3] pointer-events-none"
          style={{
            width: '62%', height: '62%', top: '19%', left: '19%',
            background: 'transparent',
          }}
          whileHover={{ boxShadow: '0 0 30px #d4a85344, 0 0 60px #d4a85322' }}
        />
      </div>

      {/* Label below */}
      <div
        className="mt-1 text-center font-sans"
        style={{ fontSize: '0.58rem', color: '#8899aa', letterSpacing: '0.05em', maxWidth: '90%' }}
      >
        {t(exercise.labelKey)}
      </div>
    </motion.div>
  )
}

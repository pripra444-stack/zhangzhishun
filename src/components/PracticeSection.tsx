// src/components/PracticeSection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GateCircle from './GateCircle'
import ExerciseModal from './ExerciseModal'
import { getExercisesBySection } from '../data/exercises'
import type { Exercise, SectionKey } from '../data/exercises'

// ── Детерминированный генератор (стабильные позиции без useMemo) ──
function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

interface Stream { id: number; x: number; w: number; dur: number; delay: number; opacity: number; blur: number }

function makeStreams(count: number): Stream[] {
  const r = seededRand(137)
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x:       r() * 100,          // % по горизонтали внутри контейнера
    w:       0.8 + r() * 3.2,    // ширина потока px
    dur:     1.6 + r() * 3.8,    // скорость падения (сек)
    delay:  -(r() * 8),          // стартовая фаза (отрицательный = уже в процессе)
    opacity: 0.06 + r() * 0.18,  // прозрачность
    blur:    r() > 0.7 ? 1 : 0,  // часть потоков слегка размыта
  }))
}

const STREAMS = makeStreams(55)

// ── Широкие мутные слои (фоновый водный туман) ──
interface FogLayer { id: number; x: number; w: number; dur: number; delay: number; opacity: number }
function makeFog(): FogLayer[] {
  const r = seededRand(89)
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x:       r() * 70,
    w:       8 + r() * 18,
    dur:     6 + r() * 8,
    delay:  -(r() * 10),
    opacity: 0.02 + r() * 0.05,
  }))
}
const FOG_LAYERS = makeFog()

interface Props {
  sectionKey: SectionKey
  bgClass?: string
  bgImage?: string
  bgImageOpacity?: number
  cols?: 2 | 4
}

export default function PracticeSection({
  sectionKey,
  bgClass = 'bg-bg-section',
  bgImage,
  bgImageOpacity = 0.35,
  cols = 4,
}: Props) {
  const { t } = useTranslation()
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null)
  const exercises = getExercisesBySection(sectionKey)
  const showWaterfall = sectionKey === 'jingang' && cols === 2

  return (
    <section
      className={`${bgClass} py-20 flex flex-col items-center gap-10 relative overflow-hidden`}
      style={{ paddingLeft: '7.69vw', paddingRight: '7.69vw' }}
    >

      {/* CSS-анимации водопада */}
      {showWaterfall && (
        <style>{`
          @keyframes stream-fall {
            0%   { transform: translateY(-110%); opacity: 0; }
            8%   { opacity: 1; }
            92%  { opacity: 1; }
            100% { transform: translateY(110%); opacity: 0; }
          }
          @keyframes fog-fall {
            0%   { transform: translateY(-100%); opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          @keyframes water-shimmer {
            0%, 100% { opacity: 0.3; }
            50%       { opacity: 0.9; }
          }
        `}</style>
      )}

      {/* Фоновое изображение */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: bgImageOpacity, zIndex: 0, mixBlendMode: 'screen' }}
          draggable={false}
        />
      )}

      {/* ── Водопад — за кружками, по ширине сетки ── */}
      {showWaterfall && (
        <div
          aria-hidden
          className="pointer-events-none select-none absolute overflow-hidden"
          style={{
            width: '38.5vw',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            bottom: 0,
            zIndex: 2,
          }}
        >
          {/* Фоновый туманный слой — едва уловимый синий дрейф */}
          {FOG_LAYERS.map(f => (
            <div
              key={`fog-${f.id}`}
              style={{
                position: 'absolute',
                left: `${f.x}%`,
                top: 0,
                width: `${f.w}%`,
                height: '45%',
                background: 'linear-gradient(180deg, transparent 0%, rgba(80,160,255,1) 45%, rgba(120,200,255,1) 55%, transparent 100%)',
                opacity: f.opacity,
                filter: 'blur(8px)',
                animation: `fog-fall ${f.dur}s linear ${f.delay}s infinite`,
              }}
            />
          ))}

          {/* Тонкие потоки — основная нить водопада */}
          {STREAMS.map(s => (
            <div
              key={`s-${s.id}`}
              style={{
                position: 'absolute',
                left: `${s.x}%`,
                top: 0,
                width: `${s.w}px`,
                height: '35%',
                background: 'linear-gradient(180deg, transparent 0%, rgba(140,210,255,1) 30%, rgba(200,235,255,1) 50%, rgba(140,210,255,1) 70%, transparent 100%)',
                opacity: s.opacity,
                filter: s.blur ? 'blur(1px)' : 'none',
                animation: `stream-fall ${s.dur}s linear ${s.delay}s infinite`,
                borderRadius: '40%',
              }}
            />
          ))}

          {/* Блики — яркие короткие вспышки поверх потоков */}
          {STREAMS.filter((_, i) => i % 4 === 0).map(s => (
            <div
              key={`gl-${s.id}`}
              style={{
                position: 'absolute',
                left: `calc(${s.x}% - 1px)`,
                top: 0,
                width: `${Math.max(s.w * 0.4, 0.5)}px`,
                height: '18%',
                background: 'linear-gradient(180deg, transparent 0%, rgba(220,245,255,0.9) 50%, transparent 100%)',
                opacity: s.opacity * 0.6,
                animation: `stream-fall ${s.dur * 0.7}s linear ${s.delay - 0.3}s infinite`,
              }}
            />
          ))}

          {/* Лёгкий виньет по краям — чтобы водопад не обрезался резко */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(6,12,24,0.55) 0%, transparent 12%, transparent 88%, rgba(6,12,24,0.55) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      )}

      {/* Весь контент поверх */}
      <div className="relative flex flex-col items-center gap-10 w-full" style={{ zIndex: 3 }}>

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

        {/* Сетка кружков */}
        <motion.div
          className={`grid mx-auto ${cols === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}
          style={{
            width: '100%',
            maxWidth: cols === 2 ? '38.5vw' : '100%',
            columnGap: '7.69vw',
            rowGap: '2vw',
          }}
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

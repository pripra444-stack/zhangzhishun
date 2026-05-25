// src/components/PracticeSection.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GateCircle from './GateCircle'
import ExerciseModal from './ExerciseModal'
import { getExercisesBySection } from '../data/exercises'
import type { Exercise, SectionKey } from '../data/exercises'
import { img } from '../utils/assets'
import { useIsMobile } from '../utils/useIsMobile'

// Восемь меридианов — вертикальная надпись между столбцами
const MERIDIANS = ['冲脉', '带脉', '阴跷脉', '阳跷脉', '阴俞脉', '阳俞脉', '任脉', '督脉']

interface Props {
  sectionKey: SectionKey
  bgClass?: string
  bgImage?: string
  bgImageOpacity?: number
  cols?: 2 | 4
}

// ── Мобильная карусель: один кружок + стрелки + точки ──
function MobileCarousel({ exercises, onOpen }: { exercises: Exercise[]; onOpen: (ex: Exercise) => void }) {
  const { t } = useTranslation()
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(0) // -1 назад, +1 вперёд

  const go = (delta: number) => {
    const next = Math.max(0, Math.min(exercises.length - 1, idx + delta))
    if (next === idx) return
    setDir(delta)
    setIdx(next)
  }

  const ex = exercises[idx]

  return (
    <div className="flex flex-col items-center w-full gap-6">
      {/* Карточка — с анимацией слайда */}
      <div className="relative w-full flex items-center justify-center" style={{ minHeight: 320 }}>
        {/* Стрелка назад */}
        <button
          onClick={() => go(-1)}
          disabled={idx === 0}
          aria-label="Предыдущее"
          style={{
            position: 'absolute', left: 0, zIndex: 10,
            background: 'none', border: 'none', cursor: idx === 0 ? 'default' : 'pointer',
            color: idx === 0 ? 'rgba(212,168,83,0.2)' : 'rgba(212,168,83,0.85)',
            fontSize: '2rem', padding: '0 8px',
            transition: 'color 0.2s',
          }}
        >‹</button>

        {/* Кружок — анимация */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={ex.id}
            initial={{ x: dir * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -dir * 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            style={{ width: '72vw', maxWidth: 280 }}
          >
            <GateCircle exercise={ex} onClick={onOpen} />
          </motion.div>
        </AnimatePresence>

        {/* Стрелка вперёд */}
        <button
          onClick={() => go(1)}
          disabled={idx === exercises.length - 1}
          aria-label="Следующее"
          style={{
            position: 'absolute', right: 0, zIndex: 10,
            background: 'none', border: 'none', cursor: idx === exercises.length - 1 ? 'default' : 'pointer',
            color: idx === exercises.length - 1 ? 'rgba(212,168,83,0.2)' : 'rgba(212,168,83,0.85)',
            fontSize: '2rem', padding: '0 8px',
            transition: 'color 0.2s',
          }}
        >›</button>
      </div>

      {/* Счётчик и точки */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2 items-center">
          {exercises.map((_, i) => (
            <div
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }}
              style={{
                width: i === idx ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === idx ? 'rgba(212,168,83,0.9)' : 'rgba(212,168,83,0.22)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
        <div style={{ color: 'rgba(212,168,83,0.45)', fontSize: '0.68rem', letterSpacing: '0.18em', fontFamily: 'sans-serif' }}>
          {idx + 1} / {exercises.length}
        </div>
      </div>

      {/* Кнопка открыть */}
      <button
        onClick={() => onOpen(ex)}
        style={{
          background: 'none',
          border: '1px solid rgba(212,168,83,0.4)',
          borderRadius: 4,
          color: 'rgba(212,168,83,0.8)',
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          padding: '8px 24px',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,168,83,0.1)'; e.currentTarget.style.color = '#d4a853' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(212,168,83,0.8)' }}
      >
        {t('exercises.openBtn', '— подробнее —')}
      </button>
    </div>
  )
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
  const isJingang = sectionKey === 'jingang' && cols === 2
  const isChangshou = sectionKey === 'changshou' && cols === 2
  const isMobile = useIsMobile()

  return (
    <section
      className={`${bgClass} py-20 flex flex-col items-center gap-10 relative overflow-hidden`}
      style={{ paddingLeft: isMobile ? '5vw' : '7.69vw', paddingRight: isMobile ? '5vw' : '7.69vw' }}
    >

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

      {/* ── Облака — левый фланг (только десктоп) ── */}
      {isJingang && !isMobile && (
        <img
          src={img('/images/clouds-side.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{ top: 0, height: '100%', width: 'auto', left: 0, zIndex: 1 }}
        />
      )}
      {isJingang && !isMobile && (
        <img
          src={img('/images/clouds-side.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{ top: 0, height: '100%', width: 'auto', right: 0, transform: 'scaleX(-1)', zIndex: 1 }}
        />
      )}

      {/* ── Рыбы — левый/правый фланг (только десктоп) ── */}
      {isChangshou && !isMobile && (
        <img
          src={img('/images/changshou-side.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{ top: 0, height: '100%', width: 'auto', left: 0, zIndex: 1 }}
        />
      )}
      {isChangshou && !isMobile && (
        <img
          src={img('/images/changshou-side.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{ top: 0, height: '100%', width: 'auto', right: 0, transform: 'scaleX(-1)', zIndex: 1 }}
        />
      )}

      {/* ── Меридианы (только десктоп) ── */}
      {isJingang && !isMobile && (
        <div
          aria-hidden
          className="absolute pointer-events-none select-none flex flex-col justify-between items-center"
          style={{ left: '50%', transform: 'translateX(-50%)', width: '7.69vw', top: '5%', bottom: '5%', zIndex: 2 }}
        >
          {MERIDIANS.map((m, i) => (
            <div key={i} style={{ border: '1px solid rgba(212,168,83,0.55)', borderRadius: '8px', padding: '8px 5px', background: 'rgba(6,12,24,0.45)', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.2 }}>
              <span style={{ fontFamily: '"STKaiti","KaiTi","Noto Serif SC","PingFang SC",serif', fontSize: 'clamp(1.1rem, 2.1vw, 1.8rem)', color: '#d4b87a', letterSpacing: '0.05em', lineHeight: 1.1, writingMode: 'vertical-rl', textOrientation: 'mixed', whiteSpace: 'nowrap' }}>
                {m}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Весь контент поверх */}
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
            style={{ fontFamily: '"KNYuanmo", "MFLiHei", serif', fontSize: 'clamp(2rem, 8vw, 3.5rem)', letterSpacing: '0.12em' }}
          >
            {t(`sections.${sectionKey}.zh`)}
          </div>
          <div className="text-text-muted text-xs tracking-[0.3em] font-sans mt-2 uppercase">
            {t(`sections.${sectionKey}.sub`)}
          </div>
        </motion.div>

        {/* Разделитель */}
        <div className="w-32 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4a85366, transparent)' }} />

        {/* ── МОБИЛЕ: карусель ── */}
        {isMobile ? (
          <MobileCarousel exercises={exercises} onOpen={setActiveExercise} />
        ) : (
          /* ── ДЕСКТОП: сетка ── */
          <motion.div
            className={`grid mx-auto ${cols === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}
            style={{ width: '100%', maxWidth: cols === 2 ? '38.5vw' : '100%', columnGap: '7.69vw', rowGap: '2vw' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {exercises.map(exercise => (
              <GateCircle key={exercise.id} exercise={exercise} onClick={setActiveExercise} />
            ))}
          </motion.div>
        )}

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

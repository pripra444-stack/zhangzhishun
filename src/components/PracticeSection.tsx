// src/components/PracticeSection.tsx
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
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

// Китайские числительные для номера упражнения
const ZH_ORD = ['一','二','三','四','五','六','七','八','九','十']

// ── Мобильная карусель: peek (видны соседи), свайп, номер ──
function MobileCarousel({ exercises, onOpen, sectionKey }: { exercises: Exercise[]; onOpen: (ex: Exercise) => void; sectionKey: string }) {
  const { t } = useTranslation()
  const [idx, setIdx] = useState(0)
  const touchX = useRef(0)

  // Ширина карточки = 68vw, пик соседей = ~16vw с каждой стороны
  const CARD_VW = 68
  const GAP_VW  = 4
  // left offset карточки 0 = (100 - CARD_VW) / 2 = 16vw
  const PEEK_VW = (100 - CARD_VW) / 2
  const translateVw = PEEK_VW - idx * (CARD_VW + GAP_VW)

  const go = (delta: number) => {
    const next = Math.max(0, Math.min(exercises.length - 1, idx + delta))
    setIdx(next)
  }

  // Свайп жестом
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx < -48) go(1)
    else if (dx > 48) go(-1)
  }

  return (
    <div className="flex flex-col items-center w-full gap-5">

      {/* Номер упражнения */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, paddingLeft: '5vw', paddingRight: '5vw', alignSelf: 'flex-start' }}>
        <span style={{
          fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif',
          fontSize: '1.6rem',
          color: 'rgba(212,168,83,0.9)',
          letterSpacing: '0.08em',
          lineHeight: 1,
        }}>
          第{ZH_ORD[idx] ?? idx + 1}
        </span>
        <span style={{
          fontFamily: 'sans-serif',
          fontSize: '0.72rem',
          color: 'rgba(212,168,83,0.4)',
          letterSpacing: '0.22em',
        }}>
          упражнение · {idx + 1} / {exercises.length}
        </span>
      </div>

      {/* Полоса карточек — overflow hidden создаёт peek */}
      <div
        style={{ width: '100%', overflow: 'hidden' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          style={{ display: 'flex', gap: `${GAP_VW}vw` }}
          animate={{ x: `${translateVw}vw` }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        >
          {exercises.map((ex, i) => (
            <div
              key={ex.id}
              style={{
                width: `${CARD_VW}vw`,
                flexShrink: 0,
                opacity: i === idx ? 1 : 0.55,
                transform: i === idx ? 'scale(1)' : 'scale(0.86)',
                transition: 'opacity 0.35s, transform 0.35s',
                cursor: 'pointer',
              }}
              onClick={() => i === idx ? onOpen(ex) : go(i > idx ? 1 : -1)}
            >
              <GateCircle exercise={ex} onClick={() => {}} sectionKey={sectionKey} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Точки-индикаторы */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingLeft: '5vw', paddingRight: '5vw' }}>
        {exercises.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: i === idx ? 'rgba(212,168,83,0.9)' : 'rgba(212,168,83,0.22)',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* Подсказка свайп — только при первом показе */}
      <div style={{
        color: 'rgba(212,168,83,0.3)',
        fontSize: '0.62rem',
        letterSpacing: '0.15em',
        fontFamily: 'sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        ‹ листайте влево-вправо ›
      </div>

      {/* Кнопка «подробнее» */}
      <button
        onClick={() => onOpen(exercises[idx])}
        style={{
          background: 'none',
          border: '1px solid rgba(212,168,83,0.4)',
          borderRadius: 4,
          color: 'rgba(212,168,83,0.8)',
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          padding: '9px 28px',
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
      style={{ paddingLeft: isMobile ? 0 : '7.69vw', paddingRight: isMobile ? 0 : '7.69vw' }}
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
          style={isMobile ? { paddingLeft: '5vw', paddingRight: '5vw' } : {}}
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
          <MobileCarousel exercises={exercises} onOpen={setActiveExercise} sectionKey={sectionKey} />
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
              <GateCircle key={exercise.id} exercise={exercise} onClick={setActiveExercise} sectionKey={sectionKey} />
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

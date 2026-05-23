// src/components/PracticeSection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GateCircle from './GateCircle'
import ExerciseModal from './ExerciseModal'
import { getExercisesBySection } from '../data/exercises'
import type { Exercise, SectionKey } from '../data/exercises'
import { img } from '../utils/assets'

// Восемь меридианов — вертикальная надпись между столбцами
const MERIDIANS = ['冲脉', '带脉', '阴跷脉', '阳跷脉', '阴俞脉', '阳俞脉', '任脉', '督脉']

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
  const isJingang = sectionKey === 'jingang' && cols === 2
  const isChangshou = sectionKey === 'changshou' && cols === 2

  return (
    <section
      className={`${bgClass} py-20 flex flex-col items-center gap-10 relative overflow-hidden`}
      style={{ paddingLeft: '7.69vw', paddingRight: '7.69vw' }}
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

      {/* ── Облака — левый фланг ── */}
      {isJingang && (
        <img
          src={img('/images/clouds-side.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{
            top: 0,
            height: '100%',
            width: 'auto',
            left: 0,
            zIndex: 1,
          }}
        />
      )}

      {/* ── Облака — правый фланг (зеркало) ── */}
      {isJingang && (
        <img
          src={img('/images/clouds-side.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{
            top: 0,
            height: '100%',
            width: 'auto',
            right: 0,
            transform: 'scaleX(-1)',
            zIndex: 1,
          }}
        />
      )}

      {/* ── Рыбы — левый фланг (Долголетие) ── */}
      {isChangshou && (
        <img
          src={img('/images/changshou-side.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{
            top: 0,
            height: '100%',
            width: 'auto',
            left: 0,
            zIndex: 1,
          }}
        />
      )}

      {/* ── Рыбы — правый фланг (зеркало) ── */}
      {isChangshou && (
        <img
          src={img('/images/changshou-side.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{
            top: 0,
            height: '100%',
            width: 'auto',
            right: 0,
            transform: 'scaleX(-1)',
            zIndex: 1,
          }}
        />
      )}

      {/* ── Меридианы — вертикальный текст по центру между столбцами ── */}
      {isJingang && (
        <div
          aria-hidden
          className="absolute pointer-events-none select-none flex flex-col justify-between items-center"
          style={{
            // ровно в центре секции, по ширине gap между столбцами (7.69vw)
            left: '50%',
            transform: 'translateX(-50%)',
            width: '7.69vw',
            top: '5%',
            bottom: '5%',
            zIndex: 2,
          }}
        >
          {MERIDIANS.map((m, i) => (
            <div
              key={i}
              style={{
                border: '1px solid rgba(212,168,83,0.55)',
                borderRadius: '8px',
                padding: '8px 5px',
                background: 'rgba(6,12,24,0.45)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.2,
              }}
            >
              <span
                style={{
                  fontFamily: '"STKaiti","KaiTi","Noto Serif SC","PingFang SC",serif',
                  fontSize: 'clamp(1.1rem, 2.1vw, 1.8rem)',
                  color: '#d4b87a',
                  letterSpacing: '0.05em',
                  lineHeight: 1.1,
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  whiteSpace: 'nowrap',
                }}
              >
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

// src/components/ExerciseModal.tsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise, SectionKey } from '../data/exercises'
import { getExercisesBySection } from '../data/exercises'

interface Props {
  exercise: Exercise | null
  sectionKey: SectionKey | null
  onClose: () => void
  onNavigate: (exercise: Exercise) => void
}

const ZH_NUM = ['一','二','三','四','五','六','七','八']

// Всегда используем видео первого упражнения для превью всех 8 дизайнов
const DEMO_VIDEO = '/images/exercise-01.mp4'

function Desc({ text, hc = '#d4a853', size = '0.82rem' }: {
  text: string; hc?: string; size?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 4 }} />
        const isHeader = line.startsWith('步骤')
        const isStep = /^[①②③④⑤⑥⑦⑧]/.test(line)
        const cleanLine = isStep ? line.replace(/^[①②③④⑤⑥⑦⑧]\s*/, '') : line
        return (
          <p key={i} style={{
            fontSize: size, lineHeight: 1.72,
            color: isHeader ? hc : 'rgba(255,255,255,0.82)',
            letterSpacing: isHeader ? '0.1em' : '0.025em',
            fontWeight: isHeader ? 600 : 400,
            fontFamily: 'sans-serif',
            display: 'flex',
            alignItems: 'flex-start',
            gap: isStep ? 6 : 0,
          }}>
            {isStep && (
              <img
                src="/images/icon-bullet.svg"
                aria-hidden
                style={{ width: 16, height: 16, flexShrink: 0, marginTop: '0.18em', opacity: 1, filter: 'brightness(0) saturate(100%) invert(76%) sepia(45%) saturate(1200%) hue-rotate(5deg) brightness(92%)' }}
              />
            )}
            <span>{cleanLine}</span>
          </p>
        )
      })}
    </div>
  )
}

function CloseBtn({ onClose, color = 'rgba(212,168,83,0.75)' }: { onClose: () => void; color?: string }) {
  return (
    <button type="button" onClick={onClose} style={{ fontSize: '0.78rem', color, letterSpacing: '0.18em', fontFamily: 'sans-serif', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', flexShrink: 0, fontWeight: 500 }}
      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={e => (e.currentTarget.style.color = color)}>✕ закрыть</button>
  )
}

function Dots({ exercises, exercise, onNavigate, color = 'rgba(212,168,83,0.75)' }: any) {
  return (
    <div className="flex gap-1.5 items-center">
      {exercises.map((ex: Exercise) => (
        <div key={ex.id} onClick={() => onNavigate(ex)} style={{
          width: ex.id === exercise.id ? 18 : 5, height: 5, borderRadius: 3,
          background: ex.id === exercise.id ? color : color.replace('0.75', '0.18'),
          cursor: 'pointer', transition: 'all 0.3s',
        }} />
      ))}
    </div>
  )
}

function Video() {
  return (
    <div className="relative w-full" style={{ background: '#000' }}>
      {/* Мозаичный фон из иконки */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: 'url(/images/icon-pattern.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '52px 52px',
          opacity: 0.09,
          filter: 'brightness(0) saturate(100%) invert(76%) sepia(45%) saturate(1200%) hue-rotate(5deg) brightness(92%)',
          zIndex: 0,
        }}
      />
      <video
        src={DEMO_VIDEO}
        className="w-full block relative"
        style={{ display: 'block', zIndex: 1 }}
        controls
        autoPlay
        loop
        playsInline
      />
    </div>
  )
}

function Photo({ src, style }: { src?: string; style?: React.CSSProperties }) {
  if (!src) return null
  return <img src={src} alt="" className="object-cover" style={{ display: 'block', ...style }} />
}

// Золотые орнаментальные полосы — flex-элемент вне модального блока
// Структура: [линия 1px | просвет 5px | иконки 36px | просвет 5px | линия 1px] = 48px
function OrnamentStrip() {
  const GOLDEN = 'brightness(0) saturate(100%) invert(76%) sepia(45%) saturate(1200%) hue-rotate(5deg) brightness(92%)'
  const LINE_GRAD = 'linear-gradient(to bottom, transparent, rgba(212,168,83,0.6) 8%, rgba(212,168,83,0.6) 92%, transparent)'
  return (
    <div
      aria-hidden
      className="flex-shrink-0 self-stretch pointer-events-none flex"
      style={{ width: 48 }}
    >
      {/* Левая золотая линия */}
      <div style={{ width: 1, flexShrink: 0, background: LINE_GRAD }} />
      {/* Просвет */}
      <div style={{ width: 5, flexShrink: 0 }} />
      {/* Иконки (иконка 02) — уже и с просветом */}
      <div style={{
        flex: 1,
        backgroundImage: 'url(/images/icon-pattern.svg)',
        backgroundRepeat: 'repeat-y',
        backgroundSize: '36px 36px',
        backgroundPosition: 'center top',
        filter: GOLDEN,
        opacity: 0.25,
      }} />
      {/* Просвет */}
      <div style={{ width: 5, flexShrink: 0 }} />
      {/* Правая золотая линия */}
      <div style={{ width: 1, flexShrink: 0, background: LINE_GRAD }} />
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ДИЗАЙН 1 — Вертикальный, облака по бокам (текущий стиль)
// ══════════════════════════════════════════════════════════
function D1({ p }: { p: any }) {
  return (
    <motion.div className="fixed inset-0 flex items-stretch justify-center" style={{ zIndex: 300, background: '#06091B', backdropFilter: 'blur(10px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
      {/* Левое облако */}
      <div className="flex-1 overflow-hidden relative pointer-events-none">
        <img src="/images/modal-bg.png" aria-hidden className="absolute inset-0 w-full h-full select-none" style={{ objectFit: 'cover', objectPosition: 'right center', opacity: 0.85 }} />
      </div>
      {/* Левая орнаментальная полоса — снаружи блока */}
      <OrnamentStrip />
      <div className="flex items-center justify-center flex-shrink-0 py-4" style={{ width: 'min(800px, 90vw)' }} onClick={p.onClose}>
        <motion.div className="w-full flex flex-col overflow-hidden" style={{ maxHeight: '94vh', borderRadius: 6, background: '#000000', boxShadow: '0 50px 140px rgba(0,2,18,0.98)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }} onClick={e => e.stopPropagation()}>
          {/* Шапка */}
          <div className="flex items-center justify-between px-7 pt-4 pb-2">
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: '"STKaiti",serif', fontSize: '1.5rem', color: '#d4a853', textShadow: '0 0 20px rgba(212,168,83,0.5)' }}>第{p.zhNum}部</span>
              <div style={{ width: 1, height: 20, background: 'rgba(212,168,83,0.2)' }} />
              <span style={{ fontFamily: '"STKaiti",serif', fontSize: '0.8rem', color: 'rgba(212,168,83,0.48)', letterSpacing: '0.2em' }}>{p.sectionZh}</span>
            </div>
            <CloseBtn onClose={p.onClose} />
          </div>
          {/* Название по центру */}
          <div className="text-center px-7 pb-3">
            <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#e8d090', letterSpacing: '0.18em', textShadow: '0 0 30px rgba(212,168,83,0.3)' }}>{p.t(p.ex.nameKey)}</div>
            <div style={{ fontSize: 'clamp(0.85rem,1.4vw,1.05rem)', color: 'rgba(180,210,240,0.65)', marginTop: 8, fontFamily: 'sans-serif', letterSpacing: '0.03em' }}>{p.t(p.ex.labelKey)}</div>
          </div>
          <div className="mx-7 mb-3" style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,168,83,0.3) 25%,rgba(212,168,83,0.3) 75%,transparent)' }} />
          {/* Видео */}
          <div className="px-7 mb-3 flex-shrink-0"><Video /></div>
          {/* Текст */}
          <div className="px-7 pb-2 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.15) transparent', minHeight: 0 }}>
            <Desc text={p.t(p.ex.descriptionKey)} />
          </div>
          {/* Нав */}
          <div className="flex items-center justify-between px-7 py-3" style={{ borderTop: '1px solid rgba(212,168,83,0.08)' }}>
            <button type="button" onClick={() => p.prev && p.onNavigate(p.prev)} disabled={!p.prev} style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: p.prev ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.12)', background: 'none', border: 'none', cursor: p.prev ? 'pointer' : 'default' }}>← 上一部</button>
            <Dots {...p} />
            <button type="button" onClick={() => p.next && p.onNavigate(p.next)} disabled={!p.next} style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: p.next ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.12)', background: 'none', border: 'none', cursor: p.next ? 'pointer' : 'default' }}>下一部 →</button>
          </div>
        </motion.div>
      </div>
      {/* Правая орнаментальная полоса — снаружи блока */}
      <OrnamentStrip />
      {/* Правое облако */}
      <div className="flex-1 overflow-hidden relative pointer-events-none">
        <img src="/images/modal-bg.png" aria-hidden className="absolute inset-0 w-full h-full select-none" style={{ objectFit: 'cover', objectPosition: 'left center', transform: 'scaleX(-1)', opacity: 0.85 }} />
      </div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// ДИЗАЙН 2 — Горизонтальный: фото слева, видео+текст справа
// ══════════════════════════════════════════════════════════
function D2({ p }: { p: any }) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(2,6,20,0.97)', backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
      <motion.div className="w-full flex overflow-hidden" style={{ maxWidth: 940, maxHeight: '92vh', background: '#000000', borderRadius: 4, boxShadow: '0 0 0 1px rgba(212,168,83,0.2), 0 60px 120px rgba(0,0,0,0.98)' }}
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }} onClick={e => e.stopPropagation()}>
        {/* Левая колонка — фото упражнения */}
        <div className="flex-shrink-0 relative overflow-hidden" style={{ width: 220 }}>
          <Photo src={p.ex.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #000000)' }} />
          <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(5,13,26,0.95), transparent)' }}>
            <div style={{ fontFamily: '"STKaiti",serif', writingMode: 'vertical-rl', fontSize: 'clamp(1.2rem,2vw,1.8rem)', color: '#d4a853', letterSpacing: '0.15em', textShadow: '0 0 20px rgba(212,168,83,0.4)' }}>{p.t(p.ex.nameKey)}</div>
          </div>
        </div>
        {/* Правая колонка */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-4 pb-2" style={{ borderBottom: '1px solid rgba(212,168,83,0.1)' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(212,168,83,0.45)', letterSpacing: '0.25em', fontFamily: 'sans-serif' }}>第{p.zhNum}部 · {p.sectionZh}</div>
            <CloseBtn onClose={p.onClose} />
          </div>
          <div className="px-6 pt-3 flex-shrink-0"><Video /></div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(160,190,220,0.4)', padding: '8px 24px 4px', fontFamily: 'sans-serif' }}>{p.t(p.ex.labelKey)}</div>
          <div className="px-6 pb-3 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.12) transparent', minHeight: 0 }}>
            <Desc text={p.t(p.ex.descriptionKey)} size="0.78rem" />
          </div>
          <div className="flex items-center justify-between px-6 py-3" style={{ borderTop: '1px solid rgba(212,168,83,0.08)' }}>
            <button type="button" onClick={() => p.prev && p.onNavigate(p.prev)} disabled={!p.prev} style={{ fontSize: '0.6rem', color: p.prev ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.1)', background: 'none', border: 'none', cursor: p.prev ? 'pointer' : 'default' }}>← 上一部</button>
            <Dots {...p} />
            <button type="button" onClick={() => p.next && p.onNavigate(p.next)} disabled={!p.next} style={{ fontSize: '0.6rem', color: p.next ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.1)', background: 'none', border: 'none', cursor: p.next ? 'pointer' : 'default' }}>下一部 →</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// ДИЗАЙН 3 — Видео слева (60%), текст справа (40%), тёмный
// ══════════════════════════════════════════════════════════
function D3({ p }: { p: any }) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(0,4,12,0.97)', backdropFilter: 'blur(14px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
      <motion.div className="w-full flex flex-col overflow-hidden" style={{ maxWidth: 980, maxHeight: '92vh', background: '#000000', borderRadius: 2, boxShadow: '0 0 0 1px rgba(212,168,83,0.15), 0 60px 140px rgba(0,0,0,0.99)' }}
        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }} onClick={e => e.stopPropagation()}>
        {/* Шапка */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2" style={{ borderBottom: '1px solid rgba(212,168,83,0.08)' }}>
          <div style={{ fontFamily: '"STKaiti",serif', fontSize: 'clamp(1rem,2vw,1.4rem)', color: '#d4a853', textShadow: '0 0 16px rgba(212,168,83,0.4)' }}>第{p.zhNum}部 · {p.sectionZh}</div>
          <CloseBtn onClose={p.onClose} />
        </div>
        {/* Тело */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          {/* Видео — левые 60% */}
          <div className="flex flex-col flex-shrink-0" style={{ width: '60%' }}>
            <Video />
            <div className="flex-1 px-6 pt-3 pb-2">
              <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.2rem,2.5vw,1.9rem)', color: '#e8d090', letterSpacing: '0.18em' }}>{p.t(p.ex.nameKey)}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(160,190,220,0.38)', marginTop: 6, fontFamily: 'sans-serif' }}>{p.t(p.ex.labelKey)}</div>
            </div>
          </div>
          {/* Текст — правые 40% */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ borderLeft: '1px solid rgba(212,168,83,0.1)' }}>
            <div className="flex-1 overflow-y-auto px-5 pt-5 pb-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.12) transparent' }}>
              <Desc text={p.t(p.ex.descriptionKey)} size="0.76rem" />
            </div>
            {p.ex.image && (
              <div className="px-5 pb-4 flex-shrink-0">
                <Photo src={p.ex.image} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 3, opacity: 0.6 }} />
              </div>
            )}
          </div>
        </div>
        {/* Нав */}
        <div className="flex items-center justify-between px-6 py-3" style={{ borderTop: '1px solid rgba(212,168,83,0.07)' }}>
          <button type="button" onClick={() => p.prev && p.onNavigate(p.prev)} disabled={!p.prev} style={{ fontSize: '0.6rem', color: p.prev ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.1)', background: 'none', border: 'none', cursor: p.prev ? 'pointer' : 'default' }}>← 上一部</button>
          <Dots {...p} />
          <button type="button" onClick={() => p.next && p.onNavigate(p.next)} disabled={!p.next} style={{ fontSize: '0.6rem', color: p.next ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.1)', background: 'none', border: 'none', cursor: p.next ? 'pointer' : 'default' }}>下一部 →</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// ДИЗАЙН 4 — Фото фоном, видео поверх, текст внизу
// ══════════════════════════════════════════════════════════
function D4({ p }: { p: any }) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
      <motion.div className="w-full flex flex-col overflow-hidden relative" style={{ maxWidth: 820, maxHeight: '94vh', borderRadius: 4, background: '#000000', boxShadow: '0 0 0 1px rgba(180,100,255,0.2), 0 60px 120px rgba(0,0,0,0.99)' }}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }} onClick={e => e.stopPropagation()}>
        {/* Фото — фон верхней части */}
        {p.ex.image && (
          <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: 220 }}>
            <Photo src={p.ex.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, filter: 'blur(2px)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,6,14,0.3), rgba(8,6,14,0.98))' }} />
          </div>
        )}
        {/* Контент */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-start justify-between px-7 pt-4 pb-2">
            <div>
              <div style={{ fontFamily: '"STKaiti",serif', fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#C880F0', letterSpacing: '0.2em', textShadow: '0 0 30px rgba(160,60,220,0.5)' }}>{p.t(p.ex.nameKey)}</div>
              <div style={{ fontFamily: '"STKaiti",serif', fontSize: '0.75rem', color: 'rgba(160,80,220,0.45)', letterSpacing: '0.22em', marginTop: 4 }}>第{p.zhNum}部 · {p.sectionZh}</div>
            </div>
            <CloseBtn onClose={p.onClose} color="rgba(180,80,240,0.4)" />
          </div>
          <div style={{ height: 1, margin: '4px 28px 12px', background: 'linear-gradient(90deg, rgba(160,60,220,0.5), transparent)' }} />
          <div className="px-7 flex-shrink-0"><Video /></div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(160,80,220,0.38)', padding: '8px 28px 4px', fontFamily: 'sans-serif' }}>{p.t(p.ex.labelKey)}</div>
        </div>
        <div className="px-7 pb-3 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(160,60,220,0.15) transparent', minHeight: 0, position: 'relative', zIndex: 1 }}>
          <Desc text={p.t(p.ex.descriptionKey)} color="#7a6090" hc="#C880F0" sc="#a078c0" />
        </div>
        <div className="flex items-center justify-between px-7 py-3" style={{ borderTop: '1px solid rgba(160,60,220,0.1)', position: 'relative', zIndex: 1 }}>
          <button type="button" onClick={() => p.prev && p.onNavigate(p.prev)} disabled={!p.prev} style={{ fontSize: '0.6rem', color: p.prev ? 'rgba(180,80,240,0.5)' : 'rgba(180,80,240,0.1)', background: 'none', border: 'none', cursor: p.prev ? 'pointer' : 'default' }}>← 上一部</button>
          <Dots {...p} color="rgba(180,80,240,0.75)" />
          <button type="button" onClick={() => p.next && p.onNavigate(p.next)} disabled={!p.next} style={{ fontSize: '0.6rem', color: p.next ? 'rgba(180,80,240,0.5)' : 'rgba(180,80,240,0.1)', background: 'none', border: 'none', cursor: p.next ? 'pointer' : 'default' }}>下一部 →</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// ДИЗАЙН 5 — Классический свиток, сепия, узкий, фото справа
// ══════════════════════════════════════════════════════════
function D5({ p }: { p: any }) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(8,4,0,0.97)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
      <motion.div className="w-full flex flex-col overflow-hidden" style={{ maxWidth: 760, maxHeight: '94vh', background: '#000000', borderRadius: 3, boxShadow: '0 0 0 1px rgba(180,130,60,0.35), 0 0 0 5px rgba(180,130,60,0.06), 0 60px 120px rgba(0,0,0,0.99)' }}
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 250, damping: 28 }} onClick={e => e.stopPropagation()}>
        <div style={{ height: 3, background: 'linear-gradient(90deg,transparent,#b47830,#d4a853,#b47830,transparent)', flexShrink: 0 }} />
        <div className="flex items-center justify-between px-8 pt-3 pb-2">
          <div style={{ fontFamily: '"STKaiti",serif', fontSize: '0.7rem', color: 'rgba(180,130,60,0.5)', letterSpacing: '0.3em' }}>{p.sectionZh} · 第{p.zhNum}部</div>
          <CloseBtn onClose={p.onClose} color="rgba(180,130,60,0.35)" />
        </div>
        {/* Название центр */}
        <div className="text-center px-8 pb-3">
          <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.5rem,3vw,2.1rem)', color: '#E8C870', letterSpacing: '0.25em', textShadow: '0 2px 20px rgba(180,130,40,0.4)' }}>{p.t(p.ex.nameKey)}</div>
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(180,130,60,0.4),transparent)', margin: '8px 40px' }} />
          <div style={{ fontSize: '0.65rem', color: 'rgba(180,155,100,0.45)', fontFamily: 'sans-serif' }}>{p.t(p.ex.labelKey)}</div>
        </div>
        {/* Видео + фото рядом */}
        <div className="flex gap-3 px-8 mb-3 flex-shrink-0">
          <div className="flex-1"><Video /></div>
          {p.ex.image && (
            <div className="flex-shrink-0" style={{ width: 130 }}>
              <Photo src={p.ex.image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2, opacity: 0.7 }} />
            </div>
          )}
        </div>
        <div className="px-8 pb-3 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(180,130,60,0.2) transparent', minHeight: 0 }}>
          <Desc text={p.t(p.ex.descriptionKey)} color="#7a6a50" hc="#c8a050" sc="#a08060" />
        </div>
        <div style={{ height: 3, background: 'linear-gradient(90deg,transparent,#b47830,#d4a853,#b47830,transparent)', flexShrink: 0 }} />
        <div className="flex items-center justify-between px-8 py-3">
          <button type="button" onClick={() => p.prev && p.onNavigate(p.prev)} disabled={!p.prev} style={{ fontSize: '0.6rem', color: p.prev ? 'rgba(180,130,60,0.5)' : 'rgba(180,130,60,0.1)', background: 'none', border: 'none', cursor: p.prev ? 'pointer' : 'default' }}>← 上一部</button>
          <Dots {...p} color="rgba(180,130,60,0.75)" />
          <button type="button" onClick={() => p.next && p.onNavigate(p.next)} disabled={!p.next} style={{ fontSize: '0.6rem', color: p.next ? 'rgba(180,130,60,0.5)' : 'rgba(180,130,60,0.1)', background: 'none', border: 'none', cursor: p.next ? 'pointer' : 'default' }}>下一部 →</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// ДИЗАЙН 6 — Журнальный: видео справа (55%), текст слева (45%)
// ══════════════════════════════════════════════════════════
function D6({ p }: { p: any }) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(0,0,2,0.98)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
      <motion.div className="w-full flex overflow-hidden" style={{ maxWidth: 960, maxHeight: '92vh', background: '#000000', borderRadius: 0, boxShadow: '0 0 0 1px rgba(212,168,83,0.5), 0 60px 120px rgba(0,0,0,0.99)' }}
        initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.3 }} onClick={e => e.stopPropagation()}>
        {/* Левая — текст */}
        <div className="flex flex-col flex-shrink-0 overflow-hidden" style={{ width: '42%', borderRight: '4px solid #D4A853' }}>
          <div style={{ height: 4, background: '#D4A853', flexShrink: 0 }} />
          <div className="px-6 pt-5 flex-shrink-0">
            <div style={{ fontSize: '0.52rem', color: 'rgba(212,168,83,0.45)', letterSpacing: '0.4em', fontFamily: 'sans-serif', marginBottom: 6 }}>第{p.zhNum}部 · {p.sectionZh}</div>
            <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', color: '#D4A853', letterSpacing: '0.12em', lineHeight: 1.2, textShadow: '0 0 30px rgba(212,168,83,0.25)' }}>{p.t(p.ex.nameKey)}</div>
            <div style={{ width: 40, height: 3, background: '#D4A853', margin: '12px 0 8px' }} />
            <div style={{ fontSize: '0.62rem', color: 'rgba(212,168,83,0.38)', fontFamily: 'sans-serif', marginBottom: 14 }}>{p.t(p.ex.labelKey)}</div>
          </div>
          <div className="px-6 pb-3 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.15) transparent', minHeight: 0 }}>
            <Desc text={p.t(p.ex.descriptionKey)} color="#5a5040" hc="#D4A853" sc="#8a7850" size="0.76rem" />
          </div>
          {p.ex.image && (
            <div className="px-6 pb-4 flex-shrink-0">
              <Photo src={p.ex.image} style={{ width: '100%', height: 90, objectFit: 'cover', opacity: 0.5, borderRadius: 2 }} />
            </div>
          )}
          <div className="flex items-center justify-between px-6 pb-4 flex-shrink-0">
            <button type="button" onClick={() => p.prev && p.onNavigate(p.prev)} disabled={!p.prev} style={{ fontSize: '0.6rem', color: p.prev ? '#D4A853' : 'rgba(212,168,83,0.1)', background: 'none', border: 'none', cursor: p.prev ? 'pointer' : 'default' }}>← 上一部</button>
            <CloseBtn onClose={p.onClose} color="rgba(212,168,83,0.3)" />
            <button type="button" onClick={() => p.next && p.onNavigate(p.next)} disabled={!p.next} style={{ fontSize: '0.6rem', color: p.next ? '#D4A853' : 'rgba(212,168,83,0.1)', background: 'none', border: 'none', cursor: p.next ? 'pointer' : 'default' }}>下一部 →</button>
          </div>
        </div>
        {/* Правая — видео */}
        <div className="flex-1 flex items-center" style={{ background: '#000' }}>
          <Video />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// ДИЗАЙН 7 — Нефритовый: видео вверху полное, фото+текст внизу
// ══════════════════════════════════════════════════════════
function D7({ p }: { p: any }) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(1,8,4,0.97)', backdropFilter: 'blur(10px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
      <motion.div className="w-full flex flex-col overflow-hidden" style={{ maxWidth: 840, maxHeight: '94vh', background: '#000000', borderRadius: 3, boxShadow: '0 0 0 1px rgba(60,160,80,0.25), 0 60px 120px rgba(0,0,0,0.99)' }}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 270, damping: 28 }} onClick={e => e.stopPropagation()}>
        {/* Шапка */}
        <div className="flex items-center justify-between px-7 pt-3 pb-2">
          <div className="flex items-center gap-3">
            <div style={{ fontFamily: '"STKaiti",serif', fontSize: '1.4rem', color: '#6EC87A', textShadow: '0 0 20px rgba(60,180,80,0.5)' }}>第{p.zhNum}部</div>
            <div style={{ width: 1, height: 18, background: 'rgba(60,160,80,0.3)' }} />
            <div style={{ fontSize: '0.72rem', color: 'rgba(60,160,80,0.48)', letterSpacing: '0.22em', fontFamily: 'sans-serif' }}>{p.sectionZh}</div>
          </div>
          <CloseBtn onClose={p.onClose} color="rgba(60,160,80,0.35)" />
        </div>
        {/* Видео полная ширина */}
        <div className="px-0 flex-shrink-0"><Video /></div>
        {/* Нижняя часть: фото + текст */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          {p.ex.image && (
            <div className="flex-shrink-0 relative" style={{ width: 150 }}>
              <Photo src={p.ex.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(2,10,4,0.9))' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 px-2">
                <div style={{ fontFamily: '"STKaiti",serif', writingMode: 'vertical-rl', fontSize: '0.95rem', color: '#6EC87A', letterSpacing: '0.15em' }}>{p.t(p.ex.nameKey)}</div>
              </div>
            </div>
          )}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ borderLeft: '1px solid rgba(60,160,80,0.15)' }}>
            <div className="px-5 pt-4 flex-shrink-0">
              <div style={{ fontSize: '0.65rem', color: 'rgba(60,160,80,0.4)', fontFamily: 'sans-serif' }}>{p.t(p.ex.labelKey)}</div>
              <div style={{ height: 1, background: 'rgba(60,160,80,0.2)', margin: '8px 0' }} />
            </div>
            <div className="px-5 pb-3 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(60,160,80,0.12) transparent' }}>
              <Desc text={p.t(p.ex.descriptionKey)} color="#506050" hc="#6EC87A" sc="#80a880" size="0.76rem" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-7 py-3" style={{ borderTop: '1px solid rgba(60,160,80,0.1)' }}>
          <button type="button" onClick={() => p.prev && p.onNavigate(p.prev)} disabled={!p.prev} style={{ fontSize: '0.6rem', color: p.prev ? 'rgba(60,160,80,0.5)' : 'rgba(60,160,80,0.1)', background: 'none', border: 'none', cursor: p.prev ? 'pointer' : 'default' }}>← 上一部</button>
          <Dots {...p} color="rgba(60,180,80,0.75)" />
          <button type="button" onClick={() => p.next && p.onNavigate(p.next)} disabled={!p.next} style={{ fontSize: '0.6rem', color: p.next ? 'rgba(60,160,80,0.5)' : 'rgba(60,160,80,0.1)', background: 'none', border: 'none', cursor: p.next ? 'pointer' : 'default' }}>下一部 →</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// ДИЗАЙН 8 — Минимализм: тёмный, видео полное, текст снизу компактно, без панели
// ══════════════════════════════════════════════════════════
function D8({ p }: { p: any }) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(0,2,8,0.96)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
      <motion.div className="w-full flex flex-col" style={{ maxWidth: 760, maxHeight: '94vh' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: 'easeOut' }} onClick={e => e.stopPropagation()}>
        {/* Мета-строка */}
        <div className="flex items-center justify-between pb-3 px-1">
          <div style={{ fontSize: '0.6rem', color: 'rgba(212,168,83,0.35)', letterSpacing: '0.3em', fontFamily: 'sans-serif' }}>第{p.zhNum}部 · {p.sectionZh}</div>
          <CloseBtn onClose={p.onClose} color="rgba(212,168,83,0.28)" />
        </div>
        {/* Видео без фона */}
        <div style={{ borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}><Video /></div>
        {/* Название + лейбл */}
        <div className="flex items-end justify-between px-1 pt-4 pb-2 flex-shrink-0">
          <div>
            <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', color: '#e8d090', letterSpacing: '0.2em' }}>{p.t(p.ex.nameKey)}</div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(160,188,215,0.35)', fontFamily: 'sans-serif', marginTop: 4 }}>{p.t(p.ex.labelKey)}</div>
          </div>
          {p.ex.image && <Photo src={p.ex.image} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: '50%', opacity: 0.55, flexShrink: 0 }} />}
        </div>
        <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(212,168,83,0.25),transparent)', marginBottom: 10 }} />
        {/* Текст */}
        <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.12) transparent', minHeight: 0, paddingRight: 4 }}>
          <Desc text={p.t(p.ex.descriptionKey)} color="#6a7a8a" size="0.78rem" />
        </div>
        {/* Нав */}
        <div className="flex items-center justify-between pt-3 pb-1 px-1" style={{ borderTop: '1px solid rgba(212,168,83,0.08)', marginTop: 8 }}>
          <button type="button" onClick={() => p.prev && p.onNavigate(p.prev)} disabled={!p.prev} style={{ fontSize: '0.6rem', color: p.prev ? 'rgba(212,168,83,0.45)' : 'rgba(212,168,83,0.1)', background: 'none', border: 'none', cursor: p.prev ? 'pointer' : 'default' }}>← 上一部</button>
          <Dots {...p} />
          <button type="button" onClick={() => p.next && p.onNavigate(p.next)} disabled={!p.next} style={{ fontSize: '0.6rem', color: p.next ? 'rgba(212,168,83,0.45)' : 'rgba(212,168,83,0.1)', background: 'none', border: 'none', cursor: p.next ? 'pointer' : 'default' }}>下一部 →</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const DESIGNS = [D1, D2, D3, D4, D5, D6, D7, D8]

// ══════════════════════════════════════════════════════════
export default function ExerciseModal({ exercise, sectionKey, onClose, onNavigate }: Props) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!exercise) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [exercise, onClose])

  const exercises = sectionKey ? getExercisesBySection(sectionKey) : []
  const currentIndex = exercise ? exercises.findIndex(e => e.id === exercise.id) : -1
  const prev = currentIndex > 0 ? exercises[currentIndex - 1] : null
  const next = currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null
  const zhNum = exercise ? (ZH_NUM[exercise.id - 1] ?? exercise.id) : ''
  const sectionZh = sectionKey ? t(`sections.${sectionKey}.zh`) : ''

  const Design = exercise ? DESIGNS[(exercise.id - 1) % 8] : null

  return (
    <AnimatePresence>
      {exercise && Design && (
        <Design p={{ exercise: { ...exercise, video: DEMO_VIDEO }, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh, ex: { ...exercise, video: DEMO_VIDEO } }} />
      )}
    </AnimatePresence>
  )
}

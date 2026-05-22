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

function DescriptionText({ text, color = '#8fa0b4', headerColor = '#d4a853', stepColor = '#c8bfb0' }: {
  text: string, color?: string, headerColor?: string, stepColor?: string
}) {
  const lines = text.split('\n')
  return (
    <div className="flex flex-col gap-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 4 }} />
        const isStep = /^[①②③④⑤⑥⑦⑧]/.test(line)
        const isHeader = line.startsWith('步骤')
        const isChinese = /^[生长化收藏]/.test(line)
        return (
          <p key={i} className="font-sans" style={{
            fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)',
            color: isHeader ? headerColor : isChinese ? '#c8a96e' : isStep ? stepColor : color,
            lineHeight: 1.72, letterSpacing: isHeader ? '0.1em' : '0.02em',
            fontWeight: isHeader ? 600 : 400, paddingLeft: isStep ? '0.8em' : 0,
          }}>{line}</p>
        )
      })}
    </div>
  )
}

function NavBar({ prev, next, exercises, exercise, onNavigate, onClose, color = 'rgba(212,168,83,0.5)' }: any) {
  return (
    <div className="flex items-center justify-between px-6 py-3" style={{ borderTop: `1px solid ${color.replace('0.5', '0.1')}` }}>
      <button type="button" onClick={() => prev && onNavigate(prev)} disabled={!prev} className="font-sans"
        style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: prev ? color : color.replace('0.5','0.12'),
          background: 'none', border: 'none', cursor: prev ? 'pointer' : 'default', padding: '4px 0', transition: 'color 0.2s' }}
        onMouseEnter={e => { if (prev) e.currentTarget.style.color = color.replace('0.5','0.95') }}
        onMouseLeave={e => { if (prev) e.currentTarget.style.color = color }}>
        ← 上一式
      </button>
      <div className="flex gap-1.5 items-center">
        {exercises.map((ex: Exercise) => (
          <div key={ex.id} onClick={() => onNavigate(ex)} style={{
            width: ex.id === exercise.id ? 16 : 5, height: 5, borderRadius: 3,
            background: ex.id === exercise.id ? color.replace('0.5','0.8') : color.replace('0.5','0.18'),
            cursor: 'pointer', transition: 'all 0.3s',
          }} />
        ))}
      </div>
      <button type="button" onClick={() => next && onNavigate(next)} disabled={!next} className="font-sans"
        style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: next ? color : color.replace('0.5','0.12'),
          background: 'none', border: 'none', cursor: next ? 'pointer' : 'default', padding: '4px 0', transition: 'color 0.2s' }}
        onMouseEnter={e => { if (next) e.currentTarget.style.color = color.replace('0.5','0.95') }}
        onMouseLeave={e => { if (next) e.currentTarget.style.color = color }}>
        下一式 →
      </button>
    </div>
  )
}

function VideoBlock({ exercise, t }: { exercise: Exercise, t: any }) {
  if (!exercise.video && !exercise.image) return (
    <div className="w-full flex items-center justify-center" style={{ minHeight: 120, color: 'rgba(212,168,83,0.2)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>ВИДЕО БУДЕТ ДОБАВЛЕНО</div>
  )
  if (exercise.video?.endsWith('.mp4')) return (
    <video src={exercise.video} className="w-full block" style={{ display: 'block' }} controls autoPlay loop playsInline />
  )
  if (exercise.video) return (
    <iframe src={exercise.video} className="w-full" style={{ aspectRatio: '16/9', border: 'none' }} allowFullScreen title={t(exercise.nameKey)} />
  )
  return <img src={exercise.image} alt={t(exercise.nameKey)} className="w-full block" style={{ display: 'block' }} />
}

// ─────────────────────────────────────────────
// 8 ВАРИАНТОВ ДИЗАЙНА
// ─────────────────────────────────────────────

// ВАРИАНТ 1 — Вертикальный, облака по бокам, #06091B
function Design1({ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }: any) {
  return (
    <motion.div className="fixed inset-0 flex items-stretch justify-center" style={{ zIndex: 300, background: '#06091B', backdropFilter: 'blur(10px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose}>
      <div className="flex-1 overflow-hidden relative">
        <img src="/images/modal-bg.png" aria-hidden draggable={false} className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{ opacity: 0.85, objectFit: 'cover', objectPosition: 'right center' }} />
      </div>
      <div className="flex items-center justify-center flex-shrink-0 py-4" style={{ width: 'min(820px, 90vw)' }} onClick={onClose}>
        <motion.div className="relative w-full overflow-hidden flex flex-col" style={{ maxHeight: '94vh', borderRadius: 6, background: '#06091B', boxShadow: '0 50px 140px rgba(0,2,18,0.98)' }}
          initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-7 pt-4 pb-2">
            <div className="flex items-center gap-3">
              <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.1rem,2.2vw,1.5rem)', color: '#d4a853', textShadow: '0 0 20px rgba(212,168,83,0.5)' }}>第{zhNum}式</div>
              <div style={{ width: 1, height: 20, background: 'rgba(212,168,83,0.22)' }} />
              <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: '0.8rem', color: 'rgba(212,168,83,0.48)', letterSpacing: '0.2em' }}>{sectionZh}</div>
            </div>
            <button type="button" onClick={onClose} style={{ fontSize: '0.65rem', color: 'rgba(212,168,83,0.38)', letterSpacing: '0.22em', fontFamily: 'sans-serif', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.85)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.38)')}>✕ закрыть</button>
          </div>
          <div className="text-center px-7 pt-1 pb-3">
            <div style={{ fontFamily: '"STKaiti","KaiTi","Noto Serif SC",serif', fontSize: 'clamp(1.5rem,3.2vw,2.2rem)', color: '#e8d090', letterSpacing: '0.18em', textShadow: '0 0 32px rgba(212,168,83,0.35)' }}>{t(exercise.nameKey)}</div>
            <div className="font-sans mt-1.5" style={{ fontSize: '0.72rem', color: 'rgba(160,188,215,0.42)', letterSpacing: '0.05em' }}>{t(exercise.labelKey)}</div>
          </div>
          <div className="mx-7 mb-3" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.3) 25%, rgba(212,168,83,0.3) 75%, transparent)' }} />
          <div className="px-7 mb-3 flex-shrink-0"><VideoBlock exercise={exercise} t={t} /></div>
          <div className="px-7 pb-2 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.15) transparent', minHeight: 0 }}>
            <DescriptionText text={t(exercise.descriptionKey)} />
          </div>
          <NavBar {...{ prev, next, exercises, exercise, onNavigate, onClose }} />
        </motion.div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <img src="/images/modal-bg.png" aria-hidden draggable={false} className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{ opacity: 0.85, objectFit: 'cover', objectPosition: 'left center', transform: 'scaleX(-1)' }} />
      </div>
    </motion.div>
  )
}

// ВАРИАНТ 2 — Горизонтальный сплит: видео слева, текст справа, индиго акцент
function Design2({ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }: any) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(3,6,22,0.96)', backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose}>
      <motion.div className="relative w-full flex flex-col overflow-hidden" style={{ maxWidth: 900, maxHeight: '92vh', background: '#050D1F', borderRadius: 2, boxShadow: '0 0 0 1px rgba(80,120,200,0.25), 0 40px 100px rgba(0,0,30,0.95)' }}
        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }} onClick={e => e.stopPropagation()}>
        {/* Шапка */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(80,120,200,0.2)' }}>
          <div className="flex items-center gap-4">
            <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: '1.6rem', color: '#7BA7E8', textShadow: '0 0 30px rgba(100,150,240,0.6)' }}>第{zhNum}式</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(100,140,200,0.5)', letterSpacing: '0.25em', fontFamily: 'sans-serif' }}>{sectionZh}</div>
          </div>
          <button type="button" onClick={onClose} style={{ fontSize: '0.62rem', color: 'rgba(100,140,200,0.4)', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#7BA7E8')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(100,140,200,0.4)')}>✕ закрыть</button>
        </div>
        {/* Тело: горизонтальный сплит */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          {/* Видео — левая половина */}
          <div className="flex-shrink-0 flex flex-col justify-center" style={{ width: '48%', background: '#020810', padding: '20px' }}>
            <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', color: '#B8D0F0', letterSpacing: '0.14em', marginBottom: 12 }}>{t(exercise.nameKey)}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(130,165,220,0.5)', letterSpacing: '0.04em', marginBottom: 16, fontFamily: 'sans-serif' }}>{t(exercise.labelKey)}</div>
            <div style={{ borderTop: '1px solid rgba(80,120,200,0.25)', marginBottom: 16 }} />
            <VideoBlock exercise={exercise} t={t} />
          </div>
          {/* Текст — правая половина */}
          <div className="flex-1 overflow-y-auto px-6 py-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(80,120,200,0.2) transparent', borderLeft: '1px solid rgba(80,120,200,0.15)' }}>
            <DescriptionText text={t(exercise.descriptionKey)} color="#7a9ab8" headerColor="#7BA7E8" stepColor="#a8c0e0" />
          </div>
        </div>
        <NavBar {...{ prev, next, exercises, exercise, onNavigate, onClose }} color="rgba(100,140,200,0.5)" />
      </motion.div>
    </motion.div>
  )
}

// ВАРИАНТ 3 — Кинематографический: огромная цифра на фоне, тёмно-бирюзовый
function Design3({ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }: any) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(0,8,14,0.97)', backdropFilter: 'blur(14px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex flex-col overflow-hidden" style={{ maxWidth: 860, maxHeight: '92vh', background: 'linear-gradient(135deg, #041418 0%, #020D10 100%)', borderRadius: 0, boxShadow: '0 0 0 1px rgba(0,180,160,0.2), 0 60px 120px rgba(0,0,0,0.98)' }}
        initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.93 }}
        transition={{ duration: 0.35, ease: 'easeOut' }} onClick={e => e.stopPropagation()}>
        {/* Большая фоновая цифра */}
        <div className="absolute pointer-events-none select-none" style={{ fontFamily: '"STKaiti",serif', fontSize: 'clamp(14rem,22vw,20rem)', color: 'rgba(0,180,160,0.04)', lineHeight: 1, top: -20, right: 20, zIndex: 0 }}>{zhNum}</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-center justify-between px-8 pt-5 pb-2">
            <div style={{ fontSize: '0.6rem', color: 'rgba(0,180,160,0.5)', letterSpacing: '0.35em', fontFamily: 'sans-serif' }}>第{zhNum}式 · {sectionZh}</div>
            <button type="button" onClick={onClose} style={{ fontSize: '0.6rem', color: 'rgba(0,180,160,0.35)', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,200,180,0.85)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,180,160,0.35)')}>✕ закрыть</button>
          </div>
          <div className="px-8 pb-4">
            <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', color: '#a0e8e0', letterSpacing: '0.2em', textShadow: '0 0 40px rgba(0,200,180,0.3)' }}>{t(exercise.nameKey)}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(100,200,185,0.4)', fontFamily: 'sans-serif', marginTop: 6 }}>{t(exercise.labelKey)}</div>
          </div>
          <div className="px-8 mb-4 flex-shrink-0"><VideoBlock exercise={exercise} t={t} /></div>
          <div className="px-8 pb-2 overflow-y-auto" style={{ maxHeight: '28vh', scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,180,160,0.15) transparent' }}>
            <DescriptionText text={t(exercise.descriptionKey)} color="#607a78" headerColor="#00b4a0" stepColor="#80bab6" />
          </div>
          <NavBar {...{ prev, next, exercises, exercise, onNavigate, onClose }} color="rgba(0,180,160,0.5)" />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ВАРИАНТ 4 — Классический свиток: тёплые тона, сепия, узкий
function Design4({ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }: any) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(8,4,2,0.96)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex flex-col overflow-hidden" style={{ maxWidth: 680, maxHeight: '94vh', background: 'linear-gradient(180deg, #100C04 0%, #0C0801 100%)', borderRadius: 2, boxShadow: '0 0 0 1px rgba(180,130,60,0.3), 0 0 0 4px rgba(180,130,60,0.08), 0 50px 120px rgba(0,0,0,0.98)' }}
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }} onClick={e => e.stopPropagation()}>
        {/* Верхний орнамент */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #b47830, #d4a853, #b47830, transparent)' }} />
        <div className="flex items-center justify-between px-8 pt-4 pb-2">
          <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: '0.75rem', color: 'rgba(180,130,60,0.55)', letterSpacing: '0.3em' }}>{sectionZh} · 第{zhNum}式</div>
          <button type="button" onClick={onClose} style={{ fontSize: '0.6rem', color: 'rgba(180,130,60,0.35)', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.85)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(180,130,60,0.35)')}>✕</button>
        </div>
        <div className="text-center px-8 pb-4">
          <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#E8C87A', letterSpacing: '0.25em', textShadow: '0 2px 20px rgba(180,130,40,0.4)' }}>{t(exercise.nameKey)}</div>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(180,130,60,0.4), transparent)', margin: '10px 40px' }} />
          <div style={{ fontSize: '0.68rem', color: 'rgba(180,155,100,0.5)', fontFamily: 'sans-serif', letterSpacing: '0.05em' }}>{t(exercise.labelKey)}</div>
        </div>
        <div className="px-8 mb-4"><VideoBlock exercise={exercise} t={t} /></div>
        <div className="px-8 pb-3 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(180,130,60,0.2) transparent', minHeight: 0 }}>
          <DescriptionText text={t(exercise.descriptionKey)} color="#8a7a60" headerColor="#c8a050" stepColor="#a89070" />
        </div>
        <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #b47830, #d4a853, #b47830, transparent)' }} />
        <NavBar {...{ prev, next, exercises, exercise, onNavigate, onClose }} color="rgba(180,130,60,0.5)" />
      </motion.div>
    </motion.div>
  )
}

// ВАРИАНТ 5 — Драматический: глубокий пурпур, вертикальные иероглифы сбоку
function Design5({ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }: any) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(10,2,18,0.97)', backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex overflow-hidden" style={{ maxWidth: 900, maxHeight: '92vh', background: '#0A0212', borderRadius: 4, boxShadow: '0 0 0 1px rgba(160,80,220,0.25), 0 0 80px rgba(120,40,200,0.15), 0 60px 120px rgba(0,0,0,0.98)' }}
        initial={{ opacity: 0, rotateY: -8 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -8 }}
        transition={{ type: 'spring', stiffness: 240, damping: 30 }} onClick={e => e.stopPropagation()}>
        {/* Левая вертикальная панель с иероглифами */}
        <div className="flex-shrink-0 flex flex-col items-center justify-between py-8" style={{ width: 52, background: 'rgba(120,40,200,0.08)', borderRight: '1px solid rgba(160,80,220,0.18)' }}>
          <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: '1.1rem', color: 'rgba(160,80,220,0.6)', writingMode: 'vertical-rl', letterSpacing: '0.2em', textShadow: '0 0 20px rgba(160,80,220,0.4)' }}>{sectionZh}</div>
          <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: '1.4rem', color: 'rgba(160,80,220,0.35)', writingMode: 'vertical-rl' }}>第{zhNum}式</div>
        </div>
        {/* Основной контент */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#C880F0', textShadow: '0 0 30px rgba(160,80,220,0.5)', letterSpacing: '0.15em' }}>{t(exercise.nameKey)}</div>
            <button type="button" onClick={onClose} style={{ fontSize: '0.62rem', color: 'rgba(160,80,220,0.38)', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(200,128,240,0.85)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(160,80,220,0.38)')}>✕ закрыть</button>
          </div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(160,80,220,0.38)', fontFamily: 'sans-serif', padding: '0 24px 12px', letterSpacing: '0.04em' }}>{t(exercise.labelKey)}</div>
          <div style={{ height: 1, margin: '0 24px 16px', background: 'linear-gradient(90deg, rgba(160,80,220,0.4), transparent)' }} />
          <div className="px-6 mb-4 flex-shrink-0"><VideoBlock exercise={exercise} t={t} /></div>
          <div className="px-6 pb-3 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(160,80,220,0.15) transparent', minHeight: 0 }}>
            <DescriptionText text={t(exercise.descriptionKey)} color="#7a6888" headerColor="#C880F0" stepColor="#a080c0" />
          </div>
          <NavBar {...{ prev, next, exercises, exercise, onNavigate, onClose }} color="rgba(160,80,220,0.5)" />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ВАРИАНТ 6 — Минималист: нет фона панели, только контент парит
function Design6({ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }: any) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(0,3,10,0.94)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex flex-col" style={{ maxWidth: 780, maxHeight: '92vh' }}
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.4, ease: 'easeOut' }} onClick={e => e.stopPropagation()}>
        {/* Шапка без фона */}
        <div className="flex items-center justify-between px-2 pb-4">
          <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: '0.7rem', color: 'rgba(212,168,83,0.4)', letterSpacing: '0.3em' }}>第{zhNum}式 · {sectionZh}</div>
          <button type="button" onClick={onClose} style={{ fontSize: '0.6rem', color: 'rgba(212,168,83,0.3)', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.8)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.3)')}>✕ закрыть</button>
        </div>
        {/* Видео полное */}
        <div style={{ borderRadius: 3, overflow: 'hidden' }}><VideoBlock exercise={exercise} t={t} /></div>
        {/* Название под видео */}
        <div className="text-center py-4">
          <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#e8d090', letterSpacing: '0.2em' }}>{t(exercise.nameKey)}</div>
          <div style={{ fontSize: '0.62rem', color: 'rgba(160,188,215,0.38)', fontFamily: 'sans-serif', marginTop: 6 }}>{t(exercise.labelKey)}</div>
        </div>
        {/* Текст */}
        <div className="overflow-y-auto" style={{ maxHeight: '28vh', scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.15) transparent' }}>
          <DescriptionText text={t(exercise.descriptionKey)} />
        </div>
        <NavBar {...{ prev, next, exercises, exercise, onNavigate, onClose }} />
      </motion.div>
    </motion.div>
  )
}

// ВАРИАНТ 7 — Нефритовый: зелёный акцент, бамбуковые линии
function Design7({ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }: any) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(1,8,4,0.97)', backdropFilter: 'blur(10px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex flex-col overflow-hidden" style={{ maxWidth: 860, maxHeight: '92vh', background: 'linear-gradient(160deg, #040F07 0%, #020A04 100%)', borderRadius: 3, boxShadow: '0 0 0 1px rgba(60,160,80,0.22), 0 60px 120px rgba(0,0,0,0.98)' }}
        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }} onClick={e => e.stopPropagation()}>
        {/* Бамбуковые вертикальные линии */}
        {[15, 30, 70, 85].map(p => (
          <div key={p} className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${p}%`, width: 1, background: `rgba(60,160,80,${p === 50 ? 0.1 : 0.04})`, zIndex: 0 }} />
        ))}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-center justify-between px-7 pt-4 pb-2">
            <div className="flex items-center gap-3">
              <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: '1.5rem', color: '#6EC87A', textShadow: '0 0 24px rgba(60,180,80,0.5)' }}>第{zhNum}式</div>
              <div style={{ width: 1, height: 20, background: 'rgba(60,160,80,0.3)' }} />
              <div style={{ fontSize: '0.75rem', color: 'rgba(60,160,80,0.5)', letterSpacing: '0.22em', fontFamily: 'sans-serif' }}>{sectionZh}</div>
            </div>
            <button type="button" onClick={onClose} style={{ fontSize: '0.62rem', color: 'rgba(60,160,80,0.35)', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#6EC87A')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(60,160,80,0.35)')}>✕ закрыть</button>
          </div>
          <div className="px-7 pb-3">
            <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.4rem,3vw,2.1rem)', color: '#A8DFB0', letterSpacing: '0.16em', textShadow: '0 0 28px rgba(60,180,80,0.3)' }}>{t(exercise.nameKey)}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(80,160,90,0.45)', fontFamily: 'sans-serif', marginTop: 5 }}>{t(exercise.labelKey)}</div>
          </div>
          <div style={{ height: 1, margin: '0 28px 16px', background: 'linear-gradient(90deg, transparent, rgba(60,160,80,0.35), transparent)' }} />
          <div className="px-7 mb-4 flex-shrink-0"><VideoBlock exercise={exercise} t={t} /></div>
          <div className="px-7 pb-3 overflow-y-auto" style={{ maxHeight: '30vh', scrollbarWidth: 'thin', scrollbarColor: 'rgba(60,160,80,0.15) transparent' }}>
            <DescriptionText text={t(exercise.descriptionKey)} color="#607864" headerColor="#6EC87A" stepColor="#88b890" />
          </div>
          <NavBar {...{ prev, next, exercises, exercise, onNavigate, onClose }} color="rgba(60,160,80,0.5)" />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ВАРИАНТ 8 — Журнальный: крупная типографика, золото на чёрном, асимметрия
function Design8({ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }: any) {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 300, background: 'rgba(0,0,2,0.98)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex flex-col overflow-hidden" style={{ maxWidth: 920, maxHeight: '94vh', background: '#000002', borderRadius: 0, boxShadow: '0 0 0 1px rgba(212,168,83,0.5), 0 60px 120px rgba(0,0,0,0.99)' }}
        initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.3, ease: 'easeOut' }} onClick={e => e.stopPropagation()}>
        {/* Золотая полоса сверху */}
        <div style={{ height: 4, background: '#D4A853', flexShrink: 0 }} />
        <div className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
          {/* Видео слева — широкое */}
          <div className="flex-shrink-0" style={{ width: '55%', background: '#000' }}>
            <VideoBlock exercise={exercise} t={t} />
          </div>
          {/* Правая панель */}
          <div className="flex-1 flex flex-col" style={{ background: '#000002', borderLeft: '4px solid #D4A853' }}>
            <div className="px-6 pt-6 pb-4 flex-shrink-0">
              <div style={{ fontSize: '0.55rem', color: 'rgba(212,168,83,0.5)', letterSpacing: '0.4em', fontFamily: 'sans-serif', marginBottom: 8 }}>第{zhNum}式 · {sectionZh}</div>
              <div style={{ fontFamily: '"STKaiti","KaiTi",serif', fontSize: 'clamp(1.4rem,2.6vw,2rem)', color: '#D4A853', letterSpacing: '0.12em', lineHeight: 1.2, textShadow: '0 0 40px rgba(212,168,83,0.3)' }}>{t(exercise.nameKey)}</div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(212,168,83,0.4)', fontFamily: 'sans-serif', marginTop: 8, letterSpacing: '0.04em' }}>{t(exercise.labelKey)}</div>
              <div style={{ width: 40, height: 3, background: '#D4A853', marginTop: 16 }} />
            </div>
            <div className="px-6 pb-4 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.2) transparent', minHeight: 0 }}>
              <DescriptionText text={t(exercise.descriptionKey)} color="#5a5040" headerColor="#D4A853" stepColor="#8a7850" />
            </div>
            <div className="px-6 pb-4 flex-shrink-0 flex items-center justify-between">
              <button type="button" onClick={() => prev && onNavigate(prev)} disabled={!prev} style={{ fontSize: '0.62rem', color: prev ? 'rgba(212,168,83,0.55)' : 'rgba(212,168,83,0.12)', background: 'none', border: 'none', cursor: prev ? 'pointer' : 'default', letterSpacing: '0.18em', transition: 'color 0.2s' }}
                onMouseEnter={e => { if (prev) e.currentTarget.style.color = '#D4A853' }} onMouseLeave={e => { if (prev) e.currentTarget.style.color = 'rgba(212,168,83,0.55)' }}>← 上一式</button>
              <button type="button" onClick={onClose} style={{ fontSize: '0.55rem', color: 'rgba(212,168,83,0.3)', letterSpacing: '0.25em', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4A853')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,168,83,0.3)')}>✕</button>
              <button type="button" onClick={() => next && onNavigate(next)} disabled={!next} style={{ fontSize: '0.62rem', color: next ? 'rgba(212,168,83,0.55)' : 'rgba(212,168,83,0.12)', background: 'none', border: 'none', cursor: next ? 'pointer' : 'default', letterSpacing: '0.18em', transition: 'color 0.2s' }}
                onMouseEnter={e => { if (next) e.currentTarget.style.color = '#D4A853' }} onMouseLeave={e => { if (next) e.currentTarget.style.color = 'rgba(212,168,83,0.55)' }}>下一式 →</button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const DESIGNS = [Design1, Design2, Design3, Design4, Design5, Design6, Design7, Design8]

// ─────────────────────────────────────────────
// ГЛАВНЫЙ КОМПОНЕНТ
// ─────────────────────────────────────────────
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

  const DesignComponent = exercise ? DESIGNS[(exercise.id - 1) % 8] : null

  return (
    <AnimatePresence>
      {exercise && DesignComponent && (
        <DesignComponent {...{ exercise, exercises, prev, next, onClose, onNavigate, t, zhNum, sectionZh }} />
      )}
    </AnimatePresence>
  )
}

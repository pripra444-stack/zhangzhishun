// src/components/BiographyScroll.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const PLACEHOLDER_PARAGRAPHS = [
  'Чжан Чжи Шунь родился в 1912 году в провинции Хэнань. С ранних лет постигал даосские практики под руководством наставников священной горы Уданшань. Прошёл путь от послушника до настоятеля монастыря, посвятив всю жизнь сохранению и передаче древних техник цигун.',
  'Написал трактат «炁體源流» — «Источник и течение первозданной ци», в котором изложил суть тысячелетних практик здоровья и долголетия. Его учение о движении, дыхании и осознанности получило распространение по всему миру.',
  'Мастер Чжан прожил более 120 лет, практикуя ежедневно до последних дней жизни. Его комплексы упражнений 金刚功 и 长寿功 сегодня выполняют миллионы людей в десятках стран мира.',
]

export default function BiographyScroll() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <section className="py-12 px-4 flex flex-col items-center bg-bg-deep">

      {/* ── Свиток — кликабельный ── */}
      <motion.div
        className="relative cursor-pointer select-none"
        style={{ width: 'min(820px, 92vw)' }}
        whileHover={{ scale: 1.015, filter: 'drop-shadow(0 16px 48px #d4a85355)' }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        onClick={() => setOpen(o => !o)}
        onPointerEnter={e => { if (e.pointerType === 'mouse') setOpen(true) }}
        onPointerLeave={e => { if (e.pointerType === 'mouse') setOpen(false) }}
        title={t('bio.hint')}
      >
        {/* Картинка свитка */}
        <img
          src="/images/scroll.png"
          alt="Биография мастера"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 8px 32px #d4a85322)' }}
          draggable={false}
        />

        {/* Надпись по центру тела свитка */}
        <div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{ top: '18%', bottom: '38%', left: '12%', right: '12%' }}
        >
          <span
            className="text-center font-sans font-semibold text-[#e8d5a0] tracking-widest"
            style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)',
              textShadow: '0 1px 8px #00000088, 0 0 24px #d4a85344',
              letterSpacing: '0.14em',
            }}
          >
            {t('bio.title')}
          </span>
        </div>

        {/* Индикатор «наведи/нажми» */}
        <AnimatePresence>
          {!open && (
            <motion.div
              className="absolute bottom-[10%] left-0 right-0 flex justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-sans text-[#d4c09088] tracking-[0.2em]" style={{ fontSize: '0.6rem' }}>
                {t('bio.hint')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Раскрывающийся текст биографии ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{ width: 'min(820px, 92vw)', overflow: 'hidden' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="px-10 py-8"
              style={{
                background: 'linear-gradient(180deg, #f2e0b0 0%, #e8cc8a 50%, #f0ddb8 100%)',
                color: '#2a1a05',
                boxShadow: '0 16px 48px #d4a85333, inset 0 1px 0 #c9a06055',
                borderBottom: '2px solid #c9a060',
              }}
            >
              {PLACEHOLDER_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-justify leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.82rem, 1.6vw, 0.95rem)',
                    lineHeight: '1.95',
                    marginBottom: i < PLACEHOLDER_PARAGRAPHS.length - 1 ? '1.2rem' : 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

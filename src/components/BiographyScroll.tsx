// src/components/BiographyScroll.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const PLACEHOLDER = `Чжан Чжи Шунь родился в 1912 году в провинции Хэнань. С ранних лет постигал даосские практики под руководством наставников священной горы Уданшань. Прошёл путь от послушника до настоятеля монастыря, посвятив всю жизнь сохранению и передаче древних техник цигун.

Написал трактат «炁體源流» — «Источник и течение первозданной ци», в котором изложил суть тысячелетних практик здоровья и долголетия. Его учение о движении, дыхании и осознанности получило распространение по всему миру.

Мастер Чжан прожил более 120 лет, практикуя ежедневно до последних дней жизни. Его комплексы упражнений 金刚功 и 长寿功 сегодня выполняют миллионы людей в десятках стран.`

export default function BiographyScroll() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <section className="py-12 px-4 flex flex-col items-center bg-bg-deep">

      {/* ── Свиток-изображение ── */}
      <div
        className="relative select-none"
        style={{ width: 'min(820px, 92vw)' }}
      >
        {/* Картинка свитка */}
        <img
          src="/images/scroll.png"
          alt=""
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 12px 40px #d4a85333)' }}
        />

        {/* Надпись строго по центру тела свитка (без кистей по бокам и без кисточки) */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            /* тело свитка примерно 10%-90% по ширине, 15%-65% по высоте */
            top: '15%', bottom: '35%',
            left: '10%', right: '10%',
          }}
        >
          <span
            className="text-center font-sans font-semibold text-[#e8d5a0]"
            style={{
              fontSize: 'clamp(1rem, 2.8vw, 1.4rem)',
              letterSpacing: '0.12em',
              textShadow: '0 1px 6px #00000099, 0 0 20px #d4a85355',
            }}
          >
            {t('bio.title')}
          </span>
        </div>
      </div>

      {/* ── Плашка-кнопка под свитком ── */}
      <motion.button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="relative mt-[-2%] flex items-center justify-center gap-3 cursor-pointer"
        style={{
          width: 'min(520px, 75vw)',
          padding: '14px 32px',
          background: 'linear-gradient(135deg, #0d1525 0%, #162035 50%, #0d1525 100%)',
          border: '1px solid #d4a85344',
          borderTop: '1px solid #d4a85366',
          borderRadius: '0 0 6px 6px',
          boxShadow: '0 8px 32px #00000066, inset 0 1px 0 #d4a85322, 0 0 20px #d4a85311',
        }}
        whileHover={{ borderColor: '#d4a85388' }}
        transition={{ duration: 0.2 }}
      >
        {/* Золотые декоративные линии по бокам */}
        <span style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #d4a85355)' }} />
        <span
          className="font-sans text-[#d4c090] tracking-[0.25em] uppercase whitespace-nowrap"
          style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}
        >
          {open ? '— свернуть —' : '— читать биографию —'}
        </span>
        <span style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #d4a85355)' }} />
      </motion.button>

      {/* ── Раскрывающийся текст ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{ width: 'min(820px, 92vw)', overflow: 'hidden' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="px-10 py-8"
              style={{
                background: 'linear-gradient(180deg, #f2e0b0 0%, #e8cc8a 40%, #f0ddb8 100%)',
                borderRadius: '0 0 8px 8px',
                color: '#2a1a05',
                boxShadow: '0 16px 48px #d4a85333',
                borderLeft: '1px solid #c9a06066',
                borderRight: '1px solid #c9a06066',
                borderBottom: '1px solid #c9a06066',
              }}
            >
              {PLACEHOLDER.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-justify leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.82rem, 1.6vw, 0.95rem)',
                    lineHeight: '1.95',
                    marginBottom: i < 2 ? '1.2rem' : 0,
                    color: '#2a1a05',
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

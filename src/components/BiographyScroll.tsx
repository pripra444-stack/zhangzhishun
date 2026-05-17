// src/components/BiographyScroll.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const PLACEHOLDER_PARAGRAPHS = [
  'Чжан Чжи Шунь родился в 1912 году в провинции Хэнань. С ранних лет постигал даосские практики под руководством наставников священной горы Уданшань. Прошёл путь от послушника до настоятеля монастыря, посвятив всю жизнь сохранению и передаче древних техник цигун.',
  'Написал трактат «炁體源流» — «Источник и течение первозданной ци», в котором изложил суть тысячелетних практик здоровья и долголетия. Его учение о движении, дыхании и осознанности получило распространение по всему миру.',
  'Мастер Чжан прожил более 120 лет, практикуя ежедневно до последних дней жизни. Его комплексы упражнений 金刚功 и 长寿功 сегодня выполняют миллионы людей в десятках стран мира.',
]

const EASE = [0.25, 0.1, 0.25, 1] as const

export default function BiographyScroll() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <section className="pt-20 pb-16 px-4 flex flex-col items-center bg-bg-deep">
      <div style={{ width: 'min(820px, 92vw)' }}>

        {/* ── Закрытый свиток ── */}
        <motion.div
          animate={{
            height: open ? 0 : 'auto',
            opacity: open ? 0 : 1,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ overflow: 'hidden' }}
        >
          <motion.div
            className="relative cursor-pointer select-none"
            whileHover={{ scale: 1.012, filter: 'drop-shadow(0 16px 48px #d4a85355)' }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            onClick={() => setOpen(true)}
          >
            <img
              src="/images/scroll.png"
              alt="Биография мастера"
              className="w-full h-auto"
              style={{ filter: 'drop-shadow(0 8px 32px #d4a85322)' }}
              draggable={false}
            />
            <div
              className="absolute flex items-center justify-center pointer-events-none"
              style={{ top: '18%', bottom: '38%', left: '12%', right: '12%' }}
            >
              <span
                className="text-center font-sans font-semibold text-[#e8d5a0]"
                style={{
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)',
                  textShadow: '0 1px 8px #00000088, 0 0 24px #d4a85344',
                  letterSpacing: '0.14em',
                }}
              >
                {t('bio.title')}
              </span>
            </div>
            <motion.div
              className="absolute bottom-[10%] left-0 right-0 flex justify-center pointer-events-none"
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-sans text-[#d4c09088] tracking-[0.2em]" style={{ fontSize: '0.6rem' }}>
                {t('bio.hint')}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Открытый свиток ── */}
        <motion.div
          animate={{
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ overflow: 'hidden' }}
        >
          {/* Компенсация: закрытый свиток имеет 28.4% прозрачного верха, открытый — 2.7%.
               Разница = (0.284×0.667 − 0.027×1.5) × ширина ≈ 14.9% ширины контейнера */}
          <div style={{ paddingTop: '14.9%' }}>
          <motion.div
            className="relative cursor-pointer select-none"
            animate={{ scaleY: open ? 1 : 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ transformOrigin: 'top center' }}
            onClick={() => setOpen(false)}
            title="нажми чтобы свернуть"
          >
            <img
              src="/images/scroll-open-v.png.png"
              alt="Свиток открыт"
              className="w-full h-auto"
              style={{ filter: 'drop-shadow(0 12px 48px #00000077)' }}
              draggable={false}
            />

            {/* Текст поверх пергамента */}
            <motion.div
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ delay: open ? 0.45 : 0, duration: 0.4 }}
              className="absolute flex flex-col"
              style={{
                top: '17%',
                bottom: '13%',
                left: '22%',
                right: '22%',
                overflow: 'hidden',
                padding: '0 8px',
              }}
            >
              {PLACEHOLDER_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-justify"
                  style={{
                    fontSize: 'clamp(0.68rem, 1.3vw, 0.84rem)',
                    lineHeight: '1.9',
                    color: '#2a1505',
                    marginBottom: i < PLACEHOLDER_PARAGRAPHS.length - 1 ? '0.85rem' : 0,
                  }}
                >
                  {para}
                </p>
              ))}
              <p
                className="text-center font-sans mt-5 opacity-40"
                style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: '#6b4a10' }}
              >
                ✕ нажми чтобы свернуть
              </p>
            </motion.div>
          </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// src/components/BiographyScroll.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const PLACEHOLDER_PARAGRAPHS = [
  'Чжан Чжишун (1912–2015) — китайский даосский мастер школы Цюаньчжэнь Лунмэнь, известный под даосским именем Ми Цзинцзы (米静子). Он считался «земным бессмертным» (地仙), прожил 104 года и был почитаем как хранитель традиции внутренней алхимии и цигун в XX веке.',
  'Чжан Чжишун родился в крестьянской семье в уезде Шэньцю, провинция Хэнань. В семнадцать лет он встретил своего наставника — Лю Минцана, ученика 20-го поколения школы Лунмэнь — в монастыре на горе Хуашань. Много лет выполнял самую тяжёлую работу в обители, одновременно осваивая практику внутреннего взращивания ци и медитацию.',
  'После основания КНР мастер поселился в горах Чжуннаньшань, где провёл около семидесяти лет в уединённой практике. Считалось, что во время отшельничества его «охранял тигр». Позднее он вернулся к людям: руководил восстановлением храмов, преподавал методы цигун и врачевания, бесплатно лечил бедных.',
  'Чжан Чжишун преподавал комплексы «Цзинган-гун» (金剛功) и «Чаншоу-гун» (長壽功). Его философия подчёркивала единство Неба и человека, баланс инь-ян и целительное воздействие цигун. В наставлениях он призывал к «ясному сердцу и малым желаниям» (清心寡欲), видя в нравственности основу истинного долголетия.',
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
          {/* Компенсация: закрытый свиток имеет 28.4% прозрачного верха, открытый — 2.3%.
               Разница = (0.284×0.667 − 0.023×1.5) × ширина ≈ 15.5% ширины контейнера */}
          <div style={{ paddingTop: '15.5%' }}>
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

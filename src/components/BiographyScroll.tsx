// src/components/BiographyScroll.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const EASE = [0.25, 0.1, 0.25, 1] as const

const S: React.CSSProperties = {
  fontSize: 'clamp(10px, 1.6vw, 13px)',
  lineHeight: '2.28',
  color: '#2a1505',
  textAlign: 'justify' as const,
}

const H: React.CSSProperties = {
  fontSize: 'clamp(10px, 1.6vw, 13px)',
  fontWeight: 700,
  color: '#4a1e04',
  lineHeight: '2.28',
  marginTop: '0.3em',
  marginBottom: '0em',
}

export default function BiographyScroll() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <section className="pt-20 pb-16 px-4 flex flex-col items-center bg-bg-deep">
      <div style={{ width: 'min(820px, 92vw)' }}>

        {/* ── Закрытый свиток ── */}
        <motion.div
          animate={{ height: open ? 0 : 'auto', opacity: open ? 0 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ overflow: 'hidden' }}
        >
          <motion.div
            className="relative cursor-pointer select-none"
            whileHover={{ scale: 1.008 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            onClick={() => setOpen(true)}
          >
            <img
              src="/images/scroll.png"
              alt="Биография мастера"
              className="w-full h-auto"
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
                  textShadow: '0 1px 8px #00000088',
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
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ overflow: 'hidden' }}
        >
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
                className="absolute flex flex-col font-sans"
                style={{
                  top: '15%',
                  bottom: '9%',
                  left: '18%',
                  right: '18%',
                  overflow: 'hidden',
                  padding: '0 4px',
                }}
              >
                {/* Вступление */}
                <p style={S}>
                  <strong>Чжан Чжишун</strong> (1912–2015) — китайский даосский мастер школы Цюаньчжэнь Лунмэнь, известный под даосским именем Ми Цзинцзы (Mi Jingzi). Он считался «земным бессмертным» (地仙), прожил 104 года и был почитаем как хранитель традиции внутренней алхимии и цигун в XX веке.
                </p>

                {/* Ключевые факты */}
                <p style={H}>Ключевые факты</p>
                <p style={S}>• Рождение: 1912 г., уезд Шэньцю, пров. Хэнань</p>
                <p style={S}>• Даосское имя: Ми Цзинцзы (米静子)</p>
                <p style={S}>• Учитель: Лю Минцан, 20-е поколение школы Лунмэнь</p>
                <p style={S}>• Почётные должности: Президент Даосской ассоциации Хайнаня, настоятель Юйчань-гуаня</p>
                <p style={S}>• Смерть: 28 июля 2015 г., 104 года</p>

                {/* Ранние годы */}
                <p style={H}>Ранние годы и путь к Дао</p>
                <p style={S}>
                  Чжан Чжишун родился в крестьянской семье и пережил тяжёлое детство во времена смут начала Республики Китай. В семнадцать лет он встретил своего наставника Лю Минцана в монастыре на горе Хуашань и принял постриг, став учеником школы Цюаньчжэнь Лунмэнь. Много лет выполнял самую тяжёлую работу в обители, одновременно осваивая практику внутреннего взращивания ци и медитацию.
                </p>

                {/* Отшельничество */}
                <p style={H}>Отшельничество и служение</p>
                <p style={S}>
                  После основания КНР мастер поселился в горах Чжуннаньшань, где провёл около семидесяти лет в уединённой практике. Считалось, что во время отшельничества его «охранял тигр». Позднее он вернулся к людям: руководил восстановлением храмов, преподавал методы цигун и врачевания, бесплатно лечил бедных и распространял даосское учение. В 1990-е годы был приглашён читать лекции в Китае и за рубежом.
                </p>

                {/* Учение */}
                <p style={H}>Учение и практика</p>
                <p style={S}>
                  Чжан Чжишун преподавал комплексы «Цзинган-гун» (金剛功, «алмазное искусство») и «Чаншоу-гун» (長壽功, «искусство долголетия»), объединяющие внутренние и внешние методы культивации. Его философия подчеркивала единство Неба и человека, баланс инь-ян и целительное воздействие цигун. Он также писал трактаты, включая «Происхождение ци-тела» и «Рецепты помощи миру».
                </p>

                {/* Наследие */}
                <p style={H}>Наследие и учение о нравственности</p>
                <p style={S}>
                  В наставлениях он призывал к «ясному сердцу и малым желаниям» (清心寡欲), видя в похоти и алчности главные препятствия на пути Дао. Его афоризм «Похоть — это лезвие, ранящее тело и путь» отражает этическую строгость школы Лунмэнь. Современные последователи считают его жизнь примером слияния духовной практики, сострадания и долголетия.
                </p>

                <p className="text-center mt-3 opacity-30" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: '#6b4a10' }}>
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

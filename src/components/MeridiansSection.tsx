// src/components/MeridiansSection.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MERIDIAN_DIAGRAMS } from '../data/daoChapters'
import { img } from '../utils/assets'
import { useIsMobile } from '../utils/useIsMobile'

function MeridianCircle({
  zhName, ruName, image, isBlue,
}: { zhName: string; ruName: string; image: string; isBlue: boolean }) {
  const frameImg   = isBlue ? img('/images/circle-frame-blue.png') : img('/images/circle-frame-gold.png')
  const nameColor  = isBlue ? '#00D8FF' : '#d4a855'
  const nameShadow = isBlue ? '0 0 18px rgba(0,216,255,0.35)' : 'none'
  const ruColor    = isBlue ? 'rgba(0,216,255,0.5)' : 'rgba(255,255,255,0.5)'

  const frameShadow = [
    'drop-shadow(0 6px 18px rgba(0,4,18,0.98))',
    'drop-shadow(0 14px 40px rgba(0,8,30,0.85))',
    'drop-shadow(-4px -4px 10px rgba(0,2,12,0.7))',
  ].join(' ')

  return (
    <motion.div
      className="flex flex-col items-center cursor-default select-none w-full"
      style={{ opacity: 0.75 }}
      whileHover={{ opacity: 1, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="relative w-full" style={{ aspectRatio: '1' }}>
        {/* Рамка */}
        <img
          src={frameImg}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          style={{ zIndex: 2, filter: frameShadow }}
        />
        {/* Фото */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{ width: '72%', height: '72%', top: '14%', left: '14%', zIndex: 1 }}
        >
          {image ? (
            <img
              src={img(`/images/${image}`)}
              alt={ruName}
              draggable={false}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'rgba(4,8,16,0.7)',
              border: '1px dashed rgba(212,168,83,0.12)',
              borderRadius: '50%',
            }} />
          )}
        </div>
      </div>

      {/* Китайское название */}
      <div style={{
        marginTop: 4,
        fontFamily: '"STKaiti","KaiTi","AR PL UKai CN","Noto Serif SC",serif',
        fontSize: 'clamp(1.65rem,3.3vw,2.55rem)',
        color: nameColor,
        letterSpacing: '0.1em',
        lineHeight: 1.2,
        textAlign: 'center',
        textShadow: nameShadow,
      }}>
        {zhName}
      </div>

      {/* Русское название */}
      <div style={{
        fontFamily: 'sans-serif',
        fontSize: 'clamp(0.63rem,1.28vw,0.98rem)',
        color: ruColor,
        letterSpacing: '0.02em',
        lineHeight: 1.35,
        marginTop: 3,
        textAlign: 'center',
        maxWidth: '120%',
        padding: '0 4px',
      }}>
        {ruName}
      </div>
    </motion.div>
  )
}

export default function MeridiansSection() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const first4 = MERIDIAN_DIAGRAMS.slice(0, 4)
  const last4  = MERIDIAN_DIAGRAMS.slice(4, 8)

  return (
    <section
      className="bg-bg-deep py-20 flex flex-col items-center gap-10 relative overflow-hidden"
      style={{ paddingLeft: isMobile ? 0 : '7.69vw', paddingRight: isMobile ? 0 : '7.69vw' }}
    >
      {/* Дракон слева */}
      {!isMobile && (
        <img
          src={img('/images/dao-dragon.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{ top: 0, height: '100%', width: 'auto', left: 0, zIndex: 1, opacity: 0.65 }}
        />
      )}

      {/* Тигр справа */}
      {!isMobile && (
        <img
          src={img('/images/dao-tiger.png')}
          aria-hidden draggable={false}
          className="absolute pointer-events-none select-none"
          style={{ top: 0, height: '100%', width: 'auto', right: 0, zIndex: 1, opacity: 0.55 }}
        />
      )}

      {/* Контент поверх */}
      <div className="relative z-10 flex flex-col items-center gap-10 w-full">

        {/* Заголовок */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div style={{
            fontFamily: '"KNYuanmo","MFLiHei",serif',
            fontSize: 'clamp(2rem,8vw,3.5rem)',
            letterSpacing: '0.12em',
            color: '#d4a855',
            textShadow: '0 0 40px rgba(212,168,83,0.75), 0 0 80px rgba(212,168,83,0.35)',
          }}>
            {t('sections.meridians.zh')}
          </div>
          <div className="text-text-muted text-xs tracking-[0.3em] font-sans mt-2 uppercase">
            {t('sections.meridians.sub')}
          </div>
        </motion.div>

        {/* Разделитель */}
        <div className="w-32 h-px" style={{ background: 'linear-gradient(90deg,transparent,#d4a85366,transparent)' }} />

        {/* Первые 4 — золотые рамки */}
        <motion.div
          className="grid grid-cols-2 mx-auto"
          style={{ width: '100%', maxWidth: '38.5vw', columnGap: '7.69vw', rowGap: '2vw' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {first4.map(m => (
            <MeridianCircle
              key={m.id}
              zhName={m.zhName}
              ruName={m.ruName}
              image={m.image}
              isBlue={false}
            />
          ))}
        </motion.div>

        {/* Следующие 4 — голубые рамки */}
        <motion.div
          className="grid grid-cols-2 mx-auto"
          style={{ width: '100%', maxWidth: '38.5vw', columnGap: '7.69vw', rowGap: '2vw' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {last4.map(m => (
            <MeridianCircle
              key={m.id}
              zhName={m.zhName}
              ruName={m.ruName}
              image={m.image}
              isBlue={true}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

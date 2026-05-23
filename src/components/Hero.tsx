// src/components/Hero.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { img } from '../utils/assets'

// ── Детерминированный генератор (стабильные позиции без useMemo) ──
function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

interface StarDot { id: number; x: number; y: number; size: number; dur: number; delay: number }

function makeStars(count: number, xMin: number, xMax: number, seed: number): StarDot[] {
  const r = seededRand(seed)
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x:    xMin + r() * (xMax - xMin),
    y:    r() * 16,
    size: 0.28 + r() * 0.55,   // rem
    dur:  2.5 + r() * 6,
    delay: -(r() * 9),
  }))
}

const STARS_L = makeStars(50,  0, 36, 41)
const STARS_R = makeStars(50, 64, 100, 77)

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 580, background: '#060c18' }}
    >
      {/* ─── CSS-анимации ─── */}
      <style>{`
        @keyframes fog-left {
          0%, 100% { transform: translateX(0%)   translateY(0%)  scale(1.00); opacity: 0.38; }
          50%       { transform: translateX(-5%)  translateY(-2%) scale(1.05); opacity: 0.65; }
        }
        @keyframes fog-right {
          0%, 100% { transform: translateX(0%)   translateY(0%)  scale(1.00); opacity: 0.44; }
          50%       { transform: translateX(5%)   translateY(-2%) scale(1.06); opacity: 0.70; }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0; }
          50%       { opacity: 1; }
        }
        @keyframes bg-fog-drift {
          0%   { transform: translateX(-4%) translateY(0); opacity: 0.65; }
          100% { transform: translateX( 6%) translateY(-3%); opacity: 0.95; }
        }
      `}</style>

      {/* Z:0 — горы */}
      <div className="absolute inset-0 z-0">
        <img
          src={img('/images/bg-mountains.png')}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.78)', objectPosition: 'center center' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #04081099 0%, #04081044 18%, transparent 42%, transparent 72%, #060c18cc 88%, #060c18ff 100%)',
          }}
        />
      </div>

      {/* Z:1 — всё ЗА мастером */}
      <div className="absolute z-[1] inset-0 overflow-hidden pointer-events-none">

        {/* Синяя атмосферная дымка */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 160% 55% at 50% 80%, rgba(20,45,110,0.28) 0%, transparent 65%)',
          animation: 'bg-fog-drift 22s ease-in-out infinite alternate',
        }} />

        {/* ── Туман слева — из центра чуть влево ── */}
        <img
          src={img('/images/fog1.png')}
          alt="" aria-hidden draggable={false}
          style={{
            position: 'absolute',
            width: '38%',
            bottom: '4%',
            left: '18%',          // центрируем за мастером, дрейфует влево
            mixBlendMode: 'screen',
            animation: 'fog-left 39s ease-in-out infinite',
          }}
        />

        {/* ── Туман справа — зеркало, из центра чуть вправо ── */}
        <img
          src={img('/images/fog1.png')}
          alt="" aria-hidden draggable={false}
          style={{
            position: 'absolute',
            width: '38%',
            bottom: '2%',
            right: '18%',         // центрируем, дрейфует вправо
            transform: 'scaleX(-1)',
            mixBlendMode: 'screen',
            animation: 'fog-right 48s ease-in-out infinite',
            animationDelay: '-14s',
          }}
        />

        {/* ── CSS Звёзды — левый верхний угол ── */}
        {STARS_L.map(s => (
          <span
            key={`sl-${s.id}`}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top:  `${s.y}%`,
              fontSize: `${s.size}rem`,
              lineHeight: 1,
              color: '#e8d49a',
              textShadow: '0 0 4px #d4a85388',
              animation: `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
              userSelect: 'none',
            }}
          >✦</span>
        ))}

        {/* ── CSS Звёзды — правый верхний угол ── */}
        {STARS_R.map(s => (
          <span
            key={`sr-${s.id}`}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top:  `${s.y}%`,
              fontSize: `${s.size}rem`,
              lineHeight: 1,
              color: '#e8d49a',
              textShadow: '0 0 4px #d4a85388',
              animation: `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
              userSelect: 'none',
            }}
          >✦</span>
        ))}

        {/* SVG заголовок 炁體源流 */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center"
          style={{ top: '30%' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
        >
          <img
            src={img('/images/title.svg')}
            alt="炁體源流"
            style={{
              width: 'min(70vw, 700px)',
              height: 'auto',
              filter: 'drop-shadow(0 0 40px #d4a85566)',
            }}
          />
        </motion.div>

      </div>

      {/* Z:2 — мастер */}
      <motion.img
        src={img('/images/master.png')}
        alt="张至顺"
        className="absolute z-[2] inset-0 w-full h-full"
        style={{
          objectFit: 'contain',
          objectPosition: 'center bottom',
          filter: 'drop-shadow(0 0 60px #d4a85322)',
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 1.1, ease: 'easeOut' }}
      />

      {/* Z:3 — золотой туман ПЕРЕД мастером (аура) */}
      <div className="absolute z-[3] inset-0 overflow-hidden pointer-events-none">
        <div className="mist-layer mist-1" />
        <div className="mist-layer mist-2" />
        <div className="mist-layer mist-3" />
      </div>

      {/* Z:4 — текст сверху */}
      <motion.div
        className="absolute z-[4] top-0 left-0 right-0 flex flex-col items-center text-center"
        style={{ paddingTop: 'clamp(24px, 4.5vh, 52px)' }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.8 }}
      >
        <p
          className="font-sans font-bold text-white uppercase"
          style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)', letterSpacing: '0.5em' }}
        >
          {t('hero.title')}
        </p>
        <p
          className="font-sans text-[#c8b98a] uppercase mt-2"
          style={{ fontSize: 'clamp(0.55rem, 1.4vw, 0.75rem)', letterSpacing: '0.28em' }}
        >
          {t('hero.subtitle')}
        </p>
      </motion.div>

      {/* Z:4 — имя мастера снизу */}
      <motion.div
        className="absolute z-[4] bottom-0 left-0 right-0 flex flex-col items-center text-center"
        style={{ paddingBottom: 'clamp(16px, 3.5vh, 36px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div
          className="text-gold tracking-[0.22em]"
          style={{
            fontFamily: '"MFLiHei", "STKaiti", "KaiTi", serif',
            fontSize: 'clamp(1.2rem, 3.2vw, 1.9rem)',
            textShadow: '0 0 24px #d4a85599',
          }}
        >
          {t('hero.masterZh')}
        </div>
        <div
          className="font-sans text-[#99abbccc] uppercase mt-1"
          style={{ fontSize: 'clamp(0.52rem, 1.3vw, 0.68rem)', letterSpacing: '0.32em' }}
        >
          {t('hero.masterRu')}
        </div>
        <motion.div
          className="font-sans text-[#4488cc44] mt-3"
          style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t('hero.scrollHint')}
        </motion.div>
      </motion.div>
    </section>
  )
}

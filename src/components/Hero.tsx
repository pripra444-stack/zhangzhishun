// src/components/Hero.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-bg-deep flex flex-col items-center">
      {/* Stars */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 8% 12%, #ffffff55, transparent),
            radial-gradient(1px 1px at 22% 6%, #ffffff33, transparent),
            radial-gradient(1px 1px at 38% 18%, #ffffff22, transparent),
            radial-gradient(1px 1px at 55% 4%, #ffffff44, transparent),
            radial-gradient(1px 1px at 72% 10%, #ffffff33, transparent),
            radial-gradient(1px 1px at 85% 22%, #ffffff22, transparent),
            radial-gradient(1px 1px at 14% 32%, #ffffff33, transparent),
            radial-gradient(1px 1px at 91% 38%, #ffffff22, transparent),
            radial-gradient(1px 1px at 46% 28%, #ffffff11, transparent),
            radial-gradient(1px 1px at 65% 16%, #ffffff22, transparent),
            radial-gradient(2px 2px at 30% 8%, #d4a85333, transparent),
            radial-gradient(2px 2px at 80% 5%, #d4a85322, transparent)
          `,
        }}
      />

      {/* Mountains — z:1, нижние 45% */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[45%] z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.9, duration: 1.2 }}
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #0a1e3a 40%, #061228 100%)',
          clipPath: `polygon(
            0% 100%, 0% 55%,
            8% 28%, 16% 48%,
            24% 16%, 32% 38%,
            40% 8%, 48% 33%,
            56% 18%, 64% 40%,
            72% 6%, 80% 28%,
            88% 20%, 95% 36%,
            100% 22%, 100% 100%
          )`,
        }}
      />

      {/* Master figure — z:2 */}
      <motion.div
        className="absolute z-[2] bottom-28 left-1/2 -translate-x-1/2 w-56 md:w-72 h-[60vh]"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1.0 }}
        style={{
          background: 'linear-gradient(180deg, #d4a85322 0%, #d4a85444 40%, #d4a85322 70%, transparent 100%)',
          borderRadius: '4px 4px 0 0',
        }}
      >
        {/* Заменить на <img src="/images/master.png" /> когда появится фото */}
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="text-5xl opacity-20">🧘</span>
        </div>
      </motion.div>

      {/* Mist — z:3 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(0deg, #0a1e4a88 0%, #0a1e4a33 50%, transparent 100%)' }}
      />

      {/* Top text — z:4 */}
      <motion.div
        className="relative z-[4] text-center pt-28"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9 }}
      >
        <p className="text-text-muted text-xs tracking-[0.35em] font-sans uppercase mb-3">
          {t('hero.subtitle')}
        </p>
        <h1 className="font-serif text-gold text-5xl md:text-7xl tracking-[0.15em] gold-glow leading-none">
          {t('hero.hieroglyph')}
        </h1>
      </motion.div>

      {/* Master name — z:4 */}
      <motion.div
        className="absolute z-[4] bottom-16 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="font-serif text-gold text-2xl tracking-[0.2em]">
          {t('hero.masterZh')}
        </div>
        <div className="text-text-muted text-xs tracking-[0.25em] font-sans mt-1">
          {t('hero.masterRu')}
        </div>
      </motion.div>

      {/* Scroll hint — z:4 */}
      <motion.div
        className="absolute z-[4] bottom-4 left-0 right-0 text-center text-xs text-portal-blue/40 tracking-[0.2em] font-sans"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {t('hero.scrollHint')}
      </motion.div>
    </section>
  )
}

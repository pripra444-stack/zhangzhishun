// src/components/BiographyScroll.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function BiographyScroll() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [hintSeen, setHintSeen] = useState(false)

  const handleOpen = () => { setOpen(true); setHintSeen(true) }
  const handleClose = () => setOpen(false)
  const handleToggle = () => { setOpen(o => !o); setHintSeen(true) }

  return (
    <section className="py-16 px-4 flex flex-col items-center bg-bg-deep">

      {/* ── Свиток-изображение (кнопка) ── */}
      <motion.div
        className="relative cursor-pointer select-none"
        style={{ width: 'min(820px, 90vw)' }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onPointerEnter={e => { if (e.pointerType === 'mouse') handleOpen() }}
        onPointerLeave={e => { if (e.pointerType === 'mouse') handleClose() }}
        onClick={handleToggle}
      >
        <img
          src="/images/scroll.png"
          alt="Свиток — биография мастера"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 8px 32px #d4a85333)' }}
        />

        {/* подпись поверх свитка */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ paddingBottom: '4%' }}
        >
          <span
            className="font-sans text-[#d4c090] tracking-[0.18em] text-center"
            style={{
              fontSize: 'clamp(0.6rem, 1.6vw, 0.82rem)',
              textShadow: '0 1px 4px #00000099',
            }}
          >
            {t('bio.title')}
          </span>
        </div>
      </motion.div>

      {/* подсказка под свитком */}
      <AnimatePresence>
        {!hintSeen && (
          <motion.p
            className="text-gold/40 text-xs tracking-widest font-sans mt-3"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t('bio.hint')}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Раскрывающийся текст биографии ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="w-full overflow-hidden"
            style={{ maxWidth: 'min(820px, 92vw)' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="mt-6 px-8 py-6 text-justify leading-relaxed font-sans"
              style={{
                background: 'linear-gradient(180deg, #f0ddb0, #e8cc8a)',
                borderRadius: 4,
                color: '#2a1a05',
                fontSize: 'clamp(0.78rem, 1.5vw, 0.88rem)',
                lineHeight: '1.9',
                boxShadow: '0 8px 40px #d4a85333',
              }}
            >
              <h3
                className="text-center font-serif tracking-wider mb-4"
                style={{ color: '#5c3010', fontSize: '0.95rem' }}
              >
                {t('bio.title')}
              </h3>
              <p>{t('bio.text')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

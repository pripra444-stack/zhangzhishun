// src/components/BiographyScroll.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ROD_STYLE = {
  background: 'linear-gradient(90deg, #3d2208, #d4a853, #8b6914, #d4a853, #3d2208)',
  boxShadow: '0 3px 12px #d4a85344',
}

export default function BiographyScroll() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)

  const handleOpen = () => {
    setOpen(true)
    setHintVisible(false)
  }

  return (
    <section className="py-20 px-4 flex flex-col items-center bg-bg-deep">
      <div className="w-full max-w-lg">
        {/* Top rod */}
        <div className="h-4 rounded-lg" style={ROD_STYLE} />

        {/* Scroll body */}
        <div
          className="mx-auto cursor-pointer"
          style={{ width: '88%' }}
          onPointerEnter={e => { if (e.pointerType === 'mouse') handleOpen() }}
          onPointerLeave={e => { if (e.pointerType === 'mouse') setOpen(false) }}
          onClick={() => { setOpen(o => !o); setHintVisible(false) }}
        >
          <motion.div
            initial={{ height: 52 }}
            animate={{ height: open ? 'auto' : 52 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              overflow: 'hidden',
              background: 'linear-gradient(180deg, #f0ddb0, #e8cc8a, #f0ddb0)',
              borderLeft: '3px solid #c9a060',
              borderRight: '3px solid #c9a060',
            }}
          >
            <div className="px-8 py-5" style={{ color: '#2a1a05' }}>
              <h3
                className="text-center font-serif tracking-wider mb-4"
                style={{ color: '#5c3010', fontSize: '0.95rem' }}
              >
                {t('bio.title')}
              </h3>
              <p
                className="text-justify leading-relaxed font-sans"
                style={{ fontSize: '0.82rem', lineHeight: '1.9' }}
              >
                {t('bio.text')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom rod */}
        <div className="h-4 rounded-lg" style={ROD_STYLE} />

        {/* Hint */}
        <AnimatePresence>
          {hintVisible && (
            <motion.p
              className="text-center text-gold/50 text-xs tracking-widest font-sans mt-3"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {t('bio.hint')}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

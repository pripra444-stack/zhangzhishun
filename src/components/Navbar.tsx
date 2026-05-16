import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LANGS = ['ru', 'en', 'zh'] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500 ${
        scrolled
          ? 'bg-bg-deep/90 backdrop-blur-sm'
          : 'bg-gradient-to-b from-bg-deep/90 to-transparent'
      }`}
    >
      <span className="font-serif text-gold text-lg tracking-widest gold-glow">
        {t('nav.logo')}
      </span>

      <div className="flex gap-2">
        {LANGS.map(lang => (
          <button
            key={lang}
            onClick={() => i18n.changeLanguage(lang)}
            className={`text-xs tracking-widest px-2 py-1 rounded border transition-all duration-200 uppercase ${
              i18n.language === lang
                ? 'text-gold border-gold/40'
                : 'text-text-muted border-transparent hover:text-gold/60'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
    </nav>
  )
}

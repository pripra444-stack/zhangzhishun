// src/components/CircleVariantsDemo.tsx — временный демо-экран для выбора стиля кольца
import { useTranslation } from 'react-i18next'

const DONUT_SVG = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
  '<path fill="white" fill-rule="evenodd" ' +
  'd="M50,1A49,49,0,1,1,50,99,49,49,0,0,1,50,1Zm0,13A36,36,0,1,0,86,50,36,36,0,0,0,50,14Z"/>' +
  '</svg>'
)
const MASK_URL = `url("data:image/svg+xml,${DONUT_SVG}")`

interface Variant {
  label: string
  ringBg: string
  frameFilter: string
  shadowFilter: string
}

const VARIANTS: Variant[] = [
  {
    // 1 — Ледяной синий (текущий, немного ярче)
    label: '① Ледяной',
    ringBg: '#040f3d',
    frameFilter: 'brightness(0.60) contrast(1.5) saturate(1.4)',
    shadowFilter: [
      'drop-shadow(0 0 5px rgba(80,170,255,1))',
      'drop-shadow(0 0 16px rgba(60,140,255,0.9))',
      'drop-shadow(0 0 38px rgba(30,90,220,0.60))',
      'drop-shadow(3px 4px 8px rgba(0,0,20,1))',
    ].join(' '),
  },
  {
    // 2 — Кобальт тёмный
    label: '② Кобальт',
    ringBg: '#020820',
    frameFilter: 'brightness(0.45) contrast(1.6) saturate(0.9)',
    shadowFilter: [
      'drop-shadow(0 0 4px rgba(40,90,200,1))',
      'drop-shadow(0 0 14px rgba(20,60,180,0.85))',
      'drop-shadow(0 0 32px rgba(10,40,140,0.55))',
      'drop-shadow(4px 5px 10px rgba(0,0,10,1))',
    ].join(' '),
  },
  {
    // 3 — Электрик (яркий неон)
    label: '③ Электрик',
    ringBg: '#060a1e',
    frameFilter: 'brightness(0.55) contrast(1.4) saturate(2)',
    shadowFilter: [
      'drop-shadow(0 0 7px rgba(0,180,255,1))',
      'drop-shadow(0 0 20px rgba(0,150,255,0.95))',
      'drop-shadow(0 0 50px rgba(0,100,200,0.65))',
      'drop-shadow(-2px -2px 5px rgba(100,200,255,0.3))',
      'drop-shadow(3px 4px 8px rgba(0,0,30,1))',
    ].join(' '),
  },
  {
    // 4 — Фиолетовый
    label: '④ Фиолет',
    ringBg: '#160530',
    frameFilter: 'brightness(0.55) contrast(1.5) saturate(1.6) hue-rotate(60deg)',
    shadowFilter: [
      'drop-shadow(0 0 6px rgba(160,60,255,1))',
      'drop-shadow(0 0 20px rgba(120,40,220,0.85))',
      'drop-shadow(0 0 44px rgba(80,20,160,0.55))',
      'drop-shadow(3px 4px 9px rgba(5,0,20,1))',
    ].join(' '),
  },
  {
    // 5 — Бирюза / Цянь
    label: '⑤ Бирюза',
    ringBg: '#021a1a',
    frameFilter: 'brightness(0.55) contrast(1.5) saturate(1.8) hue-rotate(-40deg)',
    shadowFilter: [
      'drop-shadow(0 0 6px rgba(0,210,200,1))',
      'drop-shadow(0 0 20px rgba(0,170,160,0.85))',
      'drop-shadow(0 0 44px rgba(0,120,110,0.55))',
      'drop-shadow(3px 4px 9px rgba(0,5,5,1))',
    ].join(' '),
  },
  {
    // 6 — Золото / Металл
    label: '⑥ Золото',
    ringBg: '#18100000',
    frameFilter: 'brightness(0.7) contrast(1.4) saturate(0.5) sepia(0.8)',
    shadowFilter: [
      'drop-shadow(0 0 6px rgba(220,170,40,0.95))',
      'drop-shadow(0 0 20px rgba(190,140,20,0.80))',
      'drop-shadow(0 0 44px rgba(140,90,10,0.50))',
      'drop-shadow(-2px -2px 5px rgba(255,220,100,0.25))',
      'drop-shadow(3px 4px 9px rgba(10,5,0,1))',
    ].join(' '),
  },
  {
    // 7 — Рубин / Огонь
    label: '⑦ Рубин',
    ringBg: '#1a0205',
    frameFilter: 'brightness(0.55) contrast(1.5) saturate(1.8) hue-rotate(130deg)',
    shadowFilter: [
      'drop-shadow(0 0 6px rgba(255,50,60,0.95))',
      'drop-shadow(0 0 20px rgba(220,30,40,0.80))',
      'drop-shadow(0 0 44px rgba(160,10,20,0.50))',
      'drop-shadow(3px 4px 9px rgba(15,0,0,1))',
    ].join(' '),
  },
  {
    // 8 — Серебро / Луна
    label: '⑧ Серебро',
    ringBg: '#0c1020',
    frameFilter: 'brightness(0.80) contrast(1.3) saturate(0.3)',
    shadowFilter: [
      'drop-shadow(0 0 5px rgba(200,215,255,0.90))',
      'drop-shadow(0 0 18px rgba(160,180,240,0.70))',
      'drop-shadow(0 0 40px rgba(100,120,200,0.40))',
      'drop-shadow(-2px -2px 5px rgba(230,240,255,0.20))',
      'drop-shadow(3px 4px 9px rgba(0,0,15,1))',
    ].join(' '),
  },
]

export default function CircleVariantsDemo() {
  useTranslation()

  return (
    <section
      style={{
        background: '#070d1a',
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
      }}
    >
      <div style={{ color: '#d4a853', fontFamily: 'serif', fontSize: '1.6rem', letterSpacing: '0.15em' }}>
        Выбери стиль кольца
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 180px)',
          gap: 48,
          justifyContent: 'center',
        }}
      >
        {VARIANTS.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {/* Кольцо */}
            <div style={{ position: 'relative', width: 180, height: 180 }}>
              {/* Фото */}
              <div
                style={{
                  position: 'absolute',
                  width: '72%', height: '72%',
                  top: '14%', left: '14%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  zIndex: 1,
                }}
              >
                <img
                  src="/images/exercise-placeholder.png"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Рамка */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  maskImage: MASK_URL,
                  WebkitMaskImage: MASK_URL,
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  filter: v.shadowFilter,
                }}
              >
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: v.ringBg,
                    borderRadius: '50%',
                  }}
                />
                <img
                  src="/images/circle-frame-blue.png"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    filter: v.frameFilter,
                  }}
                />
              </div>
            </div>

            {/* Номер и подпись */}
            <div style={{ color: '#a0b8d0', fontSize: '0.8rem', textAlign: 'center', letterSpacing: '0.05em' }}>
              {v.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

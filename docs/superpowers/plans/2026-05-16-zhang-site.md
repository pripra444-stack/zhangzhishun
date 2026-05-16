# 炁體源流 — Zhang Zhi Shun Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Собрать локальный лендинг о даосском мастере Чжан Чжи Шунь с кинематографичным hero, анимированным свитком биографии и 16 круглыми порталами-упражнениями (两个 комплекса по 8).

**Architecture:** Single-page React приложение без роутинга. Все секции в одном скролле. i18n через react-i18next с тремя локалями (ru, en, zh) с первого дня — чтобы потом добавить переводы без рефакторинга.

**Tech Stack:** React 18, Vite 5, TypeScript 5, Tailwind CSS 3, Framer Motion 11, react-i18next, Vitest, React Testing Library

---

## Файловая карта

| Файл | Роль |
|---|---|
| `vite.config.ts` | Vite + Vitest конфиг |
| `tailwind.config.js` | Дизайн-токены (цвета, шрифты) |
| `src/index.css` | Глобальные стили, Tailwind directives |
| `src/main.tsx` | Точка входа, i18n init |
| `src/i18n.ts` | Инициализация react-i18next |
| `src/App.tsx` | Сборка всех секций |
| `src/data/exercises.ts` | Типы + массивы упражнений (заглушки) |
| `src/locales/ru/translation.json` | Русские строки (приоритет) |
| `src/locales/en/translation.json` | Английские строки (заглушки) |
| `src/locales/zh/translation.json` | Китайские строки (заглушки) |
| `src/components/Navbar.tsx` | Fixed navbar: логотип + RU/EN/ZH |
| `src/components/Hero.tsx` | Кинематографичная hero-секция |
| `src/components/BiographyScroll.tsx` | Свиток биографии (hover/click) |
| `src/components/GateCircle.tsx` | Один синий портал с туманом |
| `src/components/PracticeSection.tsx` | Секция с 8 порталами (переиспользуется) |
| `src/components/ExerciseModal.tsx` | Модальное окно упражнения |
| `src/test-setup.ts` | Vitest + jsdom setup |

---

## Task 1: Scaffold проекта

**Files:**
- Create: весь корень `D:\Documents\Site Zhang 01\`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `src/test-setup.ts`

- [ ] **Step 1.1: Инициализировать Vite проект**

В папке `D:\Documents\Site Zhang 01` уже есть `docs/` и `.superpowers/`. Запускаем с флагом `--force` чтобы не блокировалось:

```powershell
cd "D:\Documents\Site Zhang 01"
npm create vite@latest . -- --template react-ts --force
```

Если спросит про существующие файлы — выбрать "Ignore files and continue".

- [ ] **Step 1.2: Установить зависимости**

```powershell
npm install
npm install framer-motion@11 react-i18next i18next
npm install -D tailwindcss@3 postcss autoprefixer
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npx tailwindcss init -p
```

- [ ] **Step 1.3: Настроить vite.config.ts**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 1.4: Создать test-setup.ts**

```ts
// src/test-setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 1.5: Добавить скрипт теста в package.json**

Открыть `package.json`, найти `"scripts"` и добавить:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 1.6: Проверить что dev запускается**

```powershell
npm run dev
```

Ожидаем: сервер на `http://localhost:5173`. Открыть браузер — должна отобразиться стандартная Vite+React страница.

- [ ] **Step 1.7: Commit**

```powershell
git init
git add -A
git commit -m "feat: vite react-ts scaffold + test setup"
```

---

## Task 2: Tailwind config + глобальные стили

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 2.1: Настроить tailwind.config.js с дизайн-токенами**

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#060c18',
        'bg-section': '#07101c',
        'bg-darker': '#050a14',
        gold: '#d4a853',
        'portal-blue': '#4488cc',
        'text-muted': '#8899aa',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2.2: Заменить src/index.css**

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg-deep text-white font-sans overflow-x-hidden;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-bg-deep;
  }
  ::-webkit-scrollbar-thumb {
    background: #d4a85333;
    border-radius: 2px;
  }
}

@layer utilities {
  .gold-glow {
    text-shadow: 0 0 40px #d4a85555, 0 0 80px #d4a85322;
  }
  .portal-glow {
    box-shadow: 0 0 15px #4488cc33, 0 0 30px #4488cc11, inset 0 0 20px #0a2040;
  }
  .portal-glow-hover {
    box-shadow: 0 0 25px #4488cc66, 0 0 50px #4488cc22, inset 0 0 20px #0a2040;
  }
}
```

- [ ] **Step 2.3: Обновить src/main.tsx**

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 2.4: Заменить src/App.tsx временной заглушкой**

```tsx
// src/App.tsx
export default function App() {
  return (
    <div className="min-h-screen bg-bg-deep text-gold flex items-center justify-center">
      <h1 className="text-4xl font-serif tracking-widest gold-glow">炁體源流</h1>
    </div>
  )
}
```

- [ ] **Step 2.5: Проверить что цвета применяются**

```powershell
npm run dev
```

Открыть `http://localhost:5173` — должна быть тёмно-синяя страница с золотыми иероглифами по центру.

- [ ] **Step 2.6: Commit**

```powershell
git add -A
git commit -m "feat: tailwind config with design tokens + global styles"
```

---

## Task 3: i18n setup + файлы переводов

**Files:**
- Create: `src/i18n.ts`
- Create: `src/locales/ru/translation.json`
- Create: `src/locales/en/translation.json`
- Create: `src/locales/zh/translation.json`

- [ ] **Step 3.1: Создать src/i18n.ts**

```ts
// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru/translation.json'
import en from './locales/en/translation.json'
import zh from './locales/zh/translation.json'

i18n.use(initReactI18next).init({
  resources: { ru: { translation: ru }, en: { translation: en }, zh: { translation: zh } },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
})

export default i18n
```

- [ ] **Step 3.2: Создать src/locales/ru/translation.json**

```json
{
  "nav": {
    "logo": "炁體源流"
  },
  "hero": {
    "subtitle": "Даосские практики · Здоровье и медитация",
    "hieroglyph": "炁體源流",
    "masterZh": "张至顺",
    "masterRu": "Чжан Чжи Шунь",
    "scrollHint": "↓  прокрути вниз  ↓"
  },
  "bio": {
    "title": "张至顺 · Биография мастера",
    "hint": "— наведи курсор, чтобы раскрыть свиток —",
    "text": "Чжан Чжи Шунь родился в 1912 году в провинции Хэнань. С ранних лет изучал даосские практики под руководством наставников горы Уданшань. Стал настоятелем монастыря и посвятил всю жизнь сохранению и передаче древних техник цигун. Написал трактат «炁體源流» — «Источник и течение первозданной ци». Прожил более 120 лет, ведя практику до последних дней. Его учение о движении, дыхании и осознанности получило распространение по всему миру."
  },
  "sections": {
    "jingang": { "zh": "金刚功", "sub": "Алмазная крепость · 8 упражнений" },
    "changshou": { "zh": "长寿功", "sub": "Практика долголетия · 8 упражнений" }
  },
  "modal": {
    "close": "✕ закрыть",
    "prev": "← Предыдущее",
    "next": "Следующее →",
    "exercise": "Упражнение",
    "placeholder": "Видео и фото будут добавлены позже"
  },
  "footer": {
    "sub": "张至顺 · Школа даосских практик"
  },
  "exercises": {
    "jingang": {
      "1": { "name": "Подъём Неба", "label": "Небо", "desc": "Стоя ровно, ноги на ширине плеч. Медленно поднимаем руки через стороны вверх, соединяем ладони над головой. Дыхание плавное и глубокое. Сознание сосредоточено в центре тела. Повторить 8 раз." },
      "2": { "name": "Лук и стрела", "label": "Лук", "desc": "Встать прямо. Одна рука вытягивается как тетива лука, другая — как стрела, устремлённая в сторону. Плавно чередовать стороны. Повторить 8 раз в каждую сторону." },
      "3": { "name": "Разделение Неба и Земли", "label": "Разделение", "desc": "Одна рука поднимается вверх, другая опускается вниз — растягиваем пространство между небом и землёй. Плавное дыхание. Повторить 8 раз." },
      "4": { "name": "Взгляд Тигра", "label": "Тигр", "desc": "Поворот головы и корпуса, взгляд устремлён назад, как у тигра, осматривающего территорию. Плечи расслаблены. Повторить 8 раз в каждую сторону." },
      "5": { "name": "Дракон входит в море", "label": "Дракон", "desc": "Плавный наклон вперёд с вытянутыми руками — дракон погружается в воды. Позвоночник вытягивается. Повторить 8 раз." },
      "6": { "name": "Феникс расправляет крылья", "label": "Феникс", "desc": "Руки раскрываются в стороны широко, грудь открывается. Дыхание глубокое. Ощущение полёта. Повторить 8 раз." },
      "7": { "name": "Черепаха тянет шею", "label": "Черепаха", "desc": "Голова медленно вытягивается вперёд и назад, укрепляя шейный отдел. Движение плавное, без рывков. Повторить 8 раз." },
      "8": { "name": "Поклон Земле", "label": "Поклон", "desc": "Глубокий поклон с благодарностью земле и учителям. Руки соединены перед грудью. Завершение комплекса." }
    },
    "changshou": {
      "1": { "name": "Открытие ворот", "label": "Открытие", "desc": "Руки раскрываются из центра в стороны — открываем врата жизненной энергии. Медленное глубокое дыхание. Повторить 8 раз." },
      "2": { "name": "Волна прибоя", "label": "Волна", "desc": "Плавные волнообразные движения руками, имитирующие прибой моря. Тело расслаблено, движение идёт от центра. Повторить 8 раз." },
      "3": { "name": "Журавль стоит", "label": "Журавль", "desc": "Стойка на одной ноге, руки раскрыты как крылья журавля. Развивает равновесие и концентрацию. Повторить по 8 раз на каждую ногу." },
      "4": { "name": "Змея скользит", "label": "Змея", "desc": "Плавные волнообразные движения всем телом от головы до ног, как скользящая змея. Позвоночник размягчается. Повторить 8 раз." },
      "5": { "name": "Медведь идёт", "label": "Медведь", "desc": "Тяжёлые, уверенные шаги с перекатом, руки свободно качаются. Укрепляет нижнюю часть тела. Повторить по кругу 8 раз." },
      "6": { "name": "Олень бежит", "label": "Олень", "desc": "Лёгкие, пружинистые движения — олень несётся по лесу. Энергия поднимается вверх по позвоночнику. Повторить 8 раз." },
      "7": { "name": "Обезьяна тянется", "label": "Обезьяна", "desc": "Попеременное вытягивание рук вперёд-вверх, как обезьяна тянется за плодом. Растягивает боковые мышцы. Повторить по 8 раз." },
      "8": { "name": "Закрытие ворот", "label": "Закрытие", "desc": "Руки плавно сходятся к центру — закрываем вората, сохраняем накопленную энергию внутри. Завершение практики долголетия." }
    }
  }
}
```

- [ ] **Step 3.3: Создать src/locales/en/translation.json**

```json
{
  "nav": { "logo": "炁體源流" },
  "hero": {
    "subtitle": "Daoist Practices · Health and Meditation",
    "hieroglyph": "炁體源流",
    "masterZh": "张至顺",
    "masterRu": "Zhang Zhi Shun",
    "scrollHint": "↓  scroll down  ↓"
  },
  "bio": {
    "title": "张至顺 · Master's Biography",
    "hint": "— hover to unfurl the scroll —",
    "text": "Zhang Zhi Shun was born in 1912 in Henan province. From an early age he studied Daoist practices under the guidance of masters on Wudang Mountain. He became abbot of the monastery and devoted his life to preserving and transmitting ancient qigong techniques. He wrote the treatise «炁體源流» — «Source and Flow of Primordial Qi». He lived over 120 years, practicing until his final days."
  },
  "sections": {
    "jingang": { "zh": "金刚功", "sub": "Diamond Fortress · 8 Exercises" },
    "changshou": { "zh": "长寿功", "sub": "Longevity Practice · 8 Exercises" }
  },
  "modal": {
    "close": "✕ close",
    "prev": "← Previous",
    "next": "Next →",
    "exercise": "Exercise",
    "placeholder": "Video and photos will be added later"
  },
  "footer": { "sub": "张至顺 · School of Daoist Practices" },
  "exercises": {
    "jingang": {
      "1": { "name": "Lifting the Sky", "label": "Sky", "desc": "Stand upright, feet shoulder-width apart. Slowly raise arms to the sides and up, joining palms overhead. Smooth, deep breathing. Repeat 8 times." },
      "2": { "name": "Bow and Arrow", "label": "Bow", "desc": "Stand straight. One arm extends like a bowstring, the other like an arrow pointing to the side. Alternate sides smoothly. Repeat 8 times each side." },
      "3": { "name": "Separating Heaven and Earth", "label": "Separation", "desc": "One hand rises up, the other descends — stretching the space between heaven and earth. Smooth breathing. Repeat 8 times." },
      "4": { "name": "Tiger's Gaze", "label": "Tiger", "desc": "Turn head and torso, gaze directed backward like a tiger surveying its territory. Shoulders relaxed. Repeat 8 times each side." },
      "5": { "name": "Dragon Enters the Sea", "label": "Dragon", "desc": "Smooth forward bend with arms extended — the dragon plunges into the waters. Spine lengthens. Repeat 8 times." },
      "6": { "name": "Phoenix Spreads Wings", "label": "Phoenix", "desc": "Arms open wide to the sides, chest expands. Deep breathing. Sensation of flight. Repeat 8 times." },
      "7": { "name": "Turtle Extends Neck", "label": "Turtle", "desc": "Head slowly extends forward and back, strengthening the cervical spine. Smooth movement, no jerking. Repeat 8 times." },
      "8": { "name": "Bow to the Earth", "label": "Bow", "desc": "A deep bow of gratitude to the earth and teachers. Hands joined before the chest. Completion of the set." }
    },
    "changshou": {
      "1": { "name": "Opening the Gates", "label": "Opening", "desc": "Hands open from center outward — opening the gates of vital energy. Slow deep breathing. Repeat 8 times." },
      "2": { "name": "Wave of the Surf", "label": "Wave", "desc": "Smooth wave-like arm movements imitating ocean surf. Body relaxed, movement from center. Repeat 8 times." },
      "3": { "name": "Crane Stands", "label": "Crane", "desc": "Stand on one leg, arms spread like crane wings. Develops balance and concentration. Repeat 8 times each leg." },
      "4": { "name": "Snake Glides", "label": "Snake", "desc": "Smooth undulating movement through the whole body from head to feet, like a gliding snake. Spine softens. Repeat 8 times." },
      "5": { "name": "Bear Walks", "label": "Bear", "desc": "Heavy, confident steps with rolling gait, arms swinging freely. Strengthens the lower body. Repeat 8 rounds." },
      "6": { "name": "Deer Runs", "label": "Deer", "desc": "Light, springy movements — a deer racing through the forest. Energy rises up the spine. Repeat 8 times." },
      "7": { "name": "Monkey Reaches", "label": "Monkey", "desc": "Alternating arm reaches forward-upward, like a monkey reaching for fruit. Stretches lateral muscles. Repeat 8 times each." },
      "8": { "name": "Closing the Gates", "label": "Closing", "desc": "Hands gently come together to center — closing the gates, preserving accumulated energy within. Completion of longevity practice." }
    }
  }
}
```

- [ ] **Step 3.4: Создать src/locales/zh/translation.json**

```json
{
  "nav": { "logo": "炁體源流" },
  "hero": {
    "subtitle": "道家功夫 · 健康与冥想",
    "hieroglyph": "炁體源流",
    "masterZh": "张至顺",
    "masterRu": "张至顺道长",
    "scrollHint": "↓  向下滚动  ↓"
  },
  "bio": {
    "title": "张至顺 · 道长生平",
    "hint": "— 悬停以展开卷轴 —",
    "text": "张至顺道长1912年生于河南省。自幼随武当山各位老师学习道家功夫。后成为武当山道观住持，将毕生精力投入古代气功技法的保护与传授。著有《炁體源流》一书。享年逾120岁，直至生命最后仍坚持修炼。"
  },
  "sections": {
    "jingang": { "zh": "金刚功", "sub": "金刚功 · 八式" },
    "changshou": { "zh": "长寿功", "sub": "长寿功 · 八式" }
  },
  "modal": {
    "close": "✕ 关闭",
    "prev": "← 上一个",
    "next": "下一个 →",
    "exercise": "第",
    "placeholder": "视频和照片稍后添加"
  },
  "footer": { "sub": "张至顺 · 道家功夫学校" },
  "exercises": {
    "jingang": {
      "1": { "name": "举天式", "label": "举天", "desc": "自然站立，双脚与肩同宽。双臂缓缓侧举向上，掌心合于头顶。呼吸平稳深长。重复8次。" },
      "2": { "name": "弓箭式", "label": "弓箭", "desc": "站直身体。一臂如弓弦延伸，另一臂如箭指向一侧。左右交替，柔和进行。每侧重复8次。" },
      "3": { "name": "开天辟地", "label": "开天", "desc": "一手上举，一手下按，伸展天地之间的空间。呼吸平稳。重复8次。" },
      "4": { "name": "虎视式", "label": "虎视", "desc": "转头转身，目光如虎巡视领地般向后望。肩部放松。每侧重复8次。" },
      "5": { "name": "龙入海", "label": "龙入海", "desc": "双臂前伸，平稳俯身，如龙潜入水中。脊柱舒展。重复8次。" },
      "6": { "name": "凤展翅", "label": "凤展翅", "desc": "双臂向两侧宽展，胸腔打开。深长呼吸。感受飞翔之感。重复8次。" },
      "7": { "name": "龟伸颈", "label": "龟伸颈", "desc": "头部缓缓前伸后收，强健颈椎。动作平缓，不可急促。重复8次。" },
      "8": { "name": "叩地谢恩", "label": "叩地", "desc": "深深鞠躬，感恩大地与师承。双手合于胸前。金刚功收式。" }
    },
    "changshou": {
      "1": { "name": "开门式", "label": "开门", "desc": "双手由中心向两侧展开，开启生命之门。缓慢深呼吸。重复8次。" },
      "2": { "name": "浪涛式", "label": "浪涛", "desc": "双臂做平滑波浪状运动，如海浪涌动。身体放松，动作源自中心。重复8次。" },
      "3": { "name": "鹤立式", "label": "鹤立", "desc": "单腿站立，双臂如鹤翅展开。培养平衡与专注。每腿重复8次。" },
      "4": { "name": "蛇行式", "label": "蛇行", "desc": "全身由头至足做流畅波浪运动，如游蛇滑行。脊柱柔软舒展。重复8次。" },
      "5": { "name": "熊行式", "label": "熊行", "desc": "沉稳有力地迈步，双臂自然摆动。强健下体。绕圈行走8次。" },
      "6": { "name": "鹿奔式", "label": "鹿奔", "desc": "轻盈弹跳，如鹿奔于林间。能量沿脊柱上升。重复8次。" },
      "7": { "name": "猿摘式", "label": "猿摘", "desc": "双臂交替向前上方伸展，如猿猴摘果。拉伸侧身肌肉。每侧重复8次。" },
      "8": { "name": "关门式", "label": "关门", "desc": "双手缓缓向中心合拢，关闭门户，将积蓄的能量封存于内。长寿功收式。" }
    }
  }
}
```

- [ ] **Step 3.5: Подключить i18n в main.tsx**

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3.6: Написать тест на i18n**

```ts
// src/i18n.test.ts
import { describe, it, expect } from 'vitest'
import i18n from './i18n'

describe('i18n', () => {
  it('default language is ru', () => {
    expect(i18n.language).toBe('ru')
  })

  it('translates hero hieroglyph', () => {
    expect(i18n.t('hero.hieroglyph')).toBe('炁體源流')
  })

  it('switches to en', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('hero.subtitle')).toBe('Daoist Practices · Health and Meditation')
    await i18n.changeLanguage('ru')
  })
})
```

- [ ] **Step 3.7: Запустить тест**

```powershell
npm run test
```

Ожидаем: `3 passed`.

- [ ] **Step 3.8: Commit**

```powershell
git add -A
git commit -m "feat: i18n setup with ru/en/zh translations"
```

---

## Task 4: Данные упражнений

**Files:**
- Create: `src/data/exercises.ts`
- Create: `src/data/exercises.test.ts`

- [ ] **Step 4.1: Написать тест на данные**

```ts
// src/data/exercises.test.ts
import { describe, it, expect } from 'vitest'
import { JINGANG, CHANGSHOU, getExercisesBySection } from './exercises'

describe('exercises data', () => {
  it('jingang has 8 exercises', () => {
    expect(JINGANG).toHaveLength(8)
  })

  it('changshou has 8 exercises', () => {
    expect(CHANGSHOU).toHaveLength(8)
  })

  it('each exercise has required fields', () => {
    [...JINGANG, ...CHANGSHOU].forEach(ex => {
      expect(ex.id).toBeGreaterThan(0)
      expect(ex.sectionKey).toMatch(/^(jingang|changshou)$/)
      expect(ex.nameKey).toBeTruthy()
      expect(ex.descriptionKey).toBeTruthy()
    })
  })

  it('getExercisesBySection returns correct subset', () => {
    expect(getExercisesBySection('jingang')).toHaveLength(8)
    expect(getExercisesBySection('changshou')).toHaveLength(8)
  })
})
```

- [ ] **Step 4.2: Запустить тест — убедиться что FAIL**

```powershell
npm run test
```

Ожидаем: ошибка `Cannot find module './exercises'`.

- [ ] **Step 4.3: Создать src/data/exercises.ts**

```ts
// src/data/exercises.ts
export type SectionKey = 'jingang' | 'changshou'

export interface Exercise {
  id: number
  sectionKey: SectionKey
  nameKey: string
  labelKey: string
  descriptionKey: string
  image?: string
  video?: string
}

export const JINGANG: Exercise[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  sectionKey: 'jingang',
  nameKey: `exercises.jingang.${i + 1}.name`,
  labelKey: `exercises.jingang.${i + 1}.label`,
  descriptionKey: `exercises.jingang.${i + 1}.desc`,
}))

export const CHANGSHOU: Exercise[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  sectionKey: 'changshou',
  nameKey: `exercises.changshou.${i + 1}.name`,
  labelKey: `exercises.changshou.${i + 1}.label`,
  descriptionKey: `exercises.changshou.${i + 1}.desc`,
}))

export function getExercisesBySection(section: SectionKey): Exercise[] {
  return section === 'jingang' ? JINGANG : CHANGSHOU
}
```

- [ ] **Step 4.4: Запустить тест — убедиться что PASS**

```powershell
npm run test
```

Ожидаем: `4 passed` (3 из i18n + 4 новых).

- [ ] **Step 4.5: Commit**

```powershell
git add -A
git commit -m "feat: exercise data types and placeholder arrays"
```

---

## Task 5: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 5.1: Создать src/components/Navbar.tsx**

```tsx
// src/components/Navbar.tsx
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
```

- [ ] **Step 5.2: Добавить Navbar в App.tsx**

```tsx
// src/App.tsx
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-bg-deep text-gold flex items-center justify-center">
        <h1 className="text-4xl font-serif tracking-widest gold-glow">炁體源流</h1>
      </div>
    </>
  )
}
```

- [ ] **Step 5.3: Визуальная проверка**

```powershell
npm run dev
```

Открыть `http://localhost:5173`. Верхний navbar должен быть с иероглифами слева и кнопками RU/EN/ZH справа. При прокрутке (добавь временно высоту) navbar должен становиться непрозрачным.

- [ ] **Step 5.4: Commit**

```powershell
git add src/components/Navbar.tsx src/App.tsx
git commit -m "feat: navbar with scroll effect and language switcher"
```

---

## Task 6: Hero секция

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 6.1: Создать src/components/Hero.tsx**

```tsx
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
        {/* Когда появится PNG мастера — заменить div на <img src="/images/master.png" /> */}
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <span className="text-5xl opacity-20">🧘</span>
          <span className="text-xs text-gold/40 tracking-widest font-sans text-center">
            Фото мастера<br />张至顺
          </span>
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
```

- [ ] **Step 6.2: Добавить Hero в App.tsx**

```tsx
// src/App.tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  )
}
```

- [ ] **Step 6.3: Визуальная проверка**

```powershell
npm run dev
```

Открыть `http://localhost:5173`. Должна быть тёмная страница с:
- Иероглифами «炁體源流» золотом по центру сверху
- Горами снизу (clip-path)
- Туманом
- Именем мастера снизу
- Пульсирующей подсказкой прокрутки

- [ ] **Step 6.4: Commit**

```powershell
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: cinematic hero section with framer motion animations"
```

---

## Task 7: BiographyScroll

**Files:**
- Create: `src/components/BiographyScroll.tsx`

- [ ] **Step 7.1: Создать src/components/BiographyScroll.tsx**

```tsx
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
          onMouseEnter={handleOpen}
          onMouseLeave={() => setOpen(false)}
          onClick={() => { setOpen(o => !o); setHintVisible(false) }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key="scroll-body"
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
          </AnimatePresence>
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
```

- [ ] **Step 7.2: Добавить BiographyScroll в App.tsx**

```tsx
// src/App.tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BiographyScroll from './components/BiographyScroll'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <BiographyScroll />
    </>
  )
}
```

- [ ] **Step 7.3: Визуальная проверка**

```powershell
npm run dev
```

Прокрутить вниз после hero — должен появиться свиток. Навести мышь — он раскрывается вниз, открывая биографию на бумажном фоне. Убрать мышь — закрывается.

- [ ] **Step 7.4: Commit**

```powershell
git add src/components/BiographyScroll.tsx src/App.tsx
git commit -m "feat: biography scroll with hover/click animation"
```

---

## Task 8: GateCircle

**Files:**
- Create: `src/components/GateCircle.tsx`

- [ ] **Step 8.1: Создать src/components/GateCircle.tsx**

```tsx
// src/components/GateCircle.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise } from '../data/exercises'

interface Props {
  exercise: Exercise
  onClick: (exercise: Exercise) => void
}

export default function GateCircle({ exercise, onClick }: Props) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onClick(exercise)}
    >
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-full relative overflow-hidden border-2 transition-all duration-300"
        style={{
          borderColor: '#4488cc66',
          background: 'radial-gradient(circle at 40% 35%, #1a4080 0%, #0a1e3a 60%, #060e1e 100%)',
          boxShadow: '0 0 15px #4488cc33, 0 0 30px #4488cc11, inset 0 0 20px #0a2040',
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            '0 0 25px #4488cc66, 0 0 50px #4488cc22, inset 0 0 20px #0a2040'
          ;(e.currentTarget as HTMLElement).style.borderColor = '#4488cc99'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            '0 0 15px #4488cc33, 0 0 30px #4488cc11, inset 0 0 20px #0a2040'
          ;(e.currentTarget as HTMLElement).style.borderColor = '#4488cc66'
        }}
      >
        {exercise.image ? (
          <img
            src={exercise.image}
            alt={t(exercise.nameKey)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            <span className="text-portal-blue/30 text-lg">☯</span>
            <span className="text-portal-blue/40 text-[0.42rem] font-sans tracking-wider text-center">
              {exercise.id}
            </span>
          </div>
        )}

        {/* Mist at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 rounded-b-full pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #1a406077, transparent)' }}
        />
      </div>

      <span
        className="text-[0.6rem] font-sans tracking-wider text-portal-blue/70 px-2 py-0.5 rounded-full border"
        style={{ borderColor: '#4488cc33', background: '#0a1628' }}
      >
        {exercise.id} · {t(exercise.labelKey)}
      </span>
    </motion.div>
  )
}
```

- [ ] **Step 8.2: Commit**

```powershell
git add src/components/GateCircle.tsx
git commit -m "feat: gate circle portal component with hover glow"
```

---

## Task 9: ExerciseModal

**Files:**
- Create: `src/components/ExerciseModal.tsx`

- [ ] **Step 9.1: Создать src/components/ExerciseModal.tsx**

```tsx
// src/components/ExerciseModal.tsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Exercise, SectionKey } from '../data/exercises'
import { getExercisesBySection } from '../data/exercises'

interface Props {
  exercise: Exercise | null
  sectionKey: SectionKey | null
  onClose: () => void
  onNavigate: (exercise: Exercise) => void
}

export default function ExerciseModal({ exercise, sectionKey, onClose, onNavigate }: Props) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!exercise) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [exercise, onClose])

  const exercises = sectionKey ? getExercisesBySection(sectionKey) : []
  const currentIndex = exercise ? exercises.findIndex(e => e.id === exercise.id) : -1
  const prev = currentIndex > 0 ? exercises[currentIndex - 1] : null
  const next = currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null

  const sectionZh = sectionKey ? t(`sections.${sectionKey}.zh`) : ''

  return (
    <AnimatePresence>
      {exercise && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: '#03070fcc' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #0d1e36, #081428)',
              border: '1px solid #4488cc55',
              boxShadow: '0 0 60px #4488cc22',
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Media area */}
            <div
              className="h-48 flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, #1a4080, #060e1e)',
                borderBottom: '1px solid #4488cc33',
              }}
            >
              <span className="absolute top-3 left-4 text-[0.55rem] text-portal-blue/60 font-sans tracking-widest">
                {sectionZh} · {t('modal.exercise')} {exercise.id}
              </span>

              {exercise.video ? (
                <iframe
                  src={exercise.video}
                  className="w-full h-full"
                  allowFullScreen
                  title={t(exercise.nameKey)}
                />
              ) : exercise.image ? (
                <img src={exercise.image} alt={t(exercise.nameKey)} className="h-full object-contain" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-portal-blue/40">
                  <span className="text-4xl">☯</span>
                  <span className="text-xs font-sans tracking-wider">{t('modal.placeholder')}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              <h3 className="text-gold font-serif text-lg tracking-wider mb-3">
                {t(exercise.nameKey)}
              </h3>
              <p className="text-text-muted text-sm leading-7 font-sans">
                {t(exercise.descriptionKey)}
              </p>
            </div>

            {/* Footer nav */}
            <div
              className="flex items-center justify-between px-6 py-3"
              style={{ borderTop: '1px solid #4488cc22' }}
            >
              <button
                onClick={() => prev && onNavigate(prev)}
                disabled={!prev}
                className="text-xs text-portal-blue/60 tracking-wider font-sans px-3 py-1.5 border rounded transition-all duration-200 disabled:opacity-20"
                style={{ borderColor: '#4488cc33' }}
                onMouseEnter={e => !(!prev) && ((e.target as HTMLElement).style.color = '#4488cc')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = '')}
              >
                {t('modal.prev')}
              </button>

              <button
                onClick={onClose}
                className="text-xs text-portal-blue/40 font-sans tracking-wider hover:text-portal-blue transition-colors"
              >
                {t('modal.close')}
              </button>

              <button
                onClick={() => next && onNavigate(next)}
                disabled={!next}
                className="text-xs text-portal-blue/60 tracking-wider font-sans px-3 py-1.5 border rounded transition-all duration-200 disabled:opacity-20"
                style={{ borderColor: '#4488cc33' }}
                onMouseEnter={e => !(!next) && ((e.target as HTMLElement).style.color = '#4488cc')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = '')}
              >
                {t('modal.next')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 9.2: Commit**

```powershell
git add src/components/ExerciseModal.tsx
git commit -m "feat: exercise modal with framer motion + keyboard close"
```

---

## Task 10: PracticeSection

**Files:**
- Create: `src/components/PracticeSection.tsx`

- [ ] **Step 10.1: Создать src/components/PracticeSection.tsx**

```tsx
// src/components/PracticeSection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GateCircle from './GateCircle'
import ExerciseModal from './ExerciseModal'
import { getExercisesBySection } from '../data/exercises'
import type { Exercise, SectionKey } from '../data/exercises'

interface Props {
  sectionKey: SectionKey
  bgClass?: string
}

export default function PracticeSection({ sectionKey, bgClass = 'bg-bg-section' }: Props) {
  const { t } = useTranslation()
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null)
  const exercises = getExercisesBySection(sectionKey)

  return (
    <section className={`${bgClass} py-20 px-4 flex flex-col items-center gap-10`}>
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="font-serif text-gold text-4xl md:text-5xl tracking-[0.15em] gold-glow">
          {t(`sections.${sectionKey}.zh`)}
        </div>
        <div className="text-text-muted text-xs tracking-[0.3em] font-sans mt-2 uppercase">
          {t(`sections.${sectionKey}.sub`)}
        </div>
      </motion.div>

      {/* Divider */}
      <div
        className="w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #d4a85366, transparent)' }}
      />

      {/* Gates grid */}
      <motion.div
        className="grid gap-5"
        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', maxWidth: 500 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {exercises.map(exercise => (
          <GateCircle
            key={exercise.id}
            exercise={exercise}
            onClick={setActiveExercise}
          />
        ))}
      </motion.div>

      {/* Modal */}
      <ExerciseModal
        exercise={activeExercise}
        sectionKey={sectionKey}
        onClose={() => setActiveExercise(null)}
        onNavigate={setActiveExercise}
      />
    </section>
  )
}
```

- [ ] **Step 10.2: Commit**

```powershell
git add src/components/PracticeSection.tsx
git commit -m "feat: practice section with 8 gates and modal integration"
```

---

## Task 11: Финальная сборка App.tsx + Footer

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 11.1: Собрать финальный App.tsx**

```tsx
// src/App.tsx
import { Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BiographyScroll from './components/BiographyScroll'
import PracticeSection from './components/PracticeSection'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  return (
    <footer
      className="py-10 text-center bg-[#040810]"
      style={{ borderTop: '1px solid #d4a85322' }}
    >
      <div className="font-serif text-gold text-xl tracking-widest gold-glow mb-2">
        炁體源流
      </div>
      <div className="text-[#44556677] text-xs tracking-widest font-sans">
        {t('footer.sub')}
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Navbar />
      <main>
        <Hero />
        <BiographyScroll />
        <PracticeSection sectionKey="jingang" bgClass="bg-bg-section" />
        <PracticeSection sectionKey="changshou" bgClass="bg-bg-darker" />
      </main>
      <Footer />
    </Suspense>
  )
}
```

- [ ] **Step 11.2: Полная визуальная проверка**

```powershell
npm run dev
```

Открыть `http://localhost:5173` и пройти весь лендинг:
- Hero с иероглифами, горами, туманом ✓
- Свиток биографии раскрывается при наведении ✓
- Секция «Алмазная крепость» — 8 синих порталов в сетке 4×2 ✓
- Клик на портал открывает модальное окно с описанием ✓
- Кнопки «←» / «→» в модале переключают упражнения ✓
- Секция «Долголетие» аналогично ✓
- Footer с иероглифами ✓
- Переключатель языков в navbar — сайт меняет язык ✓

- [ ] **Step 11.3: Запустить все тесты**

```powershell
npm run test
```

Ожидаем: все тесты `passed`.

- [ ] **Step 11.4: Commit**

```powershell
git add src/App.tsx
git commit -m "feat: final app assembly with all sections and footer"
```

---

## Task 12: Адаптивность под мобайл

**Files:**
- Modify: `src/components/PracticeSection.tsx`
- Modify: `src/components/GateCircle.tsx`
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 12.1: Сетка порталов — 2 колонки на мобайле**

В `PracticeSection.tsx` заменить `style={{ gridTemplateColumns: ... }}` на Tailwind классы:

```tsx
// заменить строку с style={{ gridTemplateColumns... }} на:
<div className="grid grid-cols-2 sm:grid-cols-4 gap-5" style={{ maxWidth: 500 }}>
```

- [ ] **Step 12.2: Проверить адаптивность**

В DevTools браузера (F12) переключить на мобильный вид (iPhone SE, 375px). Сетка должна стать 2×4, порталы чуть меньше. Swiper без горизонтального скролла.

- [ ] **Step 12.3: Navbar на мобайле — скрыть текст логотипа частично**

В `Navbar.tsx` добавить усечение если нужно (опционально, зависит от размера экрана — проверить).

- [ ] **Step 12.4: Финальный commit**

```powershell
git add -A
git commit -m "feat: responsive layout - 2-col gate grid on mobile"
```

---

## Self-review checklist

После написания плана — проверка покрытия спека:

| Требование спека | Задача |
|---|---|
| React + Vite + TS + Tailwind + Framer Motion | Task 1-2 |
| i18n: ru/en/zh | Task 3 |
| Tailwind дизайн-токены | Task 2 |
| Данные упражнений (16 шт) | Task 4 |
| Navbar fixed + scroll effect + язык | Task 5 |
| Hero cinematic: иероглифы + горы + мастер | Task 6 |
| Свиток биографии hover/click | Task 7 |
| Синие порталы с туманом | Task 8 |
| Модальное окно + Escape + nav | Task 9 |
| PracticeSection × 2 | Task 10 |
| Footer | Task 11 |
| Адаптивность 2/4 col | Task 12 |

Все требования покрыты. ✓

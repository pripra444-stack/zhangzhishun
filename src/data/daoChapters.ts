// src/data/daoChapters.ts

export interface DaoChapter {
  id: number
  zhTitle: string        // Chinese title shown in sidebar
  titleKey: string       // i18n key for Russian title
  bodyKey: string        // i18n key for body text (newline-separated paragraphs)
  meridianImage?: string // filename in /images/, only chapters with meridian art
}

export const DAO_CHAPTERS: DaoChapter[] = [
  {
    id: 1,
    zhTitle: '道',
    titleKey: 'dao.ch1.title',
    bodyKey: 'dao.ch1.body',
  },
  {
    id: 2,
    zhTitle: '炁',
    titleKey: 'dao.ch2.title',
    bodyKey: 'dao.ch2.body',
  },
  {
    id: 3,
    zhTitle: '八脉',
    titleKey: 'dao.ch3.title',
    bodyKey: 'dao.ch3.body',
    meridianImage: 'meridian-overview.png',
  },
  {
    id: 4,
    zhTitle: '阴阳',
    titleKey: 'dao.ch4.title',
    bodyKey: 'dao.ch4.body',
  },
  {
    id: 5,
    zhTitle: '五行',
    titleKey: 'dao.ch5.title',
    bodyKey: 'dao.ch5.body',
  },
  {
    id: 6,
    zhTitle: '修炼',
    titleKey: 'dao.ch6.title',
    bodyKey: 'dao.ch6.body',
  },
]

export const MERIDIAN_DIAGRAMS = [
  { id: 1, zhName: '冲脉', ruName: 'Чун-май — Пронизывающий канал', image: 'meridian-01.png' },
  { id: 2, zhName: '带脉', ruName: 'Дай-май — Опоясывающий канал', image: 'meridian-02.png' },
  { id: 3, zhName: '阴跷脉', ruName: 'Инь-цяо-май — Канал Инь-подъёма', image: 'meridian-03.png' },
  { id: 4, zhName: '阳跷脉', ruName: 'Ян-цяо-май — Канал Ян-подъёма', image: 'meridian-04.png' },
  { id: 5, zhName: '阴俞脉', ruName: 'Инь-вэй-май — Канал Инь-связи', image: 'meridian-05.png' },
  { id: 6, zhName: '阳俞脉', ruName: 'Ян-вэй-май — Канал Ян-связи', image: 'meridian-06.png' },
  { id: 7, zhName: '任脉', ruName: 'Жэнь-май — Канал Зачатия', image: 'meridian-07.png' },
  { id: 8, zhName: '督脉', ruName: 'Ду-май — Управляющий канал', image: 'meridian-08.png' },
]

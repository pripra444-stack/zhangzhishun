// src/data/daoChapters.ts

export interface DaoChapter {
  id: number
  zhTitle: string        // Chinese title shown in sidebar
  titleKey: string       // i18n key for Russian title
  bodyKey: string        // i18n key for body text (newline-separated paragraphs)
}

export interface MeridianDiagram {
  id: number
  zhName: string
  ruName: string
  image: string   // filename in /images/ — empty string means no image yet
}

export const DAO_CHAPTERS: DaoChapter[] = [
  { id: 1, zhTitle: '道',  titleKey: 'dao.ch1.title', bodyKey: 'dao.ch1.body' },
  { id: 2, zhTitle: '炁',  titleKey: 'dao.ch2.title', bodyKey: 'dao.ch2.body' },
  { id: 3, zhTitle: '八脉', titleKey: 'dao.ch3.title', bodyKey: 'dao.ch3.body' },
  { id: 4, zhTitle: '阴阳', titleKey: 'dao.ch4.title', bodyKey: 'dao.ch4.body' },
  { id: 5, zhTitle: '五行', titleKey: 'dao.ch5.title', bodyKey: 'dao.ch5.body' },
  { id: 6, zhTitle: '修炼', titleKey: 'dao.ch6.title', bodyKey: 'dao.ch6.body' },
]

// Eight extraordinary meridians (奇经八脉)
// First 4 have real photos; last 4 are placeholders until images arrive
export const MERIDIAN_DIAGRAMS: MeridianDiagram[] = [
  { id: 1, zhName: '冲脉', ruName: 'Чун-май — Серединный канал',         image: 'meridian-chongmai.png' },
  { id: 2, zhName: '任脉', ruName: 'Жэнь-май — Передний срединный',      image: 'meridian-renmai.png'   },
  { id: 3, zhName: '督脉', ruName: 'Ду-май — Задний срединный',           image: 'meridian-dumai.png'    },
  { id: 4, zhName: '带脉', ruName: 'Дай-май — Поясной канал',             image: 'meridian-daimai.png'   },
  { id: 5, zhName: '阴跷脉', ruName: 'Инь-цяо-май — Канал Инь-подъёма', image: ''                       },
  { id: 6, zhName: '阳跷脉', ruName: 'Ян-цяо-май — Канал Ян-подъёма',   image: ''                       },
  { id: 7, zhName: '阴维脉', ruName: 'Инь-вэй-май — Канал Инь-связи',   image: ''                       },
  { id: 8, zhName: '阳维脉', ruName: 'Ян-вэй-май — Канал Ян-связи',     image: ''                       },
]

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

const JINGANG_IMAGES: Record<number, string> = {
  1: '/images/exercise-01.png',
  2: '/images/exercise-02.png',
  3: '/images/exercise-03.png',
  4: '/images/exercise-04.png',
  5: '/images/exercise-05.png',
  6: '/images/exercise-06.png',
  7: '/images/exercise-07.png',
  8: '/images/exercise-08.png',
}

export const JINGANG: Exercise[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  sectionKey: 'jingang',
  nameKey: `exercises.jingang.${i + 1}.name`,
  labelKey: `exercises.jingang.${i + 1}.label`,
  descriptionKey: `exercises.jingang.${i + 1}.desc`,
  image: JINGANG_IMAGES[i + 1] ?? '/images/exercise-placeholder.png',
}))

export const CHANGSHOU: Exercise[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  sectionKey: 'changshou',
  nameKey: `exercises.changshou.${i + 1}.name`,
  labelKey: `exercises.changshou.${i + 1}.label`,
  descriptionKey: `exercises.changshou.${i + 1}.desc`,
  image: '/images/exercise-placeholder.png',
}))

export function getExercisesBySection(section: SectionKey): Exercise[] {
  return section === 'jingang' ? JINGANG : CHANGSHOU
}

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

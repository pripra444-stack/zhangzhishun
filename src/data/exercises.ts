import { img } from '../utils/assets'

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
  1: img('/images/exercise-01.png'),
  2: img('/images/exercise-02.png'),
  3: img('/images/exercise-03.png'),
  4: img('/images/exercise-04.png'),
  5: img('/images/exercise-05.png'),
  6: img('/images/exercise-06.png'),
  7: img('/images/exercise-07.png'),
  8: img('/images/exercise-08.png'),
}

const JINGANG_VIDEOS: Record<number, string> = {
  1: img('/images/exercise-01.mp4'),
  2: img('/images/exercise-02.mp4'),
  3: img('/images/exercise-03.mp4'),
  4: img('/images/exercise-04.mp4'),
  5: img('/images/exercise-05.mp4'),
  6: img('/images/exercise-06.mp4'),
  7: img('/images/exercise-07.mp4'),
  8: img('/images/exercise-08.mp4'),
}

export const JINGANG: Exercise[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  sectionKey: 'jingang',
  nameKey: `exercises.jingang.${i + 1}.name`,
  labelKey: `exercises.jingang.${i + 1}.label`,
  descriptionKey: `exercises.jingang.${i + 1}.desc`,
  image: JINGANG_IMAGES[i + 1] ?? img('/images/exercise-placeholder.png'),
  video: JINGANG_VIDEOS[i + 1],
}))

const CHANGSHOU_VIDEOS: Record<number, string> = {
  1: img('/images/changshou-01.mp4'),
  2: img('/images/changshou-02.mp4'),
  3: img('/images/changshou-03.mp4'),
  4: img('/images/changshou-04.mp4'),
  5: img('/images/changshou-05.mp4'),
  6: img('/images/changshou-06.mp4'),
  7: img('/images/changshou-07.mp4'),
  8: img('/images/changshou-08.mp4'),
}

const CHANGSHOU_IMAGES: Record<number, string> = {
  1: img('/images/changshou-01.png'),
  2: img('/images/changshou-02.png'),
  3: img('/images/changshou-03.png'),
  4: img('/images/changshou-04.png'),
  5: img('/images/changshou-05.png'),
  6: img('/images/changshou-06.png'),
  7: img('/images/changshou-07.png'),
  8: img('/images/changshou-08.png'),
}

export const CHANGSHOU: Exercise[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  sectionKey: 'changshou',
  nameKey: `exercises.changshou.${i + 1}.name`,
  labelKey: `exercises.changshou.${i + 1}.label`,
  descriptionKey: `exercises.changshou.${i + 1}.desc`,
  image: CHANGSHOU_IMAGES[i + 1] ?? img('/images/exercise-placeholder.png'),
  video: CHANGSHOU_VIDEOS[i + 1],
}))

export function getExercisesBySection(section: SectionKey): Exercise[] {
  return section === 'jingang' ? JINGANG : CHANGSHOU
}

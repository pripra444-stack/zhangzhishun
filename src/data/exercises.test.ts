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
    ;[...JINGANG, ...CHANGSHOU].forEach(ex => {
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

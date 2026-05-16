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

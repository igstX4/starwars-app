import { describe, it, expect } from 'vitest'
import { extractId, normalizeIdArray } from './id'

describe('id utils', () => {
  it('extractId from number', () => {
    expect(extractId(42)).toBe(42)
  })

  it('extractId from url', () => {
    expect(extractId('https://sw-api.starnavi.io/people/21/')).toBe(21)
    expect(extractId('films/5')).toBe(5)
    expect(Number.isNaN(extractId(''))).toBe(true)
  })

  it('normalizeIdArray filters and maps correctly', () => {
    expect(normalizeIdArray([1, '2', 'people/3/', 'bad', undefined])).toEqual([1, 2, 3])
  })
})



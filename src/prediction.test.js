import { describe, it, expect } from 'vitest'
import { predict } from './prediction'

describe('predict', () => {
  it('returns plays: true when all conditions met', () => {
    expect(predict({ maxTemp: 26, precipitation: 0, windSpeed: 20 }))
      .toEqual({ plays: true, reason: 'All conditions met' })
  })

  it('returns plays: false when exactly 25°C (not above)', () => {
    const result = predict({ maxTemp: 25, precipitation: 0, windSpeed: 20 })
    expect(result.plays).toBe(false)
    expect(result.reason).toBe('Too cold (25°C)')
  })

  it('returns plays: false when too cold', () => {
    const result = predict({ maxTemp: 18, precipitation: 0, windSpeed: 20 })
    expect(result.plays).toBe(false)
    expect(result.reason).toBe('Too cold (18°C)')
  })

  it('returns plays: false when raining', () => {
    const result = predict({ maxTemp: 26, precipitation: 3, windSpeed: 20 })
    expect(result.plays).toBe(false)
    expect(result.reason).toBe('Rain expected (3mm)')
  })

  it('returns plays: false when too windy', () => {
    const result = predict({ maxTemp: 26, precipitation: 0, windSpeed: 35 })
    expect(result.plays).toBe(false)
    expect(result.reason).toBe('Too windy (35 km/h)')
  })

  it('returns plays: false at exactly 30 km/h (not below)', () => {
    const result = predict({ maxTemp: 26, precipitation: 0, windSpeed: 30 })
    expect(result.plays).toBe(false)
    expect(result.reason).toBe('Too windy (30 km/h)')
  })

  it('combines multiple failure reasons with " and "', () => {
    const result = predict({ maxTemp: 20, precipitation: 5, windSpeed: 20 })
    expect(result.plays).toBe(false)
    expect(result.reason).toBe('Too cold (20°C) and Rain expected (5mm)')
  })

  it('combines all three failures', () => {
    const result = predict({ maxTemp: 20, precipitation: 5, windSpeed: 40 })
    expect(result.plays).toBe(false)
    expect(result.reason).toBe('Too cold (20°C) and Rain expected (5mm) and Too windy (40 km/h)')
  })
})

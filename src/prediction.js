export function predict({ maxTemp, precipitation, windSpeed }) {
  const failures = []

  if (maxTemp <= 25) failures.push(`Too cold (${maxTemp}°C)`)
  if (precipitation > 0) failures.push(`Rain expected (${precipitation}mm)`)
  if (windSpeed >= 30) failures.push(`Too windy (${windSpeed} km/h)`)

  if (failures.length === 0) {
    return { plays: true, reason: 'All conditions met' }
  }

  return { plays: false, reason: failures.join(' and ') }
}

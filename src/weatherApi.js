const BASE_URL = 'https://api.open-meteo.com/v1/forecast'
const LONDON = { latitude: 51.5074, longitude: -0.1278 }
const DAILY_FIELDS = [
  'temperature_2m_max',
  'precipitation_sum',
  'wind_speed_10m_max',
].join(',')

export async function fetchForecast() {
  const params = new URLSearchParams({
    latitude: LONDON.latitude,
    longitude: LONDON.longitude,
    daily: DAILY_FIELDS,
    timezone: 'Europe/London',
    forecast_days: 16,
  })

  const response = await fetch(`${BASE_URL}?${params}`)
  if (!response.ok) throw new Error(`Weather API error: ${response.status}`)

  const data = await response.json()

  return data.daily.time.map((date, i) => ({
    date,
    maxTemp: data.daily.temperature_2m_max[i],
    precipitation: data.daily.precipitation_sum[i],
    windSpeed: data.daily.wind_speed_10m_max[i],
  }))
}

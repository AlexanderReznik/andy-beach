import { useState, useEffect } from 'react'
import { fetchForecast } from './weatherApi'
import { predict } from './prediction'
import { DayCard } from './components/DayCard'
import './App.css'

export default function App() {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchForecast()
      .then(forecast => {
        setDays(forecast.map(day => ({ ...day, ...predict(day) })))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="status">Loading London forecast...</div>
  if (error) return <div className="status status--error">Failed to load forecast: {error}</div>

  return (
    <div className="app">
      <h1 className="app__title">Will Andy play beach volleyball?</h1>
      <p className="app__subtitle">London forecast — plays when sunny (&gt;25°C), dry, and calm (&lt;30 km/h)</p>
      <div className="app__cards">
        {days.map(day => (
          <DayCard key={day.date} {...day} />
        ))}
      </div>
    </div>
  )
}

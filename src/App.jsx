import { useState, useEffect } from 'react'
import { fetchForecast } from './weatherApi'
import { predict } from './prediction'
import { DayCard } from './components/DayCard'
import './App.css'

const PAGE_SIZE = 7

export default function App() {
  const [days, setDays] = useState([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchForecast()
      .then(forecast => {
        const today = new Date().toLocaleDateString('sv')
        setDays(forecast.map(day => ({
          ...day,
          ...predict(day),
          isToday: day.date === today,
        })))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="status">Loading London forecast...</div>
  if (error) return <div className="status status--error">Failed to load forecast: {error}</div>

  const visibleDays = days.slice(0, visibleCount)
  const hasMore = visibleCount < days.length

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <p className="app__eyebrow">London · Beach Volleyball</p>
          <h1 className="app__title">Will Andy play<span className="app__title-mark">?</span></h1>
          <p className="app__subtitle">Plays when &gt;25°C, no rain, wind &lt;30 km/h</p>
        </div>
      </header>
      <main className="calendar">
        {visibleDays.map(day => (
          <DayCard key={day.date} {...day} />
        ))}
      </main>
      {hasMore && (
        <button className="app__load-more" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
          Show more days
        </button>
      )}
    </div>
  )
}

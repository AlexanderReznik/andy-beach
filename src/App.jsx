import { useState, useEffect } from 'react'
import { fetchForecast } from './weatherApi'
import { predict } from './prediction'
import { DayCard, EmptyCard } from './components/DayCard'
import './App.css'

const PAGE_SIZE = 7

function buildCalendarEntries(visibleDays, isExpanded) {
  if (!isExpanded || visibleDays.length === 0) return visibleDays

  const firstDate = new Date(visibleDays[0].date + 'T12:00:00')
  const lastDate = new Date(visibleDays[visibleDays.length - 1].date + 'T12:00:00')

  // Monday-first: (getDay() + 6) % 7 gives 0 for Mon … 6 for Sun
  const startOffset = (firstDate.getDay() + 6) % 7
  // Days needed after last day to reach Sunday: (7 - getDay()) % 7
  const endOffset = (7 - lastDate.getDay()) % 7

  const before = Array.from({ length: startOffset }, (_, i) => {
    const d = new Date(firstDate)
    d.setDate(d.getDate() - startOffset + i)
    return { date: d.toLocaleDateString('sv'), placeholder: true }
  })

  const after = Array.from({ length: endOffset }, (_, i) => {
    const d = new Date(lastDate)
    d.setDate(d.getDate() + i + 1)
    return { date: d.toLocaleDateString('sv'), placeholder: true }
  })

  return [...before, ...visibleDays, ...after]
}

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

  const isExpanded = visibleCount > PAGE_SIZE
  const visibleDays = days.slice(0, visibleCount)
  const calendarEntries = buildCalendarEntries(visibleDays, isExpanded)
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
        {calendarEntries.map(entry =>
          entry.placeholder
            ? <EmptyCard key={`empty-${entry.date}`} date={entry.date} />
            : <DayCard key={entry.date} {...entry} />
        )}
      </main>
      {hasMore && (
        <button className="app__load-more" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
          Show more days
        </button>
      )}
    </div>
  )
}

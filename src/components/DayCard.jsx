import { useState } from 'react'
import './DayCard.css'

const DAY_ABBR = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const EXCUSES = [
  "Forgot sunscreen, not risking it",
  "My lucky shorts are in the wash",
  "The sand looked at me funny",
  "Mercury is in retrograde",
  "Sock drawer needs reorganising",
  "Too nice out, something's definitely wrong",
  "Arms tired from waving at people",
  "Volleyball is having an existential crisis",
  "Already watched beach volleyball on TV, feels redundant",
  "Can't find my sunglasses and the sun is too sunny",
  "Need to stay home and water my plants",
  "Concerned about the emotional wellbeing of the ball",
  "My horoscope said to avoid sand",
  "Netflix just dropped something",
  "Beach is too beachy today",
]

function pickExcuse() {
  return EXCUSES[Math.floor(Math.random() * EXCUSES.length)]
}

export function EmptyCard({ date }) {
  const d = new Date(`${date}T12:00:00`)
  const dayAbbr = DAY_ABBR[d.getDay()]
  const dayNum = d.getDate()

  return (
    <div className="day-cell day-cell--empty">
      <div className="day-cell__header">
        <span className="day-cell__abbr">{dayAbbr}</span>
      </div>
      <div className="day-cell__date-num">
        {dayNum}
        <span className="day-cell__month">{MONTHS[d.getMonth()]}</span>
      </div>
      <div className="day-cell__empty-body" />
    </div>
  )
}

export function DayCard({ date, maxTemp, precipitation, windSpeed, plays, reason, isToday }) {
  const [excuse, setExcuse] = useState(null)

  const d = new Date(`${date}T12:00:00`)
  const dayAbbr = DAY_ABBR[d.getDay()]
  const dayNum = d.getDate()

  const effectivePlays = plays && !excuse
  const effectiveReason = excuse ?? reason

  return (
    <article className={`day-cell ${effectivePlays ? 'day-cell--plays' : 'day-cell--no-play'} ${isToday ? 'day-cell--today' : ''}`}>
      <div className="day-cell__header">
        <span className="day-cell__abbr">{dayAbbr}</span>
        {isToday && <span className="day-cell__today-badge">Today</span>}
      </div>

      <div className="day-cell__date-num">
        {dayNum}
        <span className="day-cell__month">{MONTHS[d.getMonth()]}</span>
      </div>

      <div className="day-cell__stats">
        <div className="day-cell__stat">
          <span className="day-cell__stat-icon">☀</span>
          <span className="day-cell__stat-val">{maxTemp}°</span>
        </div>
        <div className="day-cell__stat">
          <span className="day-cell__stat-icon">☂</span>
          <span className="day-cell__stat-val">{precipitation}mm</span>
        </div>
        <div className="day-cell__stat">
          <span className="day-cell__stat-icon">~</span>
          <span className="day-cell__stat-val">{windSpeed}km/h</span>
        </div>
      </div>

      <div className="day-cell__verdict">
        <span className={`day-cell__verdict-badge ${effectivePlays ? 'day-cell__verdict-badge--yes' : 'day-cell__verdict-badge--no'}`}>
          {effectivePlays ? 'Will play' : "Won't play"}
        </span>
        <p className="day-cell__reason">{effectiveReason}</p>
      </div>

      {plays && (
        <button
          className={`day-cell__excuse-btn${excuse ? ' day-cell__excuse-btn--used' : ''}`}
          onClick={() => setExcuse(pickExcuse())}
        >
          Come up with excuse anyway
        </button>
      )}
    </article>
  )
}

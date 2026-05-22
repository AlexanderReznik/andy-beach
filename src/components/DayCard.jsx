import './DayCard.css'

const DAY_ABBR = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export function DayCard({ date, maxTemp, precipitation, windSpeed, plays, reason, isToday }) {
  const d = new Date(`${date}T12:00:00`)
  const dayAbbr = DAY_ABBR[d.getDay()]
  const dayNum = d.getDate()

  return (
    <article className={`day-cell ${plays ? 'day-cell--plays' : 'day-cell--no-play'} ${isToday ? 'day-cell--today' : ''}`}>
      <div className="day-cell__header">
        <span className="day-cell__abbr">{dayAbbr}</span>
        {isToday && <span className="day-cell__today-badge">Today</span>}
      </div>

      <div className="day-cell__date-num">{dayNum}</div>

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
        <span className={`day-cell__verdict-badge ${plays ? 'day-cell__verdict-badge--yes' : 'day-cell__verdict-badge--no'}`}>
          {plays ? 'Will play' : "Won't play"}
        </span>
        <p className="day-cell__reason">{reason}</p>
      </div>
    </article>
  )
}

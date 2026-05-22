import './DayCard.css'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function DayCard({ date, maxTemp, precipitation, windSpeed, plays, reason }) {
  const dayName = DAY_NAMES[new Date(`${date}T12:00:00`).getDay()]

  return (
    <div className={`day-card ${plays ? 'day-card--plays' : 'day-card--no-play'}`}>
      <div className="day-card__day">{dayName}</div>
      <div className="day-card__date">{date}</div>
      <div className="day-card__weather">
        <span className="day-card__stat">🌡 {maxTemp}°C</span>
        <span className="day-card__stat">🌧 {precipitation}mm</span>
        <span className="day-card__stat">💨 {windSpeed} km/h</span>
      </div>
      <div className={`day-card__verdict ${plays ? 'day-card__verdict--yes' : 'day-card__verdict--no'}`}>
        {plays ? '✅ Will play' : "❌ Won't play"}
      </div>
      <div className="day-card__reason">{reason}</div>
    </div>
  )
}

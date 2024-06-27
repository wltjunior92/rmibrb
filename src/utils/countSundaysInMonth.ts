import dayjs, { Dayjs } from 'dayjs'

export function countSundaysInMonth(date: Date): Dayjs[] {
  const countSunday: Dayjs[] = []
  const dateInfo = dayjs(date)

  const daysInMonth = dateInfo.daysInMonth()

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = dateInfo.set('date', day)
    if (currentDay.day() === 0) {
      countSunday.push(currentDay)
    }
  }

  return countSunday
}

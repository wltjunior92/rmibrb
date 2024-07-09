import dayjs from 'dayjs'
import { CalendarPlus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { RotationCard, RotationProps } from '@/components/rotation/RotationCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getEventsByMonth } from '@/services/rotationsService'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { countSundaysInMonth } from '@/utils/countSundaysInMonth'

export function Rotation() {
  const [date, setDate] = useState(new Date())

  const rotationTitle = capitalizeFirstLetter(
    dayjs(date).format('MMMM [de] YYYY'),
  )

  const eventsCP = countSundaysInMonth(date).map((item) => {
    return {
      date: item,
      rotation: undefined,
    }
  }) as RotationProps[]

  const eventsEBD = countSundaysInMonth(date).map((item) => {
    return {
      date: item,
      rotation: undefined,
    }
  }) as RotationProps[]

  function handleNextMonth(action: 'add' | 'subtract') {
    setDate((state) => {
      if (action === 'add') {
        return dayjs(state).add(1, 'month').toDate()
      } else {
        return dayjs(state).subtract(1, 'month').toDate()
      }
    })
  }

  useEffect(() => {
    getEventsByMonth(dayjs(date))
  }, [date])

  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-6 text-2xl font-bold">Escalas</h1>
      <main className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="col-span-12 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{rotationTitle}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNextMonth('subtract')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNextMonth('add')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="col-span-12">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Culto Público</CardTitle>
              <Button asChild>
                <Link to="/escalas/adicionar">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Adicionar
                </Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex w-full flex-1 gap-2 overflow-x-auto pb-2">
              {eventsCP &&
                eventsCP.map((item) => (
                  <RotationCard key={item.date.toISOString()} data={item} />
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:mt-6">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>EBD.</CardTitle>
              <Button>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex w-full flex-1 gap-2 overflow-x-auto pb-2">
              {eventsEBD &&
                eventsEBD.map((item) => (
                  <RotationCard key={item.date.toISOString()} data={item} />
                ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

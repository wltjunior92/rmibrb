import dayjs from 'dayjs'
import { CalendarPlus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { RotationCard, RotationProps } from '@/components/rotation/RotationCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { countSundaysInMonth } from '@/utils/countSundaysInMonth'

const rotationExample: RotationProps['rotation'] = {
  coordenador: {
    id: '1',
    name: 'Fulano',
    userFunction: 'Tenor',
  },
  voices: [
    {
      id: '2',
      name: 'Voz 1',
      userFunction: 'Barítono',
    },
    {
      id: '3',
      name: 'Voz 2',
      userFunction: 'Soprano',
    },
    {
      id: '4',
      name: 'Voz 3',
      userFunction: 'Contralto',
    },
    {
      id: '5',
      name: 'Voz 4',
      userFunction: 'Baixo',
    },
  ],
  instrumental: [
    {
      id: '6',
      name: 'Instrumental 1',
      userFunction: 'Baixo',
    },
    {
      id: '7',
      name: 'Instrumental 2',
      userFunction: 'Violão',
    },
    {
      id: '8',
      name: 'Instrumental 3',
      userFunction: 'Guitarra',
    },
    {
      id: '9',
      name: 'Instrumental 4',
      userFunction: 'Teclado',
    },
    {
      id: '10',
      name: 'Instrumental 5',
      userFunction: 'Trompete',
    },
  ],
  soundDesign: [
    {
      id: '11',
      name: 'Sonoplasta 1',
    },
  ],
  dataShow: [
    {
      id: '12',
      name: 'Data Show 1',
    },
    {
      id: '13',
      name: 'Data Show 2',
    },
  ],
}

export function Rotation() {
  const [date, setDate] = useState(new Date())
  const rotationTitle = capitalizeFirstLetter(
    dayjs(date).format('MMMM [de] YYYY'),
  )

  const eventsCP = countSundaysInMonth(date).map((item) => {
    return {
      date: item,
      rotation:
        dayjs(new Date()).month() === item.month()
          ? rotationExample
          : undefined,
    }
  }) as RotationProps[]
  const eventsEBD = countSundaysInMonth(date).map((item) => {
    return {
      date: item,
      rotation:
        dayjs(new Date()).month() === item.month()
          ? rotationExample
          : undefined,
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
              <Button>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Adicionar
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

        <Card className="col-span-12 md:mt-4">
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

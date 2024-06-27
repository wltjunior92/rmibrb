import dayjs from 'dayjs'

import { NewsCard } from '@/components/dashboard/NewsCard'
import { NextRotationCard } from '@/components/dashboard/NextRotationCard'

export function Dashboard() {
  const year = dayjs(new Date()).year()
  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-6 text-2xl font-bold">RMIBRB - {year}</h1>
      <main className="md:dashboard-news-max-height grid h-full grid-cols-1 gap-4 md:grid-cols-12">
        <NextRotationCard />
        <NewsCard />
      </main>
    </div>
  )
}

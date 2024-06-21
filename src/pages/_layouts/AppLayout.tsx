import { Outlet } from 'react-router-dom'

import Header from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16">
          <main className="flex p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

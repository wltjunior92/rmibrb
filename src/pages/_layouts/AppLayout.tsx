import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import Header from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { useAuth } from '@/context/AuthContext'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/lib/utils'

export function AppLayout() {
  const [status, setStatus] = useState(false)
  const { isOpen } = useSidebar()

  const { session } = useAuth()

  useEffect(() => {
    setStatus(true)
    setTimeout(() => setStatus(false), 1000)
  }, [status, isOpen])

  if (!session) {
    return <Navigate to="/sign-in" />
  }

  return (
    <div className="flex min-h-screen">
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16">
          <main
            className={cn(
              'flex h-full w-svw p-6',
              status && 'duration-1000',
              isOpen ? 'md:open-content-width' : 'md:closed-content-width',
            )}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Header from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { useAuth } from '@/context/AuthContext'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/lib/utils'
import { getTeamMemberData } from '@/services/signInService'

export function AppLayout() {
  const [status, setStatus] = useState(false)
  const { isOpen } = useSidebar()

  const { session, setTeamMember, isLoadingSession } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    setStatus(true)
    setTimeout(() => setStatus(false), 1000)
  }, [status, isOpen])

  useEffect(() => {
    if (isLoadingSession) return
    if (!session) {
      navigate('/sign-in', { replace: true })
    }
    getTeamMemberData({
      id: session!.user.id,
      email: session!.user.email,
      phone: session!.user.phone,
    })
      .then((data) => setTeamMember(data))
      .catch((error) => console.error(error))
  }, [session, setTeamMember, isLoadingSession, navigate])

  return (
    <div className="flex min-h-screen">
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16">
          <main
            className={cn(
              'flex h-full w-svw p-2 md:p-6',
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

import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'

import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/lib/utils'

import { SideNav } from './SideNav'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar()
  const [status, setStatus] = useState(false)

  const handleToggle = () => {
    setStatus(true)
    toggle()
    setTimeout(() => setStatus(false), 500)
  }

  return (
    <nav
      className={cn(
        `relative hidden h-screen overflow-x-hidden border-r border-gray-500 bg-gray-900 pt-20 md:block`,
        status && 'duration-500',
        isOpen ? 'w-52' : 'w-[58px]',
        className,
      )}
    >
      <ChevronLeft
        className={cn(
          'absolute right-4 top-20 cursor-pointer rounded-full bg-gray-900 text-3xl text-gray-100',
          !isOpen && 'rotate-180',
        )}
        onClick={handleToggle}
      />
      <div className="h-full space-y-4 py-4">
        <div className="h-full px-3 py-2">
          <div className="mt-3 h-full space-y-1">
            <SideNav isOpen={isOpen} status={status} />
          </div>
        </div>
      </div>
    </nav>
  )
}

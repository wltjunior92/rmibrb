import {
  BookUser,
  CalendarCog,
  LayoutDashboard,
  ListMusic,
  LogOut,
} from 'lucide-react'

import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { NavItem } from './NavItem'

interface SideNavProps {
  isOpen?: boolean
  status?: boolean
}

export function SideNav({ isOpen = true, status = false }: SideNavProps) {
  const { signOut } = useAuth()

  return (
    <div className="flex h-full flex-col">
      <main className="flex flex-col gap-2">
        <NavItem
          to="/dashboard"
          title="Dashboard"
          className={cn(
            'flex items-center rounded-sm p-2 font-medium text-gray-100 hover:bg-primary data-[current=true]:bg-primary',
            isOpen && 'gap-1.5',
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span
            className={cn(
              status && 'duration-500',
              isOpen ? 'inline' : 'hidden',
            )}
          >
            Dashboard
          </span>
        </NavItem>
        <NavItem
          to="/escalas"
          title="Escalas"
          className="flex items-center gap-1.5 rounded-sm p-2 font-medium text-gray-100 hover:bg-primary data-[current=true]:bg-primary"
        >
          <CalendarCog className="h-4 w-4" />
          <span
            className={cn(
              status && 'duration-500',
              isOpen ? 'inline' : 'hidden',
            )}
          >
            Escalas
          </span>
        </NavItem>
        <NavItem
          to="/equipe"
          title="Equipe"
          className="flex items-center gap-1.5 rounded-sm p-2 font-medium text-gray-100 hover:bg-primary data-[current=true]:bg-primary"
        >
          <BookUser className="h-4 w-4" />
          <span
            className={cn(
              status && 'duration-500',
              isOpen ? 'inline' : 'hidden',
            )}
          >
            Equipe
          </span>
        </NavItem>
        <NavItem
          to="/repertorio"
          title="Repertório"
          className="flex items-center gap-1.5 rounded-sm p-2 font-medium text-gray-100 hover:bg-primary data-[current=true]:bg-primary"
        >
          <ListMusic className="h-4 w-4" />
          <span
            className={cn(
              status && 'duration-500',
              isOpen ? 'inline' : 'hidden',
            )}
          >
            Repertório
          </span>
        </NavItem>
      </main>
      <Button
        className="mb-10 mt-auto flex w-full justify-start gap-1.5 p-2 text-sm font-medium leading-none text-gray-100"
        variant="ghost"
        title="Sair"
        onClick={signOut}
      >
        <LogOut className="h-4 w-4" />
        <span
          className={cn(status && 'duration-500', isOpen ? 'inline' : 'hidden')}
        >
          Sair
        </span>
      </Button>
    </div>
  )
}

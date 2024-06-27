import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { Logo } from '../Logo'
import { ThemeToggle } from '../theme/themeToggle'
import { MobileSidebar } from './MobileSidebar'

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-[99999] border-b border-gray-500 bg-gray-900 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          to={'/dashboard'}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <Logo
            className="h-8 w-8"
            withText={false}
            logoColor="fill-gray-100"
          />
          <h1 className="text-lg font-semibold text-gray-100">RMIBRB</h1>
        </Link>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}

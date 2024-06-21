import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface ThemeToggleProps {
  variant?: 'dark' | 'auto'
}

export function ThemeToggle({ variant = 'dark' }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={toggleTheme}
            variant="outline"
            className={cn(
              variant === 'dark' &&
                'border-gray-500 bg-gray-900 text-gray-100 hover:bg-gray-800 hover:text-gray-100',
            )}
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === 'dark' ? 'Modo claro' : 'Modo escuro'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

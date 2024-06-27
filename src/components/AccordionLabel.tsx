import { CircleAlert } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

interface AccordionLabelProps {
  hasUser?: boolean
  title: string
  tooltipMessage: string
}

export function AccordionLabel({
  hasUser = false,
  title,
  tooltipMessage,
}: AccordionLabelProps) {
  return (
    <div className="flex items-center gap-2">
      {title}
      {hasUser && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="relative flex h-4 w-4">
                <CircleAlert className="absolute inline-flex h-4 w-4 animate-ping text-primary" />
                <CircleAlert className="relative inline-flex h-4 w-4 text-primary" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipMessage || ''}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

import { DialogTitle } from '@radix-ui/react-dialog'
import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Logo } from '../Logo'
import { SideNav } from './SideNav'

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center gap-2">
            <MenuIcon className="text-gray-100" />
            <Logo
              className="h-8 w-8"
              withText={false}
              logoColor="fill-gray-100"
            />
            <h1 className="text-lg font-semibold text-gray-100">RMIBRB</h1>
          </div>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="z-[999999] w-72 border-gray-500 bg-gray-950 text-gray-100"
        >
          <DialogTitle className="sr-only">Menu</DialogTitle>
          <div className="h-full px-1 py-6 pt-16">
            <SideNav />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

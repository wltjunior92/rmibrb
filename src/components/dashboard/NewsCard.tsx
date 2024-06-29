import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

import { useAuth } from '@/context/AuthContext'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

export function NewsCard() {
  const { teamMember } = useAuth()
  return (
    <Card className="h-svh overflow-hidden md:col-span-6 md:h-auto">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>
              Blog Louvor Reformado
              {teamMember?.isAdmin && (
                <Button
                  className="ml-4"
                  title="Criar novo post"
                  variant="default"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
            <CardDescription className="mt-1">
              25/05/24 às 14:38hs
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex h-full flex-col">
        <main className="max-h-[88%] overflow-y-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="slate-selectable" data-key="30"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 px-0 pb-1 text-[1.5em]" contenteditable="false"><div class="flex h-[1.3em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="30" draggable="true"></div></div></div></div><div><h2 data-slate-node="element" class="mb-px mt-[1.4em] font-heading text-2xl font-semibold tracking-tight slate-h2"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Line Height</span></span></span></h2></div></div></div> 
          <div class="slate-selectable" data-key="31"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="31" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p" placeholder="Type a paragraph"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Control the line height of your text to improve readability and adjust the spacing between lines.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="32"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="32" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-lineHeight-2" placeholder="Type a paragraph" style="line-height: 2;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Choose the ideal line height to ensure comfortable reading and an aesthetically pleasing document.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="33"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 px-0 pb-1 text-[1.5em]" contenteditable="false"><div class="flex h-[1.3em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="33" draggable="true"></div></div></div></div><div><h2 data-slate-node="element" class="mb-px mt-[1.4em] font-heading text-2xl font-semibold tracking-tight slate-h2"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Indentation</span></span></span></h2></div></div></div>
          <div class="slate-selectable" data-key="34"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="34" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-indent-1" placeholder="Type a paragraph" style="margin-left: 24px;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Easily control the indentation of specific blocks to highlight important information and improve visual structure.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="31"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="31" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p" placeholder="Type a paragraph"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Control the line height of your text to improve readability and adjust the spacing between lines.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="32"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="32" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-lineHeight-2" placeholder="Type a paragraph" style="line-height: 2;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Choose the ideal line height to ensure comfortable reading and an aesthetically pleasing document.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="33"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 px-0 pb-1 text-[1.5em]" contenteditable="false"><div class="flex h-[1.3em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="33" draggable="true"></div></div></div></div><div><h2 data-slate-node="element" class="mb-px mt-[1.4em] font-heading text-2xl font-semibold tracking-tight slate-h2"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Indentation</span></span></span></h2></div></div></div>
          <div class="slate-selectable" data-key="34"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="34" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-indent-1" placeholder="Type a paragraph" style="margin-left: 24px;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Easily control the indentation of specific blocks to highlight important information and improve visual structure.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="31"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="31" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p" placeholder="Type a paragraph"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Control the line height of your text to improve readability and adjust the spacing between lines.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="32"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="32" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-lineHeight-2" placeholder="Type a paragraph" style="line-height: 2;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Choose the ideal line height to ensure comfortable reading and an aesthetically pleasing document.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="33"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 px-0 pb-1 text-[1.5em]" contenteditable="false"><div class="flex h-[1.3em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="33" draggable="true"></div></div></div></div><div><h2 data-slate-node="element" class="mb-px mt-[1.4em] font-heading text-2xl font-semibold tracking-tight slate-h2"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Indentation</span></span></span></h2></div></div></div>
          <div class="slate-selectable" data-key="34"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="34" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-indent-1" placeholder="Type a paragraph" style="margin-left: 24px;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Easily control the indentation of specific blocks to highlight important information and improve visual structure.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="31"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="31" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p" placeholder="Type a paragraph"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Control the line height of your text to improve readability and adjust the spacing between lines.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="32"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="32" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-lineHeight-2" placeholder="Type a paragraph" style="line-height: 2;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Choose the ideal line height to ensure comfortable reading and an aesthetically pleasing document.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="33"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 px-0 pb-1 text-[1.5em]" contenteditable="false"><div class="flex h-[1.3em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="33" draggable="true"></div></div></div></div><div><h2 data-slate-node="element" class="mb-px mt-[1.4em] font-heading text-2xl font-semibold tracking-tight slate-h2"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Indentation</span></span></span></h2></div></div></div>
          <div class="slate-selectable" data-key="34"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="34" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-indent-1" placeholder="Type a paragraph" style="margin-left: 24px;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Easily control the indentation of specific blocks to highlight important information and improve visual structure.</span></span></span></div></div></div></div>
          <div class="slate-selectable" data-key="35"><div class="relative group"><div class="pointer-events-none absolute -top-px z-50 flex h-full -translate-x-full cursor-text opacity-0 group-hover:opacity-100 pt-[3px] px-0 pb-0" contenteditable="false"><div class="flex h-[1.5em]"><div class="pointer-events-auto mr-1 flex items-center"><div class="size-4" data-key="35" draggable="true"></div></div></div></div><div><div data-slate-node="element" class="m-0 px-0 py-1 slate-p slate-indent-2" placeholder="Type a paragraph" style="margin-left: 48px;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">For instance, this paragraph looks like it belongs to the previous one.</span></span></span></div></div></div></div>`,
            }}
          />
        </main>
      </CardContent>
    </Card>
  )
}

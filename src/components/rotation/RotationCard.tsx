import { Dayjs } from 'dayjs'
import { CirclePlus, Eye, Pencil } from 'lucide-react'

import { cn } from '@/lib/utils'

import { AccordionLabel } from '../AccordionLabel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

interface User {
  id: string
  name: string
  userFunction?: string
}

export interface RotationProps {
  date: Dayjs
  rotation?: {
    coordenador: User
    voices: User[]
    instrumental: User[]
    soundDesign: User[]
    dataShow: User[]
  }
}

interface RotationCardProps {
  data: RotationProps
}

const userId = '5'

export function RotationCard({ data: { date, rotation } }: RotationCardProps) {
  return (
    <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-md border p-2 md:min-w-fit md:p-4">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" disabled={!rotation}>
          <Pencil className="h-4 w-4" />
        </Button>
        <strong className="flex-1 text-center">
          {date.format('DD[/]MM[/]YY')}
        </strong>
        <Button variant="ghost" size="icon" disabled={!rotation}>
          <Eye className="h-4 w-4" />
        </Button>
      </div>

      {rotation ? (
        <div className="flex flex-col gap-1">
          <Table className="mb-2 overflow-hidden rounded-sm">
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">Coordenador</TableCell>
                <TableCell>{rotation.coordenador.name || ''}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Accordion type="single" collapsible defaultValue="vozes">
            <AccordionItem value="vozes" className="mb-2 border-b-0">
              <AccordionTrigger className="rounded-sm bg-muted px-2">
                <AccordionLabel
                  hasUser={rotation.voices.some((item) => item.id === userId)}
                  title="Vozes"
                  tooltipMessage="Parece que você está escalado por aqui 😬"
                />
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="text-right">Tipo de voz</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rotation.voices &&
                      rotation.voices.map((voz) => (
                        <TableRow
                          key={voz.id}
                          className={cn(
                            voz.id === userId &&
                              'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                          )}
                        >
                          <TableCell>{voz.name}</TableCell>
                          <TableCell className="text-right">
                            {voz.userFunction}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="instrumental" className="mb-2 border-b-0">
              <AccordionTrigger className="rounded-sm bg-muted px-2">
                <AccordionLabel
                  hasUser={rotation.instrumental.some(
                    (item) => item.id === userId,
                  )}
                  title="Instrumental"
                  tooltipMessage="Parece que você está escalado por aqui 😬"
                />
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="text-right">Instrumento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rotation.instrumental &&
                      rotation.instrumental.map((instrumentalist) => (
                        <TableRow
                          key={instrumentalist.id}
                          className={cn(
                            instrumentalist.id === userId &&
                              'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                          )}
                        >
                          <TableCell>{instrumentalist.name}</TableCell>
                          <TableCell className="text-right">
                            {instrumentalist.userFunction}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="soundDesign" className="mb-2 border-b-0">
              <AccordionTrigger className="rounded-sm bg-muted px-2">
                <AccordionLabel
                  hasUser={rotation.soundDesign.some(
                    (item) => item.id === userId,
                  )}
                  title="Sonoplastia"
                  tooltipMessage="Parece que você está escalado por aqui 😬"
                />
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {rotation.soundDesign &&
                      rotation.soundDesign.map((soundDesigner) => (
                        <TableRow
                          key={soundDesigner.id}
                          className={cn(
                            soundDesigner.id === userId &&
                              'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                          )}
                        >
                          <TableCell>{soundDesigner.name}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dataShow" className="mb-2 border-b-0">
              <AccordionTrigger className="rounded-sm bg-muted px-2">
                <AccordionLabel
                  hasUser={rotation.dataShow.some((item) => item.id === userId)}
                  title="Data Show"
                  tooltipMessage="Parece que você está escalado por aqui 😬"
                />
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {rotation.dataShow &&
                      rotation.dataShow.map((person) => (
                        <TableRow
                          key={person.id}
                          className={cn(
                            person.id === userId &&
                              'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                          )}
                        >
                          <TableCell>{person.name}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className="flex min-h-[450px] flex-1 cursor-pointer flex-col items-center justify-center rounded-md text-muted-foreground duration-200 hover:bg-accent hover:text-foreground">
          <div className="flex flex-col items-center justify-center gap-2">
            <CirclePlus className="h-6 w-6" />
            <span>Adicionar</span>
          </div>
        </div>
      )}
    </div>
  )
}

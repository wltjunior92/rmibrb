import { CirclePlus, ListMusic, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { RotationByMonth } from '@/services/rotationsService'

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

interface RotationCardProps {
  data: RotationByMonth
  eventType: 'Culto Público' | 'EBD.'
}

export function RotationCard({ data, eventType }: RotationCardProps) {
  const { teamMember } = useAuth()
  return (
    <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-md border p-2 md:min-w-fit md:p-4">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" disabled={!data.id}>
          <Link to={`/escalas/adicionar?id=${data.id}`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
        <strong className="flex-1 text-center">
          {data.date.format('DD[/]MM[/]YY')}
        </strong>
        <Button variant="ghost" size="icon" disabled={!data.id}>
          <ListMusic className="h-4 w-4" />
        </Button>
      </div>

      {data.id ? (
        <div className="flex flex-col gap-1">
          <Table className="mb-2 overflow-hidden rounded-sm">
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">Coordenador</TableCell>
                <TableCell>{data.coordinator?.name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Accordion type="single" collapsible defaultValue="vozes">
            <AccordionItem value="vozes" className="mb-2 border-b-0">
              <AccordionTrigger className="rounded-sm bg-muted px-2">
                <AccordionLabel
                  hasUser={data.voices_team_rotation_members?.some(
                    (item) => item.team_member.name === teamMember?.name,
                  )}
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
                    {data.voices_team_rotation_members &&
                      data.voices_team_rotation_members.map((voz) => (
                        <TableRow
                          key={voz.id}
                          className={cn(
                            voz.id === teamMember?.name &&
                              'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                          )}
                        >
                          <TableCell>{voz.team_member.name}</TableCell>
                          <TableCell className="text-right">
                            {voz.current_function}
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
                  hasUser={data.instrumentalists_team_rotation_members?.some(
                    (item) => item.team_member.name === teamMember?.name,
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
                    {data.instrumentalists_team_rotation_members &&
                      data.instrumentalists_team_rotation_members.map(
                        (instrumentalist) => (
                          <TableRow
                            key={instrumentalist.id}
                            className={cn(
                              instrumentalist.team_member.name ===
                                teamMember?.name &&
                                'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                            )}
                          >
                            <TableCell>
                              {instrumentalist.team_member.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {instrumentalist.current_function}
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="soundDesign" className="mb-2 border-b-0">
              <AccordionTrigger className="rounded-sm bg-muted px-2">
                <AccordionLabel
                  hasUser={data.sound_designers_team_rotation_members?.some(
                    (item) => item.team_member.name === teamMember?.name,
                  )}
                  title="Sonoplastia"
                  tooltipMessage="Parece que você está escalado por aqui 😬"
                />
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {data.sound_designers_team_rotation_members &&
                      data.sound_designers_team_rotation_members.map(
                        (soundDesigner) => (
                          <TableRow
                            key={soundDesigner.id}
                            className={cn(
                              soundDesigner.team_member.name ===
                                teamMember?.name &&
                                'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                            )}
                          >
                            <TableCell>
                              {soundDesigner.team_member.name}
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dataShow" className="mb-2 border-b-0">
              <AccordionTrigger className="rounded-sm bg-muted px-2">
                <AccordionLabel
                  hasUser={data.data_show_team_rotation_members?.some(
                    (item) => item.team_member.name === teamMember?.name,
                  )}
                  title="Data Show"
                  tooltipMessage="Parece que você está escalado por aqui 😬"
                />
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {data.data_show_team_rotation_members &&
                      data.data_show_team_rotation_members.map((person) => (
                        <TableRow
                          key={person.id}
                          className={cn(
                            person.team_member.name === teamMember?.name &&
                              'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                          )}
                        >
                          <TableCell>{person.team_member.name}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <Link
          to={`/escalas/adicionar?date=${data.date.toISOString()}&event_type=${eventType}`}
          className="flex min-h-[450px] flex-1 cursor-pointer flex-col items-center justify-center rounded-md text-muted-foreground duration-200 hover:bg-accent hover:text-foreground"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <CirclePlus className="h-6 w-6" />
            <span>Adicionar</span>
          </div>
        </Link>
      )}
    </div>
  )
}

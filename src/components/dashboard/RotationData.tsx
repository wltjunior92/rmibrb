import { cn } from '@/lib/utils'

import { AccordionLabel } from '../AccordionLabel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { RotationData as Rotation } from './NextRotationCard'

interface RotationDataProps {
  data?: Rotation['team']
}

const userId = '7'

export function RotationData({ data }: RotationDataProps) {
  return (
    <>
      <Table className="mb-2 overflow-hidden rounded-sm">
        <TableBody>
          <TableRow>
            <TableCell>Coordenador</TableCell>
            <TableCell>{data?.coordenador || ''}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Accordion type="single" collapsible defaultValue="vozes">
        <AccordionItem value="vozes" className="mb-2 border-b-0">
          <AccordionTrigger className="rounded-sm bg-muted px-2">
            <AccordionLabel
              hasUser={data?.vozes.some((item) => item.id === userId)}
              title="Vozes"
              tooltipMessage="Parece que você está escalado por aqui 😬"
            />
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo de voz</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.vozes &&
                  data?.vozes.map((voz) => (
                    <TableRow
                      key={voz.id}
                      className={cn(
                        voz.id === userId &&
                          'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                      )}
                    >
                      <TableCell>{voz.name}</TableCell>
                      <TableCell>{voz.voiceType}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="instrumental" className="mb-2 border-b-0">
          <AccordionTrigger className="rounded-sm bg-muted px-2">
            <AccordionLabel
              hasUser={data?.instrumental.some((item) => item.id === userId)}
              title="Instrumental"
              tooltipMessage="Parece que você está escalado por aqui 😬"
            />
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Instrumento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.instrumental &&
                  data?.instrumental.map((item) => (
                    <TableRow
                      key={item.id}
                      className={cn(
                        item.id === userId &&
                          'bg-primary/50 hover:bg-primary hover:text-primary-foreground',
                      )}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.instrumento}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sonoplastia" className="mb-2 border-b-0">
          <AccordionTrigger className="rounded-sm bg-muted px-2">
            Sonoplastia
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                {data?.sonoplastia &&
                  data?.sonoplastia.map((sonoplasta) => (
                    <TableRow key={sonoplasta}>
                      <TableCell className="text-center">
                        {sonoplasta}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="dataShow" className="mb-2 border-b-0">
          <AccordionTrigger className="rounded-sm bg-muted px-2">
            Data show
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                {data?.dataShow &&
                  data?.dataShow.map((nome) => (
                    <TableRow key={nome}>
                      <TableCell className="text-center">{nome}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

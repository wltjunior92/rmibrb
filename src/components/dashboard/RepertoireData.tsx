import { FileMusic, Video } from 'lucide-react'

import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { RotationData } from './NextRotationCard'

interface RepertoireDataProps {
  data?: RotationData['repertoire']
}

export function RepertoireData({ data }: RepertoireDataProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-44 md:min-w-fit">Nome</TableHead>
          <TableHead className="min-w-40 md:min-w-fit">Artista</TableHead>
          <TableHead>Vídeo</TableHead>
          <TableHead>Cifra</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((song) => (
            <TableRow key={song.id}>
              <TableCell className="min-w-44 md:min-w-fit">
                {song.name}
              </TableCell>
              <TableCell className="min-w-40 md:min-w-fit">
                {song.artist}
              </TableCell>
              <TableCell>
                <a href={song.video} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Video className="h-6 w-6" />
                  </Button>
                </a>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <FileMusic className="h-6 w-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

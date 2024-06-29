import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Toggle } from '../ui/toggle'
import { RepertoireData } from './RepertoireData'
import { RotationData } from './RotationData'

interface Vozes {
  id: string
  name: string
  voiceType: string
}

interface Instrumental {
  id: string
  name: string
  instrumento: string
}

interface Song {
  id: string
  artist: string
  name: string
  video: string
  defaultChordID: string
}

export interface RotationData {
  team: {
    coordenador: string
    vozes: Vozes[]
    instrumental: Instrumental[]
    sonoplastia: string[]
    dataShow: string[]
  }
  repertoire: Song[]
}

const rotationCP: RotationData = {
  team: {
    coordenador: 'Bicicleto',
    vozes: [
      {
        id: '1',
        name: 'Calabreso',
        voiceType: 'Tenor',
      },
      {
        id: '2',
        name: 'Pirilampa',
        voiceType: 'Soprano',
      },
      {
        id: '3',
        name: 'Maurícia',
        voiceType: 'Soprano',
      },
      {
        id: '4',
        name: 'Jéssico',
        voiceType: 'Contralto',
      },
    ],
    instrumental: [
      {
        id: '5',
        name: 'Felipa',
        instrumento: 'Baixo',
      },
      {
        id: '6',
        name: 'Sucrilhas',
        instrumento: 'Violão',
      },
      {
        id: '7',
        name: 'Caga tronco',
        instrumento: 'Teclado',
      },
      {
        id: '8',
        name: 'Sopra tubo',
        instrumento: 'Trompete',
      },
    ],
    dataShow: ['Fulaninha de Souza', 'Calabreso Almendo'],
    sonoplastia: ['Jubileu Brexton'],
  },
  repertoire: [
    {
      id: '1',
      name: 'É o teu povo',
      artist: 'IPALPHA',
      video: 'https://www.youtube.com/watch?v=7DH_tKN_n-g',
      defaultChordID: '1',
    },
    {
      id: '2',
      name: 'Eterno Deus',
      artist: 'Vineyard',
      video: 'https://www.youtube.com/watch?v=D67gv66OmFc',
      defaultChordID: '2',
    },
    {
      id: '3',
      name: 'Falar com Deus',
      artist: 'OS MEIRELES',
      video: 'https://www.youtube.com/watch?v=bhKG563yJPo',
      defaultChordID: '3',
    },
    {
      id: '4',
      name: 'Jesus em tua Presença',
      artist: 'Ibab Celebração',
      video: 'https://www.youtube.com/watch?v=hizQh4R-a5E',
      defaultChordID: '4',
    },
    {
      id: '5',
      name: 'Não mais eu',
      artist: 'IGREJA EVANGÉLICA REFORMADA DOM',
      video: 'https://www.youtube.com/watch?v=J9zrnX7QcFo',
      defaultChordID: '5',
    },
  ],
}

const rotationEBD: RotationData = {
  team: {
    coordenador: 'Garrido',
    vozes: [
      {
        id: '9',
        name: 'Calabreso',
        voiceType: 'Tenor',
      },
      {
        id: '10',
        name: 'Jeremios',
        voiceType: 'Soprano',
      },
      {
        id: '11',
        name: 'Tigresa (KFP)',
        voiceType: 'Soprano',
      },
      {
        id: '12',
        name: 'Lésbico',
        voiceType: 'Contralto',
      },
    ],
    instrumental: [
      {
        id: '13',
        name: 'Ronalda',
        instrumento: 'Baixo',
      },
      {
        id: '14',
        name: 'Betânio',
        instrumento: 'Violão',
      },
      {
        id: '15',
        name: 'Caga tronco',
        instrumento: 'Teclado',
      },
      {
        id: '16',
        name: 'Sopra tubo',
        instrumento: 'Trompete',
      },
    ],
    dataShow: ['Fulaninha de Souza'],
    sonoplastia: ['Marcas'],
  },
  repertoire: [
    {
      id: '6',
      name: 'Ao sentir',
      artist: 'Grupo Elo',
      video:
        'https://www.youtube.com/watch?v=ksE1ISbY9AM&list=PLu27-tc4SBIk5vk5T60koUpvO3kNKXJeu&index=1',
      defaultChordID: '6',
    },
    {
      id: '7',
      name: 'Só em ti',
      artist: 'IPALPHA',
      video:
        'https://www.youtube.com/watch?v=EY3cIar-JU0&list=PLu27-tc4SBIk5vk5T60koUpvO3kNKXJeu&index=2',
      defaultChordID: '7',
    },
  ],
}

export function NextRotationCard() {
  const [eventType, setEventType] = useState<'cp' | 'ebd'>('cp')

  return (
    <Card className="md:col-span-6">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Próxima Escala</CardTitle>
            <CardDescription className="mt-1">
              Domingo 30/06/2024
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Toggle
              variant="outline"
              onPressedChange={() => setEventType('cp')}
              pressed={eventType === 'cp'}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              CP.
            </Toggle>
            <Toggle
              variant="outline"
              onPressedChange={() => setEventType('ebd')}
              pressed={eventType === 'ebd'}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              EBD.
            </Toggle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="equipe">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="equipe">
              Equipe
            </TabsTrigger>
            <TabsTrigger className="w-full" value="repertorio">
              Repertório
            </TabsTrigger>
          </TabsList>

          {eventType === 'cp' ? (
            <>
              <TabsContent className="w-full" value="equipe">
                <RotationData data={rotationCP.team} />
              </TabsContent>

              <TabsContent className="w-full" value="repertorio">
                <RepertoireData data={rotationCP.repertoire} />
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent className="w-full" value="equipe">
                <RotationData data={rotationEBD.team} />
              </TabsContent>

              <TabsContent className="w-full" value="repertorio">
                <RepertoireData data={rotationEBD.repertoire} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}

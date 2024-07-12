/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { CalendarIcon, Check, ChevronsUpDown, LoaderCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import {
  MembersListTypes,
  RotationTeamMembersFormTable,
} from '@/components/rotation/RotationTeamMembersFormTable'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import {
  getEventTypesSelectData,
  getPossibleCoordinators,
  getPossibleTeamMembers,
  GetPossibleTeamMembersResponse,
  TeamMembersResponse as TeamMember,
} from '@/services/appDefaultData'
import {
  getRotationById,
  insertRotation,
  InsertRotationParams,
  updateRotation,
} from '@/services/rotationsService'

const rotationForm = z.object({
  event_type: z.string(),
  date: z.date(),
  rehearsal_time: z.string(),
  coordinator_id: z.string().nullable(),
  voices_team_rotation_members: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      avatar_url: z.string().nullable(),
      roles: z.array(
        z.object({
          function_groups: z.object({
            id: z.string(),
            function: z.string(),
            function_types: z.string(),
          }),
        }),
      ),
      current_function: z.string(),
    }),
  ),
  instrumentalists_team_rotation_members: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      avatar_url: z.string().nullable(),
      roles: z.array(
        z.object({
          function_groups: z.object({
            id: z.string(),
            function: z.string(),
            function_types: z.string(),
          }),
        }),
      ),
      current_function: z.string(),
    }),
  ),
  sound_designers_team_rotation_members: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      avatar_url: z.string().nullable(),
      roles: z.array(
        z.object({
          function_groups: z.object({
            id: z.string(),
            function: z.string(),
            function_types: z.string(),
          }),
        }),
      ),
    }),
  ),
  data_show_team_rotation_members: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      avatar_url: z.string().nullable(),
      roles: z.array(
        z.object({
          function_groups: z.object({
            id: z.string(),
            function: z.string(),
            function_types: z.string(),
          }),
        }),
      ),
    }),
  ),
})

export type RotationForm = z.infer<typeof rotationForm>

export function UpsertRotation() {
  const { toast } = useToast()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const [eventTypes, setEventTypes] = useState<string[]>(['Carregando'])
  const [coordinators, setCoordinators] = useState<
    { id: string; name: string }[]
  >([])
  const [possibleTeamMembers, setPossibleTeamMembers] =
    useState<GetPossibleTeamMembersResponse | null>(null)

  const [searchParams] = useSearchParams()
  const selectedDate = searchParams.get('date')
    ? new Date(searchParams.get('date') || '')
    : undefined
  const selectedEventType = searchParams.get('event_type') || undefined

  const rotationId = searchParams.get('id') || undefined

  const form = useForm<RotationForm>({
    resolver: zodResolver(rotationForm),
    defaultValues: {
      event_type: selectedEventType,
      date: selectedDate,
      voices_team_rotation_members: [],
      instrumentalists_team_rotation_members: [],
      sound_designers_team_rotation_members: [],
      data_show_team_rotation_members: [],
    },
  })

  const {
    setValue,
    getValues,
    watch,
    formState: { isSubmitting },
  } = form

  const voices = watch('voices_team_rotation_members')
  const instrumentalists = watch('instrumentalists_team_rotation_members')
  const soundDesigners = watch('sound_designers_team_rotation_members')
  const dataShowList = watch('data_show_team_rotation_members')

  async function handleSubmitRotation(data: RotationForm) {
    const newRotation: InsertRotationParams = {
      event_type: data.event_type,
      date: data.date,
      coordinator_id: data.coordinator_id,
      rehearsal_time: data.rehearsal_time,
      voices_team_rotation_members: data.voices_team_rotation_members.map(
        (item) => ({ id: item.id, current_function: item.current_function }),
      ),
      instrumentalists_team_rotation_members:
        data.instrumentalists_team_rotation_members.map((item) => ({
          id: item.id,
          current_function: item.current_function,
        })),
      sound_designers_team_rotation_members:
        data.sound_designers_team_rotation_members.map((item) => ({
          id: item.id,
        })),
      data_show_team_rotation_members: data.data_show_team_rotation_members.map(
        (item) => ({
          id: item.id,
        }),
      ),
    }
    let result
    if (!rotationId) {
      result = await insertRotation(newRotation)
    } else {
      result = await updateRotation(newRotation, rotationId)
    }

    if (!result.success) {
      toast({
        variant: 'destructive',
        description: result.message,
      })
      return
    }
    toast({
      variant: 'success',
      description: result.message,
    })
    navigate('/escalas')
  }

  async function fetchFormData() {
    const data = await getEventTypesSelectData()
    const coordinators = await getPossibleCoordinators()
    const teamMembers = await getPossibleTeamMembers()

    setEventTypes(data)
    setCoordinators(coordinators)
    setPossibleTeamMembers(teamMembers)
  }

  function handleAddMember(
    value: TeamMember,
    field: any,
    previousValue: TeamMember[],
  ) {
    const lists = [
      ...voices,
      ...instrumentalists,
      ...soundDesigners,
      ...dataShowList,
    ]
    if (lists.some((item) => item.id === value.id)) {
      toast({
        variant: 'warning',
        description: 'Essa pessoa já foi adicionada em outra função',
        duration: 2500,
      })
      return
    }
    const newArr = [...previousValue]
    if (
      field === 'voices_team_rotation_members' ||
      field === 'instrumentalists_team_rotation_members'
    ) {
      newArr.push({
        ...value,
        current_function: value.roles[0].function_groups.function,
      })
    } else {
      newArr.push(value)
    }
    setValue(field, newArr)
  }

  function handleRemoveMember(
    id: string,
    field: any,
    previousValue: TeamMember[],
  ) {
    const newArr = [...previousValue]
    const filteredList = newArr.filter((item) => item.id !== id)
    setValue(field, filteredList)
  }

  function onChangeRole(
    fieldType: MembersListTypes,
    value: string,
    index: number,
  ) {
    const role = getValues(`${fieldType}.${index}`)
    const newRole = {
      ...role,
      current_function: value,
    }
    setValue(`${fieldType}.${index}`, newRole)
  }

  useEffect(() => {
    setIsLoading(true)
    fetchFormData().finally(() => setIsLoading(false))
  }, [])

  const fetchEditRotation = useCallback(async () => {
    if (!rotationId) {
      return
    }
    const { data, message } = await getRotationById(rotationId)

    if (message) {
      toast({
        variant: 'destructive',
        description: message,
      })
      return
    }
    setValue('event_type', data!.event_type)
    setValue('date', data!.date)
    setValue('rehearsal_time', data!.rehearsal_time)
    setValue('coordinator_id', data!.coordinator_id)
    setValue('voices_team_rotation_members', data!.voices_team_rotation_members)
    setValue(
      'instrumentalists_team_rotation_members',
      data!.instrumentalists_team_rotation_members,
    )
    setValue(
      'sound_designers_team_rotation_members',
      data!.sound_designers_team_rotation_members,
    )
    setValue(
      'data_show_team_rotation_members',
      data!.data_show_team_rotation_members,
    )
  }, [rotationId, toast, setValue])

  useEffect(() => {
    setIsLoading(true)
    fetchEditRotation().finally(() => setIsLoading(false))
  }, [fetchEditRotation])

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-6 text-2xl font-bold">{`${rotationId ? 'Editar' : 'Criar nova'} escala`}</h1>
      <main className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <Card className="col-span-12 pt-4">
          <CardContent className="p-2 md:p-6">
            <Form {...form}>
              <form
                className="grid gap-4 md:grid-cols-3"
                onSubmit={form.handleSubmit(handleSubmitRotation)}
              >
                <FormField
                  control={form.control}
                  name="event_type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1">Tipo de evento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de evento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {eventTypes &&
                            eventTypes.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1">Data do evento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                dayjs(field.value).format('DD[/]MM[/]YYYY')
                              ) : (
                                <span>Selecione a data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rehearsal_time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1">Horário do ensaio</FormLabel>
                      <Input
                        type="time"
                        step={60}
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordinator_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1">Coordenador</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? coordinators.find(
                                  (coordinator) =>
                                    coordinator.id === field.value,
                                )?.name
                              : 'Selecione o coordenador'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start">
                          <Command>
                            <CommandInput placeholder="Busque por um coordenador" />
                            <CommandEmpty>
                              Nenhum coordenador disponível
                            </CommandEmpty>
                            <CommandGroup className="max-h-[200px] overflow-y-auto">
                              {coordinators &&
                                coordinators.map((coordinator) => (
                                  <CommandItem
                                    value={coordinator.name}
                                    key={coordinator.id}
                                    onSelect={() => {
                                      form.setValue(
                                        'coordinator_id',
                                        coordinator.id,
                                      )
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        coordinator.id === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {coordinator.name}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Tabs
                  className="mt-6 rounded-md border md:col-span-3"
                  orientation="vertical"
                  defaultValue="Vozes"
                >
                  <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="Vozes">
                      Vozes
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="Instrumental">
                      Instrumental
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="Sonoplastia">
                      Sonoplastia
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="Data Show">
                      Data Show
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent className="w-full p-2 md:p-6" value="Vozes">
                    <RotationTeamMembersFormTable
                      handleAddMember={handleAddMember}
                      handleRemoveMember={handleRemoveMember}
                      fieldType="voices_team_rotation_members"
                      membersList={voices}
                      onChangeRole={onChangeRole}
                      teamMembers={
                        possibleTeamMembers
                          ? possibleTeamMembers.teamMembersVoices
                          : []
                      }
                      selectPlaceholder="Busque pelo nome"
                      searchSelectPlaceholder="Selecione um(a) cantor(a)"
                    />
                  </TabsContent>
                  <TabsContent
                    className="w-full p-2 md:p-6"
                    value="Instrumental"
                  >
                    <RotationTeamMembersFormTable
                      handleAddMember={handleAddMember}
                      handleRemoveMember={handleRemoveMember}
                      fieldType="instrumentalists_team_rotation_members"
                      membersList={instrumentalists}
                      searchValueType="roles"
                      onChangeRole={onChangeRole}
                      teamMembers={
                        possibleTeamMembers
                          ? possibleTeamMembers.teamMembersInstrumental
                          : []
                      }
                      selectPlaceholder="Busque pelo instrumento"
                      searchSelectPlaceholder="Selecione o tocador"
                    />
                  </TabsContent>
                  <TabsContent
                    className="w-full p-2 md:p-6"
                    value="Sonoplastia"
                  >
                    <RotationTeamMembersFormTable
                      handleAddMember={handleAddMember}
                      handleRemoveMember={handleRemoveMember}
                      fieldType="sound_designers_team_rotation_members"
                      membersList={soundDesigners}
                      teamMembers={
                        possibleTeamMembers
                          ? possibleTeamMembers.teamMembersSonoplastia
                          : []
                      }
                      selectPlaceholder="Busque pelo nome"
                      searchSelectPlaceholder="Selecione sonoplasta"
                    />
                  </TabsContent>
                  <TabsContent className="w-full p-2 md:p-6" value="Data Show">
                    <RotationTeamMembersFormTable
                      handleAddMember={handleAddMember}
                      handleRemoveMember={handleRemoveMember}
                      fieldType="data_show_team_rotation_members"
                      membersList={dataShowList}
                      teamMembers={
                        possibleTeamMembers
                          ? possibleTeamMembers.teamMembersDataShow
                          : []
                      }
                      selectPlaceholder="Busque pelo nome"
                      searchSelectPlaceholder="Selecione o(a) operador(a)"
                    />
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex w-full justify-end md:col-span-3">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      'Salvar'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

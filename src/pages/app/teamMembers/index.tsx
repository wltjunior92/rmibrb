/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
  Copy,
  LoaderCircle,
  Mail,
  Pencil,
  Phone,
  Search,
  UserPlus,
  X,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Pagination } from '@/components/pagination'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAuth } from '@/context/AuthContext'
import { getAllRoles } from '@/services/appDefaultData'
import { getTeamMembers } from '@/services/teamMembersService'
import { getAvatarFallback } from '@/utils/getAvatarFallback'

const filterTeamMembersFormSchema = z.object({
  name: z.string().nullable(),
  role: z.string().nullable(),
})

type FilterTeamMembersFormData = z.infer<typeof filterTeamMembersFormSchema>

const PER_PAGE = 10

export function TeamMembers() {
  const { teamMember: loggedUser } = useAuth()

  const [searchParams, setSearchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get('page') || '1')
  const teamMemberName = searchParams.get('name')
  const role = searchParams.get('role')

  const { handleSubmit, control, register, watch, reset, setValue } =
    useForm<FilterTeamMembersFormData>({
      resolver: zodResolver(filterTeamMembersFormSchema),
      defaultValues: {
        name: teamMemberName ?? null,
        role: role ?? '',
      },
    })

  const { data: result, isLoading: isLoadingTeamMembers } = useQuery({
    queryKey: ['team_members', teamMemberName, role, page],
    queryFn: () =>
      getTeamMembers({
        page,
        name: teamMemberName || undefined,
        role: role || undefined,
        perPage: PER_PAGE,
      }),
  })

  const { data: roles } = useQuery({
    queryKey: ['form_roles'],
    queryFn: () => getAllRoles(),
  })

  function handleSetFilters({ name, role }: FilterTeamMembersFormData) {
    setSearchParams((state) => {
      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }
      if (role) {
        state.set('role', role)
      } else {
        state.delete('role')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('name')
      state.delete('role')
      state.set('page', '1')

      return state
    })

    reset({
      name: '',
      role: undefined,
    })
    setValue('role', '')
  }

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', pageIndex.toString())

      return state
    })
  }

  const nameFilter = watch('name')
  const roleFilter = watch('role')

  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-6 text-2xl font-bold">Equipe</h1>
      <main className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="col-span-12 flex flex-col items-center justify-between md:flex-row">
          <form
            className="flex items-center gap-4"
            onSubmit={handleSubmit(handleSetFilters)}
          >
            <Input
              placeholder={'Nome do "funcionário"'}
              {...register('name')}
            />
            <Controller
              control={control}
              name="role"
              render={({ field: { name, onChange, value } }) => (
                <Select
                  name={name}
                  onValueChange={onChange}
                  defaultValue={value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles && roles.voices.length > 0 && (
                      <>
                        <SelectItem disabled value="voz">
                          <span className="text-xs font-semibold">Vozes</span>
                        </SelectItem>
                        {roles.voices.map((item: any) => (
                          <SelectItem key={item.id} value={item.role}>
                            {item.role}
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {roles && roles.instrumental.length > 0 && (
                      <>
                        <Separator orientation="horizontal" />
                        <SelectItem disabled value="instrumental">
                          <span className="text-xs font-semibold">
                            Instrumental
                          </span>
                        </SelectItem>
                        {roles.instrumental.map((item: any) => (
                          <SelectItem key={item.id} value={item.role}>
                            {item.role}
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {roles && roles.soundDesign.length > 0 && (
                      <>
                        <Separator orientation="horizontal" />
                        <SelectItem disabled value="soundDesign">
                          <span className="text-xs font-semibold">
                            Sonoplastia
                          </span>
                        </SelectItem>
                        {roles.soundDesign.map((item: any) => (
                          <SelectItem key={item.id} value={item.role}>
                            {item.role}
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {roles && roles.dataShow.length > 0 && (
                      <>
                        <Separator orientation="horizontal" />
                        <SelectItem disabled value="dataShow">
                          <span className="text-xs font-semibold">
                            Data Show
                          </span>
                        </SelectItem>
                        {roles.dataShow.map((item: any) => (
                          <SelectItem key={item.id} value={item.role}>
                            {item.role}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {(nameFilter || roleFilter) && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                title="Limpar filtros"
                onClick={handleClearFilters}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button type="submit" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <Button className="mt-6 w-full md:mt-0 md:w-auto" asChild>
            <Link to="/escalas/adicionar">
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar
            </Link>
          </Button>
        </div>

        <Card className="col-span-12 mb-6 py-0">
          <CardContent className="p-0">
            <main className="overflow-x-auto">
              {isLoadingTeamMembers || result?.data.length === 0 ? (
                <div className="flex h-[200px] w-full flex-1 items-center justify-center">
                  <LoaderCircle className="h-20 w-20 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Avatar</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Funções</TableHead>
                      <TableHead>Ativo</TableHead>
                      <TableHead>Administrador</TableHead>
                      <TableHead>Contatos</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result?.data.map((teamMember) => (
                      <TableRow key={teamMember.id}>
                        <TableCell>
                          <Avatar>
                            <AvatarImage
                              src={teamMember.avatarUrl || undefined}
                            />
                            <AvatarFallback>
                              {getAvatarFallback(teamMember.name)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>{teamMember.name}</TableCell>
                        <TableCell className="min-w-[150px] md:w-auto">
                          <div className="flex max-w-[200px] flex-wrap gap-2">
                            {teamMember.roles.map((role) => (
                              <Badge
                                key={role}
                                variant="secondary"
                                className="text-[0.7rem]"
                              >
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={teamMember.isActive}
                            disabled={!loggedUser?.isAdmin}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={teamMember.isAdmin}
                            disabled={!loggedUser?.isAdmin}
                          />
                        </TableCell>
                        <TableCell className="min-w-40">
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="flex items-center gap-2">
                                  {teamMember.email ? (
                                    <>
                                      <span>{teamMember.email}</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          if (teamMember.email)
                                            navigator.clipboard.writeText(
                                              teamMember.email,
                                            )
                                        }}
                                        title="Copiar e-mail"
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <span>
                                      Não encontramos o e-mail dessa pessoa em
                                      nossos registros 😕
                                    </span>
                                  )}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="flex items-center gap-2">
                                  {teamMember.phone ? (
                                    <>
                                      <span>{teamMember.phone}</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          if (teamMember.phone)
                                            navigator.clipboard.writeText(
                                              teamMember.phone,
                                            )
                                        }}
                                        title="Copiar telefone"
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <span>
                                      Não encontramos o telefone dessa pessoa em
                                      nossos registros 😕
                                    </span>
                                  )}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => console.log(teamMember.id)}
                            title="Copiar telefone"
                            disabled={
                              loggedUser?.user.id !== teamMember.userId ||
                              !loggedUser?.isAdmin
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </main>
            <div className="flex w-full border-t px-4 py-2">
              {result && (
                <Pagination
                  pageIndex={page}
                  totalCount={result.total}
                  perPage={PER_PAGE}
                  onPageChange={handlePaginate}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

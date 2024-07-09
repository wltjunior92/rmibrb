import { ChevronsUpDown, Trash } from 'lucide-react'
import { CgPiano } from 'react-icons/cg'
import { FaGuitar } from 'react-icons/fa'
import {
  GiDrum,
  GiGuitarBassHead,
  GiGuitarHead,
  GiTrumpet,
} from 'react-icons/gi'

import { TeamMembersResponse as TeamMember } from '@/services/appDefaultData'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

export type MembersListTypes =
  | 'voices_team_rotation_members'
  | 'instrumentalists_team_rotation_members'
  | 'sound_designers_team_rotation_members'
  | 'data_show_team_rotation_members'

interface RotationTeamMembersFormTableProps {
  teamMembers: TeamMember[]
  membersList: TeamMember[]
  fieldType: MembersListTypes
  handleAddMember: (
    value: TeamMember,
    field: MembersListTypes,
    previousValue: TeamMember[],
  ) => void
  handleRemoveMember: (
    id: string,
    field: MembersListTypes,
    previousValue: TeamMember[],
  ) => void
  onChangeRole?: (
    fieldType: MembersListTypes,
    value: string,
    index: number,
  ) => void
  selectPlaceholder: string
  searchSelectPlaceholder: string
  searchValueType?: 'name' | 'roles'
}

export function RotationTeamMembersFormTable({
  teamMembers,
  membersList,
  fieldType,
  handleAddMember,
  handleRemoveMember,
  selectPlaceholder,
  searchSelectPlaceholder,
  searchValueType = 'name',
  onChangeRole,
}: RotationTeamMembersFormTableProps) {
  function getSearchValueText(value: TeamMember['roles'] | string) {
    let str = ''
    if (Array.isArray(value)) {
      value.forEach((role) => (str += role.function_groups.function + ' '))
    } else {
      return value
    }
    return str.trim()
  }

  function getAvatarFallback(name: string) {
    const [firstName, secondName] = name.toUpperCase().split(' ')
    return `${firstName[0]}${secondName[0]}`
  }

  function getInstrumentalIcon(role: string) {
    switch (role) {
      case 'Contrabaixo':
        return <GiGuitarBassHead />
      case 'Violão':
        return <FaGuitar />
      case 'Guitarra':
        return <GiGuitarHead />
      case 'Bateria':
        return <GiDrum />
      case 'Teclado':
        return <CgPiano />
      case 'Trompete':
      case 'Flugelhorn':
        return <GiTrumpet />
      default:
        return <></>
    }
  }

  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger className="" asChild>
          <Button variant="outline" role="combobox" className="justify-between">
            {searchSelectPlaceholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Command>
            <CommandInput placeholder={selectPlaceholder} />
            <CommandEmpty>Nenhum resultado</CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-y-auto">
              {teamMembers &&
                teamMembers.map((item) => (
                  <CommandItem
                    value={getSearchValueText(item[searchValueType])}
                    key={item.id + fieldType}
                    className="data-[selected=true]:bg-background"
                    onSelect={() => {
                      handleAddMember(item, fieldType, membersList)
                    }}
                  >
                    <div className="flex flex-1 items-center justify-between">
                      <span>{item.name}</span>
                      <div className="flex gap-1">
                        {searchValueType === 'roles' &&
                          item.roles.map((role) => (
                            <div key={item.id + role.function_groups.function}>
                              {getInstrumentalIcon(
                                role.function_groups.function,
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {membersList.length === 0 ? (
        <div className="mt-4 flex h-64 w-full items-center justify-center rounded-md border-2 border-dashed">
          <span className="text-center font-semibold opacity-30">
            Nenhum membro do time selecionado
          </span>
        </div>
      ) : (
        <div className="mt-2 overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Nome</TableHead>
                {fieldType !== 'data_show_team_rotation_members' &&
                  fieldType !== 'sound_designers_team_rotation_members' && (
                    <TableHead>Tipo</TableHead>
                  )}
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membersList.length !== 0 &&
                membersList.map((item, memberIndex) => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-6">
                      <Avatar>
                        <AvatarImage src={item.avatar_url || undefined} />
                        <AvatarFallback>
                          {getAvatarFallback(item.name)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    {fieldType !== 'data_show_team_rotation_members' &&
                      fieldType !== 'sound_designers_team_rotation_members' &&
                      onChangeRole && (
                        <TableCell>
                          <Select
                            onValueChange={(value) =>
                              onChangeRole(fieldType, value, memberIndex)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                placeholder="Selecione a função"
                                defaultValue={
                                  item.roles[0].function_groups.function
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {item.roles.map((role) => (
                                <SelectItem
                                  key={`${role.function_groups.id}-${item.id}`}
                                  value={role.function_groups.function}
                                >
                                  {role.function_groups.function}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      )}
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        onClick={() =>
                          handleRemoveMember(item.id, fieldType, membersList)
                        }
                        variant="ghost"
                        size="xs"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

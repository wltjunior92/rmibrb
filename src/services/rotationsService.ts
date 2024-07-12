/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs, { Dayjs } from 'dayjs'

import supabase from '@/lib/supabaseClient'
import { RotationForm } from '@/pages/app/rotation/upsertRotation'
import { countSundaysInMonth } from '@/utils/countSundaysInMonth'

interface RotationTeamMembers {
  id: string
  current_function?: string
}

export interface InsertRotationParams {
  event_type: string
  date: Date
  rehearsal_time: string
  coordinator_id: string | null
  voices_team_rotation_members: RotationTeamMembers[]
  instrumentalists_team_rotation_members: RotationTeamMembers[]
  sound_designers_team_rotation_members: RotationTeamMembers[]
  data_show_team_rotation_members: RotationTeamMembers[]
}

export async function insertRotation(rotationData: InsertRotationParams) {
  let step = 0
  let newTeamRotationMembersId = ''
  let newRepertoireId = ''
  try {
    const newTeamRotationMembers = await supabase
      .from('team_rotation_members')
      .insert({ coordinator_id: rotationData.coordinator_id })
      .select('id')
      .single()

    newTeamRotationMembersId = newTeamRotationMembers.data.id
    if (newTeamRotationMembers.error) throw newTeamRotationMembers.error
    step = 1

    const voicesPromise = insertTeamMembersfromRotation(
      rotationData.voices_team_rotation_members,
      newTeamRotationMembers.data.id,
      'voices_team_rotation_members',
    )
    const instrumentalPromise = insertTeamMembersfromRotation(
      rotationData.instrumentalists_team_rotation_members,
      newTeamRotationMembers.data.id,
      'instrumentalists_team_rotation_members',
    )
    const soundDesignersPromise = insertTeamMembersfromRotation(
      rotationData.sound_designers_team_rotation_members,
      newTeamRotationMembers.data.id,
      'sound_designers_team_rotation_members',
    )
    const dataShowPromise = insertTeamMembersfromRotation(
      rotationData.data_show_team_rotation_members,
      newTeamRotationMembers.data.id,
      'data_show_team_rotation_members',
    )

    await Promise.all([
      voicesPromise,
      instrumentalPromise,
      soundDesignersPromise,
      dataShowPromise,
    ])

    step = 2

    const repertoire = await supabase
      .from('team_rotation_musical_repertoires')
      .insert({})
      .select('id')
      .single()
    newRepertoireId = repertoire.data.id

    if (repertoire.error) throw repertoire.error

    step = 3

    const teamRotation = await supabase
      .from('team_rotations')
      .insert({
        event_type: rotationData.event_type,
        rehearsal_time: rotationData.rehearsal_time,
        date: rotationData.date.toDateString(),
        team_rotation_members_id: newTeamRotationMembers.data.id,
        team_rotation_musical_repertoire_id: repertoire.data.id,
      })
      .select()
      .single()

    if (teamRotation.error) throw teamRotation.error

    return {
      message: `Escala do ${rotationData.event_type} criada com sucesso para o dia ${dayjs(rotationData.date).format('DD[/]MM[/]YY')!}`,
      success: true,
    }
  } catch (error) {
    await supabase
      .from('team_rotation_members')
      .delete()
      .eq('id', newTeamRotationMembersId)
    if (step === 2) {
      await supabase
        .from('team_rotation_musical_repertoires')
        .delete()
        .eq('id', newRepertoireId)
    }
    console.error(error)
    return {
      message: `Erro ao criar escala. Por favor tente novamente`,
      success: false,
    }
  }
}

export async function updateRotation(
  rotationData: InsertRotationParams,
  id: string,
) {
  let step = 0
  let updatedTeamRotationMembersId = ''
  try {
    const { data, error } = await supabase
      .from('team_rotations')
      .select('team_rotation_members_id, team_rotation_musical_repertoire_id')
      .eq('id', id)
      .single()

    await supabase
      .from('team_rotation_members')
      .delete()
      .eq('id', data.team_rotation_members_id)

    if (error) throw error
    step = 1

    const updatedTeamRotationMembers = await supabase
      .from('team_rotation_members')
      .insert({ coordinator_id: rotationData.coordinator_id })
      .select('id')
      .single()

    updatedTeamRotationMembersId = updatedTeamRotationMembers.data.id

    const voicesPromise = insertTeamMembersfromRotation(
      rotationData.voices_team_rotation_members,
      updatedTeamRotationMembers.data.id,
      'voices_team_rotation_members',
    )
    const instrumentalPromise = insertTeamMembersfromRotation(
      rotationData.instrumentalists_team_rotation_members,
      updatedTeamRotationMembers.data.id,
      'instrumentalists_team_rotation_members',
    )
    const soundDesignersPromise = insertTeamMembersfromRotation(
      rotationData.sound_designers_team_rotation_members,
      updatedTeamRotationMembers.data.id,
      'sound_designers_team_rotation_members',
    )
    const dataShowPromise = insertTeamMembersfromRotation(
      rotationData.data_show_team_rotation_members,
      updatedTeamRotationMembers.data.id,
      'data_show_team_rotation_members',
    )

    await Promise.all([
      voicesPromise,
      instrumentalPromise,
      soundDesignersPromise,
      dataShowPromise,
    ])

    const teamRotation = await supabase
      .from('team_rotations')
      .update({
        event_type: rotationData.event_type,
        rehearsal_time: rotationData.rehearsal_time,
        date: rotationData.date.toDateString(),
        team_rotation_members_id: updatedTeamRotationMembers.data.id,
      })
      .eq('id', id)
    if (teamRotation.error) throw teamRotation.error

    return {
      message: 'Escala atualizada com sucesso!',
      success: true,
    }
  } catch (error) {
    let message = ''
    if (step === 0) {
      message =
        'Erro ao atualizar os membros escalados. Por favor, adicione os membros novamente.'
    }
    if (step === 1) {
      message =
        'Erro ao atualizar os dados da escala. Verifique os dados e tente novamente'
    }
    await supabase
      .from('team_rotation_members')
      .delete()
      .eq('id', updatedTeamRotationMembersId)
    console.error(error)
    return {
      message,
      success: false,
    }
  }
}

async function insertTeamMembersfromRotation(
  membersList: RotationTeamMembers[],
  teamRotationMembersId: string,
  tableName: string,
) {
  if (membersList.length === 0) return
  const newRotationMembers = membersList.map((item) => {
    const format: {
      team_member_id: string
      team_rotation_members_id: string
      current_function?: string
    } = {
      team_member_id: item.id,
      team_rotation_members_id: teamRotationMembersId,
      current_function: item.current_function,
    }
    if (!item.current_function) {
      delete format.current_function
    }
    return format
  })

  const result = await supabase
    .from(tableName)
    .insert(newRotationMembers)
    .select()

  if (result.error) {
    throw result.error
  }
}

interface TeamMember {
  id: string
  name: string
  avatar_url: string
  user_id: string
}

interface TeamRotationMember {
  id: string
  team_member: TeamMember
  current_function?: string
}

export interface RotationByMonth {
  id?: string
  date: Dayjs
  event_type?: 'Culto Público' | 'EBD.' | 'Extraordinário'
  coordinator?: TeamMember
  voices_team_rotation_members?: TeamRotationMember[]
  instrumentalists_team_rotation_members?: TeamRotationMember[]
  sound_designers_team_rotation_members?: TeamRotationMember[]
  data_show_team_rotation_members?: TeamRotationMember[]
}

export async function getEventsByMonth(
  selectedMonth: Dayjs,
  eventType: 'Culto Público' | 'EBD.',
) {
  const sundays = countSundaysInMonth(selectedMonth.toDate())

  try {
    const firstDayOfMonth = selectedMonth.startOf('month').format('YYYY-MM-DD')
    const lastDayOfMonth = selectedMonth.endOf('month').format('YYYY-MM-DD')
    const result = await supabase
      .from('team_rotations')
      .select(
        `
          id,
          date,
          event_type,
          rehearsal_time,
          team_rotation_members_id (
            coordinator_id (
              id,
              name,
              avatar_url,
              user_id
            ),
            voices_team_rotation_members!inner (
              id,
              current_function,
              team_member_id (
                id,
                name,
                avatar_url,
                user_id
              )
            ),
            instrumentalists_team_rotation_members!inner (
              id,
              current_function,
              team_member_id (
                id,
                name,
                avatar_url,
                user_id
              )
            ),
            sound_designers_team_rotation_members!inner (
              id,
              team_member_id (
                id,
                name,
                avatar_url,
                user_id
              )
            ),
            data_show_team_rotation_members!inner (
              id,
              team_member_id (
                id,
                name,
                avatar_url,
                user_id
              )
            )
          )
        `,
      )
      .eq('event_type', eventType)
      .gte('date', firstDayOfMonth)
      .lte('date', lastDayOfMonth)

    if (result.error) throw result.error

    const foundRotations: RotationByMonth[] = result.data.map((item: any) => ({
      id: item.id,
      date: dayjs(item.date),
      event_type: item.event_type,
      coordinator: item.team_rotation_members_id.coordinator_id,
      voices_team_rotation_members: formatTemMembersRotation(
        item.team_rotation_members_id.voices_team_rotation_members,
      ),
      instrumentalists_team_rotation_members: formatTemMembersRotation(
        item.team_rotation_members_id.instrumentalists_team_rotation_members,
      ),
      sound_designers_team_rotation_members: formatTemMembersRotation(
        item.team_rotation_members_id.sound_designers_team_rotation_members,
        false,
      ),
      data_show_team_rotation_members: formatTemMembersRotation(
        item.team_rotation_members_id.data_show_team_rotation_members,
        false,
      ),
    }))

    const monthRotations = sundays.map((sunday) => {
      const event = foundRotations.find((item: any) =>
        sunday.isSame(dayjs(item.date), 'day'),
      )
      if (!event) {
        return { date: sunday }
      }
      return event
    })

    return monthRotations
  } catch (error) {
    console.error(error)
    return sundays.map((item) => ({ date: item }))
  }
}

function formatTemMembersRotation(
  list: Array<any>,
  hasCurrentFunction = true,
): TeamRotationMember[] {
  return list.map((item: any) => {
    const teamMember: TeamRotationMember = {
      id: item.id,
      team_member: {
        id: item.team_member_id.id,
        name: item.team_member_id.name,
        avatar_url: item.team_member_id.avatar_url,
        user_id: item.team_member_id.user_id,
      },
      current_function: item.current_function || '',
    }
    if (!hasCurrentFunction) {
      delete teamMember.current_function
    }
    return teamMember
  })
}

interface GetRotationByIdResponse {
  data?: RotationForm
  message?: string
  success: boolean
}

export async function getRotationById(
  id: string,
): Promise<GetRotationByIdResponse> {
  try {
    const { data: foundRotation, error } = await supabase
      .from('team_rotations')
      .select(
        `
          id,
          date,
          event_type,
          rehearsal_time,
          team_rotation_members_id (
            id,
            coordinator_id,
            voices_team_rotation_members!inner (
              id,
              current_function,
              team_member_id (
                id,
                name,
                avatar_url,
                team_members_functions (
                  function_groups (
                    id,
                    function_types,
                    function
                  )
                )
              )
            ),
            instrumentalists_team_rotation_members!inner (
              id,
              current_function,
              team_member_id (
                id,
                name,
                avatar_url,
                team_members_functions (
                  function_groups (
                    id,
                    function_types,
                    function
                  )
                )
              )
            ),
            sound_designers_team_rotation_members!inner (
              id,
              team_member_id (
                id,
                name,
                avatar_url,
                team_members_functions (
                  function_groups (
                    id,
                    function_types,
                    function
                  )
                )
              )
            ),
            data_show_team_rotation_members!inner (
              id,
              team_member_id (
                id,
                name,
                avatar_url,
                team_members_functions (
                  function_groups (
                    id,
                    function_types,
                    function
                  )
                )
              )
            )
          )
        `,
      )
      .eq('id', id)
      .single()
    if (error) throw error

    // console.log(foundRotation)

    const rotation: RotationForm = {
      date: dayjs(foundRotation.date).toDate(),
      event_type: foundRotation.event_type,
      rehearsal_time: foundRotation.rehearsal_time,
      coordinator_id: foundRotation.team_rotation_members_id.coordinator_id,
      voices_team_rotation_members:
        foundRotation.team_rotation_members_id.voices_team_rotation_members.map(
          (item: any) => ({
            id: item.team_member_id.id,
            name: item.team_member_id.name,
            avatar_url: item.team_member_id.avatar_url,
            roles: item.team_member_id.team_members_functions,
            current_function: item.current_function,
          }),
        ),
      instrumentalists_team_rotation_members:
        foundRotation.team_rotation_members_id.instrumentalists_team_rotation_members.map(
          (item: any) => ({
            id: item.team_member_id.id,
            name: item.team_member_id.name,
            avatar_url: item.team_member_id.avatar_url,
            roles: item.team_member_id.team_members_functions,
            current_function: item.current_function,
          }),
        ),
      sound_designers_team_rotation_members:
        foundRotation.team_rotation_members_id.sound_designers_team_rotation_members.map(
          (item: any) => ({
            id: item.team_member_id.id,
            name: item.team_member_id.name,
            avatar_url: item.team_member_id.avatar_url,
            roles: item.team_member_id.team_members_functions,
          }),
        ),
      data_show_team_rotation_members:
        foundRotation.team_rotation_members_id.data_show_team_rotation_members.map(
          (item: any) => ({
            id: item.team_member_id.id,
            name: item.team_member_id.name,
            avatar_url: item.team_member_id.avatar_url,
            roles: item.team_member_id.team_members_functions,
          }),
        ),
    }

    console.log(rotation)

    return {
      data: rotation,
      success: true,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Erro ao carregar dados da escala',
      success: false,
    }
  }
}

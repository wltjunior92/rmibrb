/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs, { Dayjs } from 'dayjs'

import supabase from '@/lib/supabaseClient'
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

    console.log(repertoire)
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
    throw new Error('Error on team members insert')
  }
}

export async function getEventsByMonth(selectedMonth: Dayjs) {
  let monthSundaysCount = 0
  try {
    const firstDayOfMonth = selectedMonth.startOf('month').format('YYYY-MM-DD')
    const lastDayOfMonth = selectedMonth.endOf('month').format('YYYY-MM-DD')
    console.log(firstDayOfMonth, lastDayOfMonth)
    const result = await supabase
      .from('team_rotations')
      .select(
        `
          id,
          date,
          event_type,
          rehearsal_time,
          team_rotation_members_id (
            voices_team_rotation_members!inner (
              id,
              current_function,
              team_member_id (
                id,
                name,
                avatar_url
              )
            ),
            instrumentalists_team_rotation_members!inner (
              id,
              current_function,
              team_member_id (
                id,
                name,
                avatar_url
              )
            ),
            sound_designers_team_rotation_members!inner (
              id,
              team_member_id (
                id,
                name,
                avatar_url
              )
            ),
            data_show_team_rotation_members!inner (
              id,
              team_member_id (
                id,
                name,
                avatar_url
              )
            )
          )
        `,
      )
      .gte('date', firstDayOfMonth)
      .lte('date', lastDayOfMonth)

    if (result.error) throw result.error

    const foundRotations = result.data.map((item: any) => ({
      id: item.id,
      date: dayjs(item.date),
      event_type: item.event_type,
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

    const sundays = countSundaysInMonth(selectedMonth.toDate())
    monthSundaysCount = sundays.length

    const monthRotations = sundays.map((sunday) => {
      const event = foundRotations.find((item: any) =>
        sunday.isSame(dayjs(item.date), 'day'),
      )
      if (event === -1) return undefined
      return event
    })

    return monthRotations
  } catch (error) {
    console.error(error)
    return Array({ length: monthSundaysCount }).map(() => undefined)
  }
}

function formatTemMembersRotation(list: Array<any>, hasCurrentFunction = true) {
  return list.map((item: any) => {
    const teamMember: any = {
      id: item.id,
      team_member: {
        id: item.team_member_id.id,
        name: item.team_member_id.name,
        avatar_url: item.team_member_id.avatar_url,
      },
      current_function: item.current_function || '',
    }
    if (!hasCurrentFunction) {
      delete teamMember.current_function
    }
    return teamMember
  })
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/lib/supabaseClient'

export async function getEventTypesSelectData() {
  const { data } = await supabase.rpc('get_types', {
    enum_type: 'event_types',
  })

  return data
}

export async function getPossibleCoordinators() {
  const { data } = await supabase.from('team_members').select(
    `
        id,
        name,
        avatar_url,
        team_members_functions (
          function_groups (
            function_types,
            function
          )
        )
      `,
  )

  const teamMembers = data
    .filter((item: any) => {
      return item.team_members_functions.some(
        (func: any) =>
          func.function_groups.function_types === 'Voz' ||
          func.function_groups.function_types === 'Instrumental',
      )
    })
    .map((item: any) => {
      return {
        id: item.id,
        name: item.name,
      }
    })

  return teamMembers
}

interface TeamMember {
  id: string
  name: string
  avatar_url: string | null
  team_members_functions: {
    function_groups: {
      id: string
      function: string
      function_types: string
    }
  }[]
}

export interface TeamMembersResponse {
  id: string
  name: string
  avatar_url: string | null
  roles: {
    function_groups: {
      id: string
      function: string
      function_types: string
    }
  }[]
}

function filterMemberByRole(
  data: TeamMember[],
  functionType: 'Voz' | 'Instrumental' | 'Sonoplastia' | 'Data Show',
): TeamMembersResponse[] {
  return data
    .filter((item) =>
      item.team_members_functions.some(
        (func) => func.function_groups.function_types === functionType,
      ),
    )
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
        avatar_url: item.avatar_url ?? null,
        roles: item.team_members_functions.filter(
          (func) => func.function_groups.function_types === functionType,
        ),
      }
    })
}

export interface GetPossibleTeamMembersResponse {
  teamMembersVoices: TeamMembersResponse[]
  teamMembersInstrumental: TeamMembersResponse[]
  teamMembersSonoplastia: TeamMembersResponse[]
  teamMembersDataShow: TeamMembersResponse[]
}

export async function getPossibleTeamMembers(): Promise<GetPossibleTeamMembersResponse> {
  const { data } = await supabase.from('team_members').select(
    `
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
      `,
  )

  const teamMembersVoices = filterMemberByRole(data, 'Voz')
  const teamMembersInstrumental = filterMemberByRole(data, 'Instrumental')
  const teamMembersSonoplastia = filterMemberByRole(data, 'Sonoplastia')
  const teamMembersDataShow = filterMemberByRole(data, 'Data Show')

  return {
    teamMembersVoices,
    teamMembersInstrumental,
    teamMembersSonoplastia,
    teamMembersDataShow,
  }
}

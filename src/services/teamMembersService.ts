/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/lib/supabaseClient'

interface GetTeamMembersParams {
  page?: number
  name?: string
  role?: string
  perPage: number
}

interface TeamMember {
  id: string
  name: string
  roles: string[]
  isActive: boolean
  isAdmin: boolean
  email: string | null | undefined
  phone: string | null | undefined
  avatarUrl: string | null | undefined
  userId: string
}

interface GetTeamMembersResponse {
  total: number
  data: TeamMember[]
}

export async function getTeamMembers({
  page = 1,
  name,
  role,
  perPage,
}: GetTeamMembersParams): Promise<GetTeamMembersResponse> {
  let total = 0
  try {
    const from = perPage * (page - 1)
    const to = 10

    let params: any = {
      from_offset: from,
      to_limit: to,
    }

    if (name) {
      params = {
        ...params,
        search_name: `%${name}%`,
      }
    }

    if (role) {
      params = {
        ...params,
        search_function: role,
      }
    }

    const result = supabase.rpc('get_team_members_by_function_and_name', params)

    const { data, error } = await result

    if (error) throw error

    const teamMembers = data.results.map((teamMember: any) => ({
      id: teamMember.id,
      name: teamMember.name,
      roles: teamMember.functions,
      isActive: teamMember.is_active,
      isAdmin: teamMember.is_admin,
      email: teamMember.user_email,
      phone: teamMember.user_phone,
      userId: teamMember.user_id,
      avatarUrl: teamMember.avatar_url,
    }))

    total = data.total_count || 0

    return {
      data: teamMembers,
      total,
    }
  } catch (error) {
    console.error(error)
  }
  return {
    data: [],
    total,
  }
}

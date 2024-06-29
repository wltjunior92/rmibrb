/* eslint-disable @typescript-eslint/no-explicit-any */
import { TeamMember } from '@/interfaces/TeamMember'
import supabase from '@/lib/supabaseClient'

interface SignInParams {
  email: string
  password: string
}

interface SignInResponse {
  status: 'ok' | 'error'
  message?: string
}

export async function signIn({
  email,
  password,
}: SignInParams): Promise<SignInResponse> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!user || error) {
      return {
        status: 'error',
        message: 'Credenciais inválidas.',
      }
    }
    return {
      status: 'ok',
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'error',
      message: 'Não foi possível fazer login.',
    }
  }
}

interface GetTeamMemberDataParams {
  id: string
  email?: string
  phone?: string
}

export async function getTeamMemberData(user: GetTeamMemberDataParams) {
  const { data, error: err } = await supabase
    .from('team_members')
    .select(
      `
        *,
        team_members_functions (
          id,
          function_groups (
            function_types,
            function
          )
        )
      `,
    )
    .eq('user_id', user.id)
    .limit(1)

  if (err) throw new Error(err)

  const [userCompleteDate] = data
  const teamMember: TeamMember = {
    user: {
      id: user.id,
      email: user.email || '',
      phone: user.phone || '',
    },
    id: userCompleteDate.id,
    name: userCompleteDate.name,
    avatarUrl: userCompleteDate.avatar_url,
    createdAt: userCompleteDate.created_at,
    isActive: userCompleteDate.is_active,
    isAdmin: userCompleteDate.is_admin,
    functions: userCompleteDate.team_members_functions.map((item: any) => ({
      id: item.id,
      name: item.function_groups.function,
      type: item.function_groups.function_types,
    })),
  }

  return teamMember
}

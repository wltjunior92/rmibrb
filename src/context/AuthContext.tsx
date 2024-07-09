import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { TeamMember } from '@/interfaces/TeamMember'
import supabase from '@/lib/supabaseClient'

type AuthProviderProps = {
  children: ReactNode
}

interface AuthContextType {
  session: Session | null
  teamMember: TeamMember | null
  signOut: () => Promise<void>
  setTeamMember: (value: TeamMember | null) => void
  isLoadingSession: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoadingSession, setIsLoadingSession] = useState(true)
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null)

  async function signOut() {
    await supabase.auth.signOut()
    setSession(null)
    setTeamMember(null)
  }

  async function updateSessionData(
    _event: AuthChangeEvent,
    session: Session | null,
  ) {
    setSession(session)
    if (!session) {
      setTeamMember(null)
    }
    setIsLoadingSession(false)
  }

  useEffect(() => {
    setIsLoadingSession(true)
    const { data: authListener } =
      supabase.auth.onAuthStateChange(updateSessionData)

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ session, signOut, teamMember, setTeamMember, isLoadingSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

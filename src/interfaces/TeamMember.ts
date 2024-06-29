import { User } from './User'

interface TeamMemberFunction {
  id: string
  name: string
  type: string
}

export interface TeamMember {
  id: string
  createdAt: Date
  name: string
  isActive: boolean
  isAdmin: boolean
  avatarUrl: string
  user: User
  functions: TeamMemberFunction[]
}

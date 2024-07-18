import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/AppLayout'
import { Dashboard } from './pages/app/dashboard'
import { Repertoire } from './pages/app/repertoire'
import { Rotation } from './pages/app/rotation'
import { UpsertRotation } from './pages/app/rotation/upsertRotation'
import { TeamMembers } from './pages/app/teamMembers'
import { SignIn } from './pages/auth/signIn'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/escalas', element: <Rotation /> },
      { path: '/escalas/adicionar', element: <UpsertRotation /> },
      { path: '/equipe', element: <TeamMembers /> },
      { path: '/repertorio', element: <Repertoire /> },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
])

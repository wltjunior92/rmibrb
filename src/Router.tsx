import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/AppLayout'
import { Dashboard } from './pages/app/dashboard'
import { Musicians } from './pages/app/musicians'
import { Repertoire } from './pages/app/repertoire'
import { Rotation } from './pages/app/rotation'
import { UpsertRotation } from './pages/app/rotation/upsertRotation'
import { SignIn } from './pages/auth/signIn'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/escalas', element: <Rotation /> },
      { path: '/escalas/adicionar', element: <UpsertRotation /> },
      { path: '/musicos', element: <Musicians /> },
      { path: '/repertorio', element: <Repertoire /> },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
])

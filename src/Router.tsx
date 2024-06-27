import { Route, Routes } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/AppLayout'
import { Dashboard } from './pages/app/dashboard'
import { Musicians } from './pages/app/musicians'
import { Repertoire } from './pages/app/repertoire'
import { Rotation } from './pages/app/rotation'
import { SignIn } from './pages/auth/signIn'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route path="/sign-in" element={<SignIn />} />

      <Route path="/" element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/escalas" element={<Rotation />} />
        <Route path="/musicos" element={<Musicians />} />
        <Route path="/repertorio" element={<Repertoire />} />
      </Route>
    </Routes>
  )
}

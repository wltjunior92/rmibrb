import { Route, Routes } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/AppLayout'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/signIn'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route path="/sign-in" element={<SignIn />} />

      <Route path="/" element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

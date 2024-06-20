import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/auth/signIn'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  )
}

import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { Router } from './Router'
import { APP_COLOR_THEME_KEY_NAME } from './utils/constants'

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider storageKey={APP_COLOR_THEME_KEY_NAME}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

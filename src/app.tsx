import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import { Router } from './Router'
import { APP_COLOR_THEME_KEY_NAME } from './utils/constants'

export function App() {
  return (
    <ThemeProvider storageKey={APP_COLOR_THEME_KEY_NAME}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

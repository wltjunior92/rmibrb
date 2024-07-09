import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { queryClient } from './lib/react-query'
import { router } from './Router'
import { APP_COLOR_THEME_KEY_NAME } from './utils/constants'

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider storageKey={APP_COLOR_THEME_KEY_NAME}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

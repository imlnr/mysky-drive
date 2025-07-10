import './App.css'
import { BrowserRouter } from 'react-router'
import MainRoutes from './router/MainRoutes'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './features/Theme/Theme-provider'
import AuthInitializer from './features/auth/components/AuthInitializer'

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthInitializer />
          <MainRoutes />
          <Toaster richColors position="bottom-right" closeButton />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

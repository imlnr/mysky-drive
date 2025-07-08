import './App.css'
import { BrowserRouter } from 'react-router'
import MainRoutes from './router/MainRoutes'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './features/Theme/Theme-provider'
function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <MainRoutes />
          <Toaster richColors position="bottom-right" closeButton />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

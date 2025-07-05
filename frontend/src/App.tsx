import './App.css'
import { BrowserRouter } from 'react-router'
import MainRoutes from './router/MainRoutes'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
function App() {

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <MainRoutes />
        <Toaster richColors position="bottom-right" closeButton />
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import { BrowserRouter } from 'react-router'
import MainRoutes from './router/MainRoutes'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from './redux/store'
import { Provider } from 'react-redux'
function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <MainRoutes />
          <Toaster richColors position="bottom-right" closeButton />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App

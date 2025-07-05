import Home from '@/pages/Home'
import Landing from '@/pages/Landing'
import LoginPage from '@/pages/Login'
import { Routes, Route } from 'react-router-dom'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
        </Routes>
    )
}

export default MainRoutes
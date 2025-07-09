import Folder from '@/pages/Folder'
import Home from '@/pages/Home'
import Landing from '@/pages/Landing'
import LoginPage from '@/pages/Login'
import Logout from '@/pages/Logout'
import SharedWithMe from '@/pages/SharedWithMe'
import { Routes, Route } from 'react-router-dom'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/mydrive' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/mydrive/:id' element={<Folder />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/shared-with-me' element={<SharedWithMe />} />
        </Routes>
    )
}

export default MainRoutes
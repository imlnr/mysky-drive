import Folder from '@/pages/Folder'
import Home from '@/pages/Home'
import Landing from '@/pages/Landing'
import LoginPage from '@/pages/Login'
import Logout from '@/pages/Logout'
import SharedWithMe from '@/pages/SharedWithMe'
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import SharedByMe from '@/pages/SharedByMe'
import Bin from '@/pages/Bin'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/mydrive' element={<PrivateRoutes><Home /></PrivateRoutes>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/mydrive/:id' element={<PrivateRoutes><Folder /></PrivateRoutes>} />
            <Route path='/logout' element={<PrivateRoutes><Logout /></PrivateRoutes>} />
            <Route path='/shared-with-me' element={<PrivateRoutes><SharedWithMe /></PrivateRoutes>} />
            <Route path='/shared-by-me' element={<PrivateRoutes><SharedByMe /></PrivateRoutes>} />
            <Route path='/bin' element={<PrivateRoutes><Bin /></PrivateRoutes>} />
        </Routes>
    )
}

export default MainRoutes
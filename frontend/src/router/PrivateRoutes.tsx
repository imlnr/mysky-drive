import { useSelector } from 'react-redux'
import Login from '../pages/Login';
import type { AppState } from '@/lib/types';
import Cookies from 'js-cookie';

interface PrivateRoutesProps {
    children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
    const isLogin = useSelector((state: AppState) => state.isLoggedIn);
    const isLoggedInFromCookie = Boolean(Cookies.get("isLoggedIn"));

    // Use cookie as fallback if Redux state is not updated yet
    const isAuthenticated = isLogin || isLoggedInFromCookie;

    return (
        <>
            {isAuthenticated ? children : <Login />}
        </>
    )
}

export default PrivateRoutes
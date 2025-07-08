// import { GET_LOGOUT_USER } from '@/redux/AppReducer/action-types';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    useEffect(() => {
        // Simulate logout process
        document.title = "PokéDex - logout"
        const timer = setTimeout(() => {
            // Clear any auth tokens or user data here
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            Cookies.remove("isLoggedIn")
            // dispatch({ type: GET_LOGOUT_USER })
            // Redirect to login page
            navigate('/login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-12 bg-muted">
            <div className="max-w-2xl text-center animate-fade-in-up">
                <div className="mb-8">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Logging You Out</h2>
                <p className="text-lg text-primary/70 leading-relaxed">
                    Thank you for using our platform. We're securely logging you out...
                </p>
                <p className="text-sm text-primary/50 mt-4">
                    You'll be redirected to the login page in a moment
                </p>
            </div>
        </div>
    );
};

export default Logout;
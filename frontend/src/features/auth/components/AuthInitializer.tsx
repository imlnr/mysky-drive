import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { getUser } from '@/redux/AppReducer/action'

const AuthInitializer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        const isLoggedIn = Cookies.get('isLoggedIn')

        console.log('AuthInitializer: accessToken =', accessToken ? 'exists' : 'missing')
        console.log('AuthInitializer: isLoggedIn =', isLoggedIn)

        // If we have tokens and login state, try to get user info
        if (accessToken && isLoggedIn === 'true') {
            console.log('AuthInitializer: Dispatching getUser')
            dispatch(getUser() as any)
        }
    }, [dispatch])

    return null // This component doesn't render anything
}

export default AuthInitializer 
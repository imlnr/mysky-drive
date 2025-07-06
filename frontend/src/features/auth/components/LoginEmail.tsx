import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useState } from 'react'
import { showToast } from '@/features/toast/toastUtils'
import { googleLogin, sendOtp } from '@/redux/action'

const LoginEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Login Success:', tokenResponse);


            // You can fetch user profile with tokenResponse.access_token
            const accessToken = tokenResponse.access_token;
            const response = await googleLogin(accessToken);
            if (response) {
                Cookies.set("accessToken", response.accessToken, { expires: 1 / 24 }); // 1 hour expiration
                Cookies.set("refreshToken", response.refreshToken, { expires: 1 / 24 }); // 1 hour expiration
                Cookies.set("isLoggedIn", "true", { expires: 1 / 24 }); // 1 hour expiration
                navigate("/home")
            }
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            // dispatch({ type: GET_USER_FAILURE })
        },
        flow: 'implicit', // or 'auth-code' if you're doing backend verification
    });
    const handleOtpLogin = async () => {
        if (!email) {
            setError("This field is required");
            return;
        } else {
            setError("");
        }
        // Navigate to the same route with email as query param
        try {
            const response = await sendOtp(email);
            if (response) {
                Cookies.set("accessToken", response.accessToken, { expires: 1 / 24 }); // 1 hour expiration
                Cookies.set("refreshToken", response.refreshToken, { expires: 1 / 24 }); // 1 hour expiration
                Cookies.set("isLoggedIn", "true", { expires: 1 / 24 }); // 1 hour expiration
                navigate(`/login?email=${encodeURIComponent(email)}`);
                showToast("OTP sent to your email", "success")
            }
        } catch (error) {
            showToast("Something went wrong", "error")
        }
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome</CardTitle>
                <CardDescription>
                    Login with Google account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-5">
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={error ? 'ring-2 ring-red-500 focus:ring-red-500' : ''}
                            />
                            {error && (
                                <div className="text-red-500 text-xs mt-0.5">{error}</div>
                            )}
                        </div>
                        <Button type="submit" className="w-full" onClick={handleOtpLogin}>
                            Login
                        </Button>
                    </div>
                    {/* <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div> */}
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Or continue with
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button variant="outline" className="w-full" onClick={() => handleGoogleLogin()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Login with Google
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginEmail
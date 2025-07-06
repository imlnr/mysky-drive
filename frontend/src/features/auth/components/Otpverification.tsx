import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { showToast } from '@/features/toast/toastUtils'
import { sendOtp, verifyOtp } from '@/redux/AppReducer/action'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
const Otpverification = () => {
    const [value, setValue] = useState("")
    const [timer, setTimer] = useState(60)
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const navigate = useNavigate();

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerifyOtp = async () => {
        try {
            await verifyOtp(email || "", value)
            navigate("/home")
        } catch (error) {
            showToast("Invalid OTP", "error")
        }
    }
    useEffect(() => {
        if (value.length === 6) {
            handleVerifyOtp();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const resendOtp = async () => {
        await sendOtp(email || "")
        console.log("resendOtp")
        setTimer(60)
    }
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Enter your Otp</CardTitle>
                <CardDescription>
                    Enter the OTP sent to your email
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 w-full grid gap-6 place-items-center">
                    <InputOTP
                        maxLength={6}
                        size={6}
                        value={value}
                        onChange={(value) => setValue(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <div className="w-full grid gap-3">

                        {timer > 0 ? (
                            <div className="w-full text-center text-muted-foreground text-sm">Resend OTP in {timer} seconds</div>
                        ) : (
                            <Button variant="outline" className="w-full" onClick={resendOtp}>
                                Resend OTP
                            </Button>
                        )}
                        <Button type="submit" className="w-full" onClick={handleVerifyOtp}>
                            Verify OTP
                        </Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default Otpverification
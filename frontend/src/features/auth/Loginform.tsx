import { cn } from "@/lib/utils"
import LoginEmail from "./components/LoginEmail"
import { useLocation } from "react-router-dom"
import Otpverification from "./components/Otpverification"
import { AnimatePresence, motion } from "framer-motion"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <AnimatePresence mode="wait" initial={false}>
                {email ? (
                    <motion.div
                        key="otp"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Otpverification />
                    </motion.div>
                ) : (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LoginEmail />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

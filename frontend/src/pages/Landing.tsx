import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { AppState } from "@/lib/types"
import { Menu } from "lucide-react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const NAV_HEIGHT = "4.5rem"

const Landing = () => {
    const isLoggedIn = useSelector((state: AppState) => state.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/mydrive")
        }
    }, [isLoggedIn])
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Floating Navbar */}
            <header
                className="fixed top-0 left-0 w-full z-30 bg-background/80 backdrop-blur border-b border-border"
                style={{ height: NAV_HEIGHT }}
            >
                <nav className="max-w-6xl mx-auto flex items-center justify-between h-full px-4 sm:px-8">
                    {/* Logo */}
                    <div
                        className="font-extrabold text-2xl tracking-tight select-none cursor-pointer"
                        style={{ fontFamily: 'system-ui, Inter, Helvetica, Arial, sans-serif' }}
                        onClick={() => navigate("/")}
                    >
                        SkyDrive
                    </div>
                    {/* Desktop Login Button */}
                    <div className="hidden sm:flex">
                        <Button size="lg" className="rounded-full px-6 shadow-md" onClick={() => navigate("/login")}>Login</Button>
                    </div>
                    {/* Mobile Hamburger */}
                    <div className="sm:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu">
                                    <Menu className="size-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="flex flex-col gap-8 pt-24">
                                <Button size="lg" className="rounded-full w-full" onClick={() => navigate("/login")}>Login</Button>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-12 sm:pt-40">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                    Your Cloud. <span className="text-primary">Your Files.</span> Anywhere.
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Effortlessly store, organize, and access your files from any device. Experience the next generation of cloud file management—secure, fast, and beautifully simple.
                </p>
                <Button size="lg" className="rounded-full px-8 text-lg shadow-lg" onClick={() => navigate("/login")}>Get Started</Button>
            </main>
        </div>
    )
}

export default Landing
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { type ReactNode } from "react"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "../Theme/Mode-toggle"
// import { useDispatch } from "react-redux"
// import { getUser } from "@/redux/AppReducer/action"
// import { getUser } from "@/redux/AppReducer/action"



interface SidebarWrapperProps {
    children: ReactNode
}

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getUser() as any);
    // }, [])

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col h-full">
                <header className="flex h-16 shrink-0 items-center justify-between pr-4 bg-sidebar gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-10">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                    </div>
                    <ModeToggle />
                </header>
                <div className="flex-1 overflow-y-auto p-2">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

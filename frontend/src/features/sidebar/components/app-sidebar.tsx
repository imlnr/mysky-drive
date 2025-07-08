
import React from "react"
import {
    HomeIcon,
    User2
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import type { AppState } from "@/lib/types"
import { useSelector } from "react-redux"


// This is sample data.
const navMain = [
    {
        title: "Home",
        url: "/mydrive",
        icon: HomeIcon,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User2,
    }
]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useSelector((state: AppState) => state.user);
    return (
        <Sidebar collapsible="icon" {...props} >
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent >
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user as any} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

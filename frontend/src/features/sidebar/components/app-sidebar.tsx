
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
    return (
        <Sidebar collapsible="icon" {...props} >
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent >
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{} as any} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

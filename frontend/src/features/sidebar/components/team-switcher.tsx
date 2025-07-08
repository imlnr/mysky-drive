import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Cloud } from "lucide-react"

export function TeamSwitcher() {


    return (
        <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-center">
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="bg-sidebar-border text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        {/* <activeTeam.logo className="size-4" /> */}
                        {/* <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                            alt="Pikachu"
                            className="aspect-square w-full h-full"
                        /> */}
                        <Cloud className="stroke-muted-foreground" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">SkyDrive</span>
                        <span className="truncate text-xs">Your Personal Cloud Storage</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

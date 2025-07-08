import { type LucideIcon } from "lucide-react"
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import clsx from "clsx"
import { useLocation, useNavigate } from "react-router"
import { UploadDropdown } from "./UploadDropdown"

export function NavMain({
    items
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        items?: { title: string; url: string }[]
    }[]
}) {
    const navigate = useNavigate();
    const path = useLocation().pathname;
    return (
        <SidebarMenu>
            <UploadDropdown />
            {items.map((item) => {
                const Icon = item.icon
                return (
                    <SidebarMenuItem
                        key={item.title}
                        className={clsx(
                            "flex items-center justify-center transition-all",
                            "px-2 data-[sidebar=collapsed]:px-0"
                        )}
                    >
                        <SidebarMenuButton
                            onClick={() => navigate(item?.url)}
                            tooltip={item.title}
                            className={clsx(
                                "flex items-center gap-2 w-full px-3 py-2 rounded-md h-full text-sm font-medium transition-colors",
                                path.includes(item.url)
                                    ? "bg-accent text-primary"
                                    : "hover:bg-muted hover:text-foreground text-muted-foreground",
                                "data-[sidebar=collapsed]:px-0 data-[sidebar=collapsed]:justify-center"
                            )}
                        >
                            {Icon && <Icon className="size-4" />}
                            <span className="data-[sidebar=collapsed]:hidden">{item.title}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
    )
}

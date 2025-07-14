import { ChevronRight } from "lucide-react"
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import clsx from "clsx"
import { useLocation, useNavigate } from "react-router"
import { UploadDropdown } from "./UploadDropdown"

export function NavMain({
    items
}: {
    items: {
        title: string
        url: string
        icon?: any
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
                const hasSubItems = Array.isArray(item.items) && item.items.length > 0;
                if (hasSubItems) {
                    return (
                        <Collapsible key={item.title} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm">
                                    <CollapsibleTrigger className="flex items-center w-full cursor-pointer select-none px-3 py-2 rounded-md">
                                        {Icon && <Icon className="size-4 mr-2" />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {(item.items ?? []).map((sub) => (
                                                <SidebarMenuItem key={sub.title}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={path.includes(sub.url)}
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate(sub.url)}
                                                            className="w-full text-left"
                                                        >
                                                            {sub.title}
                                                        </button>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    )
                }
                // Regular item
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

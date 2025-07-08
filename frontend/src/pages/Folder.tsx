import DynamicBreadcrumbs from "@/features/components/DynamicBreadcrumbs"
import SidebarWrapper from "@/features/sidebar/Sidebar"

const Folder = () => {
    return (
        <SidebarWrapper>
            <DynamicBreadcrumbs />
            <div>Folder</div>
        </SidebarWrapper>
    )
}

export default Folder
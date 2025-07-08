import MainHome from "@/features/home/MainHome"
import SidebarWrapper from "@/features/sidebar/Sidebar"

const Home = () => {
    return (
        <SidebarWrapper>
            <MainHome />
        </SidebarWrapper>
    )
}

export default Home
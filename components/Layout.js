import SideNavbar from "./SideNavbar";

export default function Layout({children}) {
    return (
        <div className="flex gap-5 md:flex-row flex-col ">
            <SideNavbar/>
            <div className="overflow-auto w-[1000px] h-screen">
                {children}
            </div>
        </div>
    )
}
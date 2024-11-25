import SideNavbar from "./SideNavbar";

export default function Layout({children}) {
    return (
        <div className="flex gap-5 md:flex-row flex-col ">
            <SideNavbar/>
            {children}
        </div>
    )
}
import SideNavbar from "./SideNavbar";

export default function Layout({children}) {
    return (
        <div className="flex gap-5 ">
            <SideNavbar/>
            <div className="md:ml-0 -ml-24">{children}</div>
        </div>
    )
}
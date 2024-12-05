import SideNavbar from "./SideNavbar";

export default function Layout({ children }) {
    return (
        <div className="flex gap-5 md:flex-row flex-col h-screen">
            <SideNavbar />
            <div className="overflow-auto flex-grow mr-[0.5%]">
                {children}
            </div>
        </div>
    );
}

import NavHeader from "@/components/ui/nav-header";
import Branding from "@/components/ui/branding";
import { LightDarkToogle } from "@/components/ui/light-dark-toogle";

function Header() {
    return (
        <header className="flex justify-between items-center h-auto py-3 px-3 md:px-5 lg:px-10">
            <div className="flex-1 flex justify-start">
                <Branding />
            </div>
            <div className="flex-1 flex justify-center">
                <NavHeader />
            </div>
            <div className="flex-1 flex justify-end">
                <LightDarkToogle />
            </div>
        </header>
    );
}

export default Header
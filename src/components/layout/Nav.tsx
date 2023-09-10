import { NavLink, Outlet } from "react-router-dom";
import NavButton from "../navigation/NavButton";

const Nav = () => {
    return (
        <div className="relative max-w-7xl w-full mx-auto">
            <div className="absolute w-full">
                <header className="flex items-center justify-between px-28 pt-6">
                    <div>
                        <NavLink
                            to={"/"} 
                            className="text-white font-bold text-3xl"
                        >
                            HypeStock
                        </NavLink>
                    </div>

                    <nav className="flex items-center space-x-6">
                        <NavButton 
                            title="Tickers"
                            path="/tickers"
                        />
                    </nav>

                    <div>
                        <NavLink
                            className="text-white font-medium transition duration-150 ease-in-out hover:text-pink-400"
                            to={"/login"}
                        >
                            Log in
                        </NavLink>
                    </div>
                </header>
            </div>

            <div className="min-h-screen">
                <Outlet />
            </div>
        </div>
    );
}

export default Nav;
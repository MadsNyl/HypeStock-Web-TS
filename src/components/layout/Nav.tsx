import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Nav: React.FC = () => {

    const { auth } = useAuth();

    return (
        <div className="bg-gray-100 font-sans overflow-x-hidden text-gray-900 relative">
            <header className="flex items-center justify-between pt-6 pb-20 px-24">
                <div>
                    <NavLink 
                        to={"/"}
                        className="text-emerald-500 font-bold text-2xl"
                    >
                        HypeStock
                    </NavLink>
                </div>

                <nav className="flex items-center space-x-8">
                    <NavLink
                        to="/"
                    >
                        <h1 className="transition duration-150 ease-in-out hover:text-emerald-500">
                            overview
                        </h1>
                    </NavLink>
                    <NavLink
                        to="/"
                    >
                        <h1 className="transition duration-150 ease-in-out hover:text-emerald-500">
                            about
                        </h1>
                    </NavLink>
                    <NavLink
                        to="/tickers"
                    >
                        <h1 className="transition duration-150 ease-in-out hover:text-emerald-500">
                            tickers
                        </h1>
                    </NavLink>
                </nav>

                <div className="flex items-center space-x-6">
                    <NavLink 
                        to={"/login"}
                        className="px-8 py-2 rounded-full bg-gray-800 border border-gray-700"
                    >
                        <h1 className="text-gray-200">
                            Login
                        </h1>
                    </NavLink>
                </div>
            </header>

            <div className="max-w-8xl mx-auto min-h-screen">
                <Outlet />
            </div>

            <div className="max-w-8xl mx-auto">
                <footer className="py-12 px-6 bg-gray-900">

                </footer>
            </div>
        </div>
    );
}

export default Nav;
import { NavLink, Outlet } from "react-router-dom";
import Profile from "../../icons/Profile";
import useAuth from "../../hooks/useAuth";


const Nav: React.FC = () => {

    const { auth } = useAuth();

    return (
        <div className="bg-slate-100 font-sans overflow-x-hidden text-gray-900 relative">
            <header className="flex justify-between items-center bg-white shadow-sm px-12 py-6 max-w-8xl">
                <div>
                    <NavLink
                        to={"/"}
                        className={"text-3xl font-bold text-emerald-500"}
                    >
                        HypeStock
                    </NavLink>
                </div>

                <div className="flex items-center space-x-10">
                    <nav>

                    </nav>

                    <div className="flex items-center space-x-6">
                        <NavLink
                            to={
                                auth.accessToken.length
                                    ? "/dashboard/profile"
                                    : "/login"
                            }
                            className="text-gray-500 transition duration-150 ease-in-out hover:text-emerald-500"
                        >
                            <Profile
                                style="w-8 h-8"
                            />
                        </NavLink>
                    </div>
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
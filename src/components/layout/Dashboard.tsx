import { Outlet, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Logout from "../../icons/Logout";
import User from "../../icons/User";
import Newspaper from "../../icons/Newspaper";
import Navigation from "../../types/Navigation";
import { NavLink } from "react-router-dom";
import ArchiveBox from "../../icons/ArchiveBox";
import isActiveUrl from "../../utils/isActiveUrl";
import Users from "../../icons/Users";
import Role from "../../enums/Role";
import isRoleLocked from "../../utils/isRoleLocked";
import Settings from "../../icons/Settings";
import Code from "../../icons/Code";
import Chat from "../../icons/Chat";


const Dashboard: React.FC = () => {

    const logout = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    const navigations = [
        {
            name: "account",
            path: "/dashboard/profile",
            icon: <User style="w-6 h-6" />,
            roles: [Role.Admin, Role.Editor, Role.User]
        },
        {
            name: "newspapers",
            path: "/dashboard/newspapers",
            icon: <Newspaper style="w-6 h-6" />,
            roles: [Role.Admin, Role.Editor]
        },
        {
            name: "articles",
            path: "/dashboard/articles",
            icon: <ArchiveBox style="w-6 h-6" />,
            roles: [Role.Admin, Role.Editor]
        },
        {
            name: "reddit",
            path: "/dashboard/reddit",
            icon: <Chat style="w-6 h-6" />,
            roles: [Role.Admin, Role.Editor]
        },
        {
            name: "users",
            path: "/dashboard/users",
            icon: <Users style="w-6 h-6" />,
            roles: [Role.Admin]
        },
        {
            name: "config",
            path: "/dashboard/config",
            icon: <Settings style="w-6 h-6" />,
            roles: [Role.Admin, Role.Editor]
        },
        {
            name: "beta",
            path: "/dashboard/beta",
            icon: <Code style="w-6 h-6" />,
            roles: [Role.Admin, Role.Editor]
        }
    ];

    const NavigationTab: React.FC<Navigation> = ({ name, path, icon, roles }) => {
        return (
            <div className="md:w-full">
                <NavLink
                    to={path}
                    className={(
                        isActiveUrl(path)
                            ? "bg-emerald-200"
                            : ""
                    ) +
                    (
                        !isRoleLocked(roles)
                            ? " hidden"
                            : ""
                    ) +
                    " md:space-x-2 md:px-6 px-2 flex justify-center md:justify-start items-center py-1 md:py-2 rounded-md transition duration-150 ease-in-out hover:bg-emerald-200"}
                >
                    { icon }
                    <p className={"capitalize hidden md:block"}>
                        { name }
                    </p>
                </NavLink>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 font-sans overflow-x-hidden text-gray-900 relative">
            <div className="flex relative">
                <div className={"w-60 px-2 hidden md:block md:fixed h-screen shadow-md bg-white"}>

                    <div className="w-full flex justify-center mt-8">
                        <NavLink 
                            to={"/"}
                            className="text-emerald-500 font-bold text-3xl"
                        >
                            HypeStock
                        </NavLink>
                    </div>

                    <nav className="pt-20 pb-32 space-y-1">
                        {
                            navigations.map((item, index) => {
                                return <NavigationTab 
                                            key={index}
                                            name={item.name}
                                            path={item.path}
                                            icon={item.icon} 
                                            roles={item.roles}
                                        />
                            })
                        }
                    </nav>

                    <div className="w-full">
                        <button
                            onClick={handleLogout}
                            className={"space-x-2 px-6 w-full flex items-center py-2 rounded-md bg-black text-white duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"}
                        >
                            <Logout style="w-6 h-6" />
                            <p className={"font-semibold"}>
                                Logout
                            </p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="md:hidden fixed w-full px-6 py-4 bg-white border-b border-b-slate-200 shadow-sm z-10">
                <div>
                    <NavLink
                        to={"/"}
                        className="text-emerald-500 text-xl font-bold"
                    >
                        HypeStock
                    </NavLink>
                </div>
            </div>

            <div className="md:hidden fixed w-full px-6 py-4 bg-white rounded-t-lg border-t bottom-0 border-t-slate-200 shadow-sm z-10">
                <div className="flex justify-between items-center space-x-2">
                    {
                        navigations.map((item, index) => {
                            return <NavigationTab 
                                        key={index}
                                        name={item.name}
                                        path={item.path}
                                        icon={item.icon} 
                                        roles={item.roles}
                                    />
                        })
                    }
                    <button
                        onClick={handleLogout}
                        className="px-2"
                    >
                        <Logout style="w-6 h-6" />
                    </button>
                </div>
            </div>
            
            <div className={"md:ml-60 min-h-screen"}>
                <div className="w-full relative">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
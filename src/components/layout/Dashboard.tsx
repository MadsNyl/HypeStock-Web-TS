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
import { useState } from "react";
import ChevronDoubleLeft from "../../icons/ChevronDoubleLeft";
import ChevronDoubleRight from "../../icons/ChevronDoubleRight";


const Dashboard: React.FC = () => {

    const logout = useLogout();
    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    const navigations = [
        {
            name: "my profile",
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
    ];

    const NavigationTab: React.FC<Navigation> = ({ name, path, icon, roles }) => {
        return (
            <div className="w-full">
                <NavLink
                    to={path}
                    className={(
                        isActiveUrl(path)
                            ? "bg-slate-900 text-white"
                            : ""
                    ) +
                    (
                        !isRoleLocked(roles)
                            ? " hidden"
                            : ""
                    ) +
                    (
                        open
                            ? " space-x-2 px-6"
                            : " justify-center"
                    ) +
                    " flex items-center py-2 rounded-md border border-slate-200 bg-slate-50 transition duration-150 ease-in-out hover:bg-slate-900 hover:text-white"}
                >
                    { icon }
                    <p className={(open ? "" : "hidden") + " capitalize"}>
                        { name }
                    </p>
                </NavLink>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 font-sans overflow-x-hidden text-gray-900 relative">
            <div className="flex relative">
                <div className={(open ? "w-60 px-6" : "w-24 px-2") + " fixed h-screen rounded-r-lg shadow-md bg-white"}>

                    <button 
                        onClick={() => setOpen(!open)}
                        className="absolute top-0 right-0 w-8 h-8 rounded-l-full bg-slate-100 border border-slate-300 shadow-sm flex justify-center items-center transition duration-150 ease-in-out hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                    >
                        {
                            open
                                ? <ChevronDoubleLeft style="w-4 h-4" />
                                : <ChevronDoubleRight style="w-4 h-4" />
                        }
                    </button>

                    <div className="w-full flex justify-center mt-8">
                        <NavLink 
                            to={"/"}
                            className="text-emerald-500 font-bold text-3xl"
                        >
                            { open ? "HypeStock" : "H"}
                        </NavLink>
                    </div>

                    <nav className="pt-20 pb-32 space-y-6">
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
                            className={(open ? "space-x-2 px-6" : "justify-center") + " w-full flex items-center py-2 rounded-md bg-black text-white duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"}
                        >
                            <Logout style="w-6 h-6" />
                            <p className={(open ? "" : "hidden") + " font-semibold"}>
                                Logout
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className={(open ? "ml-60" : "ml-24") +  " min-h-screen"}>
                <div className="w-full relative">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
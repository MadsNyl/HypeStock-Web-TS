import { NavLink } from "react-router-dom";
import { NavButtonType } from "../../types/Button";


const NavButton: React.FC<NavButtonType> = ({ title, path, type, icon }) => {
    return (
        <NavLink
            to={path}
        >
            {
                !icon
                    ? title
                    : 
                    <div
                        className={
                            (
                                type === "basic"
                                    ? "bg-slate-900"
                                    : "bg-emerald-400"
                            ) +
                            (
                                !icon
                                    ? ""
                                    : " flex items-center"
                            ) +
                            " text-white px-3 py-1 rounded-md transition duration-150 ease-in-out hover:bg-slate-300 hover:text-slate-900"
                        }
                    >
                        { title }
                        { icon }
                    </div>
                    
            }
        </NavLink>
    );
}


export default NavButton;
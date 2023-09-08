import { NavLink } from "react-router-dom";


type NavContent = {
    path: string;
    title: string;
}

const NavButton = ({path, title}: NavContent) => {
    return (
        <NavLink
            className="text-white font-medium transition duration-150 ease-in-out hover:text-pink-400"
            to={path}
        >
            { title }
        </NavLink>
    );
}


export default NavButton;
import { useLocation } from "react-router-dom";


const isActiveUrl = (path: string): boolean => {
    const location = useLocation();
    const { pathname } = location;

    return pathname.includes(path);
}

export default isActiveUrl;
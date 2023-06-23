import axios from "../api/axios";
import { defaultAuthData } from "../context/AuthProvider";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth(defaultAuthData);
        try {
            await axios('/auth/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
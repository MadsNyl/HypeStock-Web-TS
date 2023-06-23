import { createContext, useState } from "react";
import ComponentChildren from "../types/ComponentChildren";
import ContextAuth, { AuthObject } from "../types/ContextAuth";


export const defaultAuthData: AuthObject = {
    username: "",
    accessToken: "",
    role: 0
}

const AuthContext = createContext<ContextAuth>({
    auth: defaultAuthData,
    setAuth: () => {},
    persist: false,
    setPersist: () => {}
});

export const AuthProvider: React.FC<ComponentChildren> = ({ children }) => {
    const [auth, setAuth] = useState<AuthObject>(defaultAuthData);
    const [persist, setPersist] = useState<boolean>(
        () => JSON.parse(localStorage.getItem("persist") || "false")
    );

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContext;
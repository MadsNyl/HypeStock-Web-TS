
export type AuthObject = {
    username: string,
    accessToken: string;
    role: number;
}


type ContextAuth = {
    auth: AuthObject;
    setAuth: React.Dispatch<React.SetStateAction<AuthObject>>;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>
}


export default ContextAuth;
import useAuth from "../hooks/useAuth";

const isRoleLocked = (roles: number[]): boolean => {
    const { auth } = useAuth();

    return roles.includes(auth.role);
}

export default isRoleLocked;
type User = {
    username: string;
    password?: string;
    role?: number;
}

export const defaultUser = {
    username: "",
    password: ""
}

export default User;
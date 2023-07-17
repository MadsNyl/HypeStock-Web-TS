type User = {
    username: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    role?: number;
}

export const defaultUser = {
    username: "",
    password: ""
}

export default User;
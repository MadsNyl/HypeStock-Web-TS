import Role from "../enums/Role";


const isAdmin = (role: number): boolean => {
    return role === Role.Admin;
}


export default isAdmin;
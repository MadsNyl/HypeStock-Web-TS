import { useEffect, useState } from "react";
import Pencil from "../../icons/Pencil";
import AddUser from "../../icons/AddUser";
import User, { defaultUser } from "../../types/User";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Role from "../../enums/Role";
import { AxiosError } from "axios";
import UserModal from "../../types/UserModal";
import EditUser from "../../components/modal/EditUser";
import Snackbar from "../../components/Snackbar";


const UsersPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([])
    const [errMsg, setErrMsg] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editUser, setEditUser] = useState<User>(defaultUser);

    const getUsers = async () => {
        try {
            const response = await axios.get(`/user/role?role=${Role.Editor}`);
            
            setUsers(response?.data.users);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (!error?.response) {
                    setErrMsg("No server response.");
                } else {
                    setErrMsg(error.response.data);
                }
            }
        } 
    }

    const createEditor = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await axios.post(
                "/auth/editor",
                JSON.stringify({
                    username: username,
                    password: password,
                    rePassword: rePassword
                })
            );

            await getUsers();
            setShowSnackbar(true);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    },[]);

    return (
        <>

            <Snackbar 
                showBar={showSnackbar}
                setShowBar={setShowSnackbar}
                success={true}
                message="New editor created."
            />

            <EditUser 
                openModal={openModal}
                setOpenModal={setOpenModal}
                user={editUser}
            />

            <div className="px-6 md:px-12">
                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Users
                    </h1>

                    <div>
                    </div>
                </div>

                <div className="pb-24 md:flex md:justify-between space-y-16 md:space-y-0">
                    <div className="max-w-lg w-full">
                        <div className="flex items-center space-x-2 pb-6 md:pb-8 md:px-6">
                            <h1 className="text-2xl font-semibold">
                                Editors
                            </h1>
                            <Pencil style="w-7 h-7 text-emerald-500" />
                        </div>

                        <table className="mx-auto w-full text-left shadow-sm border border-slate-200">
                            <thead className="text-sm uppercase bg-slate-900 text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 rounded-tl-lg">
                                        username
                                    </th>
                                    <th scope="col" className="px-6 py-3 rounded-tr-lg">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                {
                                    !errMsg.length
                                        ? ""
                                        : 
                                        <tr 
                                            className="bg-white w-full"
                                        >
                                            <td colSpan={2} className="text-red-800 text-xl font-semibold text-center py-8">
                                                { errMsg }
                                            </td>
                                        </tr>
                                }

                                {
                                    users.map((item, index) => {
                                        return <UserRow 
                                                    key={index}
                                                    user={item}
                                                    setOpenModal={setOpenModal}
                                                    setEditUser={setEditUser}
                                                />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="max-w-lg w-full">
                        <div className="flex items-center space-x-2 pb-6 md:pb-8 md:px-6">
                            <h1 className="text-2xl font-semibold">
                                Add editor
                            </h1>
                            <AddUser style="w-7 h-7 text-emerald-500" />
                        </div>

                        <form
                            className="bg-white shadow-sm rounded-md border border-slate-200 px-8 py-6"
                            onSubmit={createEditor}
                        >
                            <div className="pb-6">
                                <div>
                                    <h1 className="text-xl font-semibold pb-4">
                                        Username <span className="text-red-300">*</span>
                                    </h1>
                                </div>
                                <div>
                                    <input
                                        className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full" 
                                        type="email"
                                        required 
                                        onChange={e => setUsername(e.target.value)}
                                        value={username}
                                    />
                                </div>
                            </div>

                            <div className="pb-6">
                                <div>
                                    <h1 className="text-xl font-semibold pb-4">
                                        Password <span className="text-red-300">*</span>
                                    </h1>
                                </div>
                                <div>
                                    <input
                                        className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full" 
                                        type="password"
                                        required 
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </div>
                            </div>

                            <div className="pb-6">
                                <div>
                                    <h1 className="text-xl font-semibold pb-4">
                                        Repeat password <span className="text-red-300">*</span>
                                    </h1>
                                </div>
                                <div>
                                    <input
                                        className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full" 
                                        type="password"
                                        required 
                                        onChange={e => setRePassword(e.target.value)}
                                        value={rePassword}
                                    />
                                </div>
                            </div>

                            <div>
                            <button 
                                disabled={isLoading}
                                className={(isLoading ? "bg-slate-300 text-gray-900" : "") + " max-w-sm w-full py-2 rounded-md bg-emerald-400 text-white font-semibold text-lg duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"}
                            >
                                Add editor
                            </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}

const UserRow: React.FC<UserModal> = ({ user, setOpenModal, setEditUser }) => {
    return (
        <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium">
                { user.username }
            </th>
            <td className="px-6 py-4 text-right">
                <button
                    onClick={() => {
                        setOpenModal(true);
                        setEditUser && setEditUser(user);
                    }}
                    className="font-medium text-emerald-500 hover:text-slate-900"
                >
                    Edit
                </button>
            </td>
        </tr>
    );
}

export default UsersPage;
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserModal from "../../types/UserModal";
import Modal from "../wrapper/Modal";
import { useEffect, useState } from "react";


const EditUser: React.FC<UserModal> = ({ openModal, setOpenModal, user }) => {

    const axios = useAxiosPrivate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [_isLoadingDelete, _setLoadingDelete] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);

    const [role, setRole] = useState<number>(user.role || 0);
    const [roleLabel, setRoleLabel] = useState<string>("");

    const options = [
        { value: 1984, label: "Editor" },
        { value: 2001, label: "User" }
    ];

    useEffect(() => {
        if (openModal) {
            const roleMatch = options.find(option => option.value === user.role);
            roleMatch && setRoleLabel(roleMatch?.label);
            setRole(user?.role || 0);
        }
    }, [openModal]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selected = options.find(option => option.value === Number(selectedValue));
        console.log(selected)

        if (selected) {
            setRole(selected?.value);
            setRoleLabel(selected?.label);
        }

    }

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(
                "/user/update",
                JSON.stringify({
                    username: user?.username,
                    role: role
                })
            );
            
            window.location.reload();
        } catch (e) {
            
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async () => {

    }

    // const deleteNewspaper = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setLoadingDelete(true);

    //     try {
    //         await axios.delete(
    //             `/newspaper/delete/${provider}`
    //         );
            
    //         window.location.reload();
    //     } catch (e) {
            
    //     } finally {
    //         setLoadingDelete(false);
    //     }
    // }
 
    return (
        <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
        >
            <div>
                <h1 className="text-xl font-semibold pb-8">
                Edit user 
                </h1>

                <div className="flex justify-between">
                    <form
                        onSubmit={update}
                        className="space-y-8 max-w-md w-full"
                    >
                        <div>
                            <h1 className="pb-2 font-semibold">
                                Username
                            </h1>
                            <input 
                                className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                                type="text" 
                                value={user?.username}
                                disabled
                                required
                            />
                        </div>

                        <div className="flex space-x-12">
                            <div>
                                <h1 className="pb-2 font-semibold">
                                    Roles
                                </h1>
                                <select
                                    onChange={handleSelect}
                                    value={roleLabel}
                                    className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                                >
                                    <option value="">Select a role</option>
                                    {
                                        options.map((item, index) => {
                                            return <option key={index} value={item.value}>{ item.label }</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <h1 className="pb-2 font-semibold">
                                    Selected role
                                </h1>
                                <p className="font-medium">
                                    { roleLabel } - { role }
                                </p>
                            </div>
                        </div>

                        <div>
                            <button 
                                disabled={isLoading}
                                className={(isLoading ? "bg-slate-100 text-gray-900" : "") + " max-w-sm w-full py-2 rounded-md bg-emerald-400 text-white font-semibold text-lg"}
                            >
                                Edit user
                            </button>
                        </div>
                    </form>

                    <div className="max-w-xs w-full space-y-16">
                        <div>
                            <button
                                onClick={() => setWarning(true)}
                                className="max-w-sm w-full py-2 rounded-md bg-black text-white font-semibold text-lg"
                            >
                                Delete user
                            </button>
                        </div>

                        {
                            warning &&
                            <form
                                onSubmit={deleteUser} 
                                className="space-y-6"
                            >
                                <div>
                                    <p className="font-medium">
                                        Are you sure you want to delete this user?
                                    </p>
                                </div>
                                <div>
                                <button
                                    disabled={isLoading}
                                    className={(isLoading ? "bg-slate-100 text-gray-900" : "") + " max-w-sm w-full py-2 rounded-md bg-red-800 text-white font-semibold text-lg"}
                                >
                                    Delete
                                </button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
}


export default EditUser;
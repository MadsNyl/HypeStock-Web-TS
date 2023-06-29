import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Profile from "../../icons/Profile";
import Snackbar from "../../components/Snackbar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DashboardPage from "../../components/wrapper/DashboardPage";


const ProfilePage: React.FC = () => {

    const { auth } = useAuth();
    const axios = useAxiosPrivate();

    const [username, setUsername] = useState<string>(auth?.username);
    const [password, setPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [_isLoading, setLoading] = useState<boolean>(false);
    const [disabledSave, setDisabledSave] = useState<boolean>(true);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(
                "/auth/update",
                JSON.stringify({
                    password: password,
                    username: username,
                    oldPassword: oldPassword
                })
            );

            setShowSnackbar(true);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <Snackbar 
                success={true}
                message="Password is updated"
                showBar={showSnackbar}
                setShowBar={setShowSnackbar}
            />

            <DashboardPage>
                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        My Profile
                    </h1>

                    <div>
                        
                    </div>
                </div>

                <div className="max-w-xl w-full mx-auto bg-white rounded-md border border-slate-200 shadow-sm px-12 py-6">
                    <div className="flex justify-center pb-12">
                        <Profile style="w-24 h-24" />
                    </div>

                    <form
                        onSubmit={update}
                    >
                        <div className="pb-6">
                            <div>
                                <h1 className="text-xl font-semibold pb-4">
                                    Username
                                </h1>
                            </div>
                            <div>
                                <input
                                    className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full" 
                                    type="email"
                                    required 
                                    disabled
                                    onChange={e => {
                                        setUsername(e.target.value);
                                        setDisabledSave(false);
                                    }}
                                    value={username}
                                />
                            </div>
                        </div>

                        <div className="pb-6">
                            <div>
                                <h1 className="text-xl font-semibold pb-4">
                                    Old Password
                                </h1>
                            </div>
                            <div>
                                <input
                                    className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full" 
                                    type="password"
                                    required 
                                    onChange={e => {
                                        setOldPassword(e.target.value);
                                        setDisabledSave(false)
                                    }}
                                    value={oldPassword}
                                />
                            </div>
                        </div>

                        <div className="pb-6">
                            <div>
                                <h1 className="text-xl font-semibold pb-4">
                                    New Password
                                </h1>
                            </div>
                            <div>
                                <input
                                    className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full" 
                                    type="password"
                                    required 
                                    onChange={e => {
                                        setPassword(e.target.value);
                                        setDisabledSave(false)
                                    }}
                                    value={password}
                                />
                            </div>
                        </div>


                        <div>
                            <button 
                                disabled={disabledSave}
                                className={(disabledSave ? "bg-slate-300 text-slate-900" : "") + " px-12 py-2 rounded-md bg-emerald-500 text-white font-semibold duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"}
                            >
                                <p>
                                    Save
                                </p>
                            </button>
                        </div>
                    </form>
                </div>
            </DashboardPage>
        </>
    );
}

export default ProfilePage;
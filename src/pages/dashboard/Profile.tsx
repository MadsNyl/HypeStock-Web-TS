import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Profile from "../../icons/Profile";
import Snackbar from "../../components/Snackbar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DashboardPage from "../../components/wrapper/DashboardPage";
import Background from "../../components/wrapper/Background";
import User, { defaultUser } from "../../types/User";
import Role from "../../enums/Role";
import Button from "../../components/form/Button";
import Pencil from "../../icons/Pencil";
import TextInput from "../../components/form/TextInput";


const userRole = (role: number) => {
    if (role === Role.Admin)  {
        return "Admin";
    }

    if (role === Role.Editor) {
        return "Editor";
    }

    if (role === Role.User) {
        return "User";
    }
}

const ProfilePage: React.FC = () => {

    const { auth } = useAuth();
    const axios = useAxiosPrivate();

    const [user, setUser] = useState<User>(defaultUser);
    const [editInfo, setEditInfo] = useState<boolean>(false);
    const [editPassword, setEditPassword] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>(auth?.username);
    const [password, setPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [_isLoading, setLoading] = useState<boolean>(false);
    const [disabledSave, setDisabledSave] = useState<boolean>(true);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const getUser = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/user/get?username=${auth?.username}`);
            const user = response?.data?.user;

            if (user.length) {
                setUser(user[0]);
                setUsername(user[0].username);
                setFirstName(user[0].first_name);
                setLastName(user[0].last_name);
            }    
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();        
    }, []);

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(
                "/auth/update",
                JSON.stringify({
                    oldUsername: auth?.username,
                    username: username,
                    firstName: firstName,
                    lastName: lastName
                })
            );
            
            setShowSnackbar(true);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(
                "/auth/password",
                JSON.stringify({
                    username: username,
                    oldPassword: oldPassword,
                    newPassword: password
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
                        My Account
                    </h1>

                    <div>
                        
                    </div>
                </div>

                <Background>
                    <div className="space-y-6">
                        <div className="rounded-md border border-gray-200 px-6 py-4 flex items-center space-x-6">
                            <Profile style="w-24 h-24" />
                            <div className="space-y-2">
                                <h1 className="text-xl font-semibold">
                                    { user.first_name } { user.last_name }
                                </h1>
                                <p className="text-gray-500">
                                    { user.role && userRole(user.role) }
                                </p>
                            </div>
                        </div>

                        <div 
                            className="rounded-md border border-gray-200 px-6 py-4"
                        >
                            <div className="flex items-center justify-between pb-8">
                                <h1 className="text-xl font-semibold"> 
                                    Personal Information
                                </h1>

                                <div className="w-26">
                                    <Button 
                                        title="Edit"
                                        type="basic"
                                        icon={<Pencil style="w-4 h-4 ml-2" />}
                                        onClick={() => setEditInfo(!editInfo)}
                                    />
                                </div>
                            </div>

                            <form 
                                onSubmit={update} 
                                className="space-y-6"
                            >
                                <div className="max-w-md w-full flex items-center justify-between space-x-12">
                                    <div>
                                        <h1 className="text-gray-500 font-medium pb-1">
                                            First Name
                                        </h1>
                                        {
                                            editInfo
                                                ? <TextInput 
                                                    type="text"
                                                    value={firstName}
                                                    onChange={e => setFirstName(e.target.value)}
                                                />
                                                : <h1 className="text-lg font-semibold">
                                                    { firstName }
                                                </h1>
                                        }  
                                    </div>

                                    <div>
                                        <h1 className="text-gray-500 font-medium pb-1">
                                            Last Name
                                        </h1>
                                        {
                                            editInfo
                                                ? <TextInput 
                                                    type="text"
                                                    value={lastName}
                                                    onChange={e => setLastName(e.target.value)}
                                                />
                                                : <h1 className="text-lg font-semibold">
                                                    { lastName }
                                                </h1>
                                        }
                                    </div>
                                </div>

                                <div className="max-w-md w-full flex items-center justify-between space-x-12">
                                    <div>
                                        <h1 className="text-gray-500 font-medium pb-1">
                                            Email
                                        </h1>
                                        {
                                            editInfo
                                                ? <TextInput 
                                                    type="text"
                                                    value={username}
                                                    onChange={e => setUsername(e.target.value)}
                                                />
                                                : <h1 className="text-lg font-semibold">
                                                    { username }
                                                </h1>
                                        }
                                    </div>
                                </div>

                                {
                                    editInfo &&
                                    <div
                                        className="w-32"
                                    >
                                        <Button 
                                            type="basic"
                                            title="Save"
                                        />
                                    </div>
                                }
                            </form>
                        </div>

                        <div 
                            className="rounded-md border border-gray-200 px-6 py-4"
                            >
                            <div className="flex items-center justify-between pb-8">
                                <h1 className="text-xl font-semibold"> 
                                    Password
                                </h1>

                                <div className="w-26">
                                    <Button 
                                        title="Edit"
                                        type="basic"
                                        icon={<Pencil style="w-4 h-4 ml-2" />}
                                        onClick={() => setEditPassword(!editPassword)}
                                        />
                                </div>
                            </div>

                            <form 
                                onSubmit={updatePassword}
                                className="space-y-6"
                            >
                                <div className="max-w-md w-full flex items-center justify-between space-x-12">
                                    <div>
                                        <h1 className="text-gray-500 font-medium pb-1">
                                            { editPassword ? "Old Password" : "Password" }
                                        </h1>
                                        {
                                            editPassword
                                                ? <TextInput 
                                                    required={true}
                                                    type="password"
                                                    value={oldPassword}
                                                    onChange={e => setOldPassword(e.target.value)}
                                                />
                                                : <h1 className="text-lg font-semibold">
                                                    ************
                                                </h1>
                                        }
                                    </div>

                                    {   
                                        editPassword &&
                                        <div>
                                            <h1 className="text-gray-500 font-medium pb-1">
                                                New Password
                                            </h1>
                                            <TextInput 
                                                required={true}
                                                type="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    }
                                </div>

                                {
                                    editPassword &&
                                    <div 
                                        className="w-32"
                                    >
                                        <Button 
                                            type="basic"
                                            title="Save"
                                        />
                                    </div>
                                }
                            </form>
                        </div>

                        <form
                            className="w-48"
                        >
                            <Button
                                type="basic"
                                title="Delete account"
                            />
                        </form>
                    </div>
                </Background>
            </DashboardPage>
        </>
    );
}

export default ProfilePage;
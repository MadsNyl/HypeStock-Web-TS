import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { NavLink } from "react-router-dom";
import TextInput from "../components/form/TextInput";
import CheckBox from "../components/form/CheckBox";
import Button from "../components/form/Button";


const Login: React.FC = () => {
    const { auth, setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (auth.username) {
            navigate("/dashboard/profile");
        }
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    useEffect(() => {
        localStorage.setItem("persist", persist.toString());
    }, [persist])

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "/auth/login",
                JSON.stringify({ username, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            
            const accessToken = response?.data?.accessToken;
            const role = response?.data?.role;
            
            setAuth({
                username,
                accessToken,
                role
            });

            setUsername("");
            setPassword("");
            
            from === "/"
                ? navigate("/dashboard/profile")
                : navigate(from, { replace: true });
                
        } catch (error) {
            if (error instanceof AxiosError) {
                if (!error?.response) {
                    setErrMsg("No server response.");
                } else {
                    setErrMsg(error.response.data);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    return (
        <div className="p-4 flex min-h-screen h-full">

            <div className="flex w-full space-x-12">
                <div className="max-w-md w-full rounded-lg h-full bg-gray-950 shadow-sm px-12 py-6">
                    <div className="pb-32">
                        <NavLink
                            className="text-emerald-500 text-xl font-bold"
                            to={"/"}
                        >
                            HypeStock
                        </NavLink>
                    </div>

                    <div className="flex justify-center text-white">
                        <div className="space-y-6">
                            <h1 className="font-bold text-6xl">
                                Welcome back!
                            </h1>
                            <p>
                                Sign in and continue your work with analytics.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl w-full px-12 py-20">
                    <div>
                        <div className="space-y-4 pb-20">
                            <h1 className="font-bold text-3xl">
                                Login
                            </h1>
                            <p className="">
                                Don't have an account? <NavLink to={"/register"} className="text-emerald-500 font-semibold" >Register</NavLink>
                            </p>
                        </div>

                        <form
                            className="w-full pb-8 font-semibold"
                            onSubmit={handleLogin}
                        >
                            <div className="pb-8">
                                <div>
                                    <h1 className="text-xl font-semibold pb-4">
                                        Username
                                    </h1>
                                </div>
                                <TextInput 
                                    type="email"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="pb-4">
                                <div>
                                    <h1 className="text-xl font-semibold pb-4">
                                        Password
                                    </h1>
                                </div>
                                <TextInput 
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="flex items-center space-x-2 pb-12">
                                <CheckBox 
                                    onChange={togglePersist}
                                    checked={persist}
                                />
                                <p>
                                    Remember me?
                                </p>
                            </div>

                            <div className="w-64">
                                <Button
                                    title="Login"
                                    type="basic"
                                    disabled={isLoading}
                                />
                            </div>
                        </form>

                        <div>
                            <h1 className="text-red-800">
                                {
                                    errMsg.length
                                        ? errMsg
                                        : ""
                                }
                            </h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;
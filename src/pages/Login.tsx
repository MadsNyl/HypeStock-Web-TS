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
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

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
                <div className="max-w-md w-full rounded-lg h-full bg-emerald-400 shadow-sm px-12 py-6">
                    <div className="pb-32">
                        <NavLink
                            className="text-white text-xl font-bold"
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
                                Don't have an account? <NavLink to={"/"} className="text-emerald-500 font-semibold" >Register</NavLink>
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

            {/* <div className="md:max-w-2xl w-full mx-6 md:mx-0 bg-white border border-gray-200 rounded-md shadow-sm px-12 py-6">
                <form
                    className=""
                    onSubmit={handleLogin}
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
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                    </div>

                    <div className="pb-6">
                        <div>
                            <h1 className="text-xl font-semibold pb-4">
                                Password
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

                    <div className="pb-4 text-red-800">
                        {
                            errMsg.length
                                ? errMsg
                                : ""
                        }
                    </div>

                    <div className="flex items-center space-x-2 pb-8">
                        <input 
                            type="checkbox" 
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <p>
                            Remember me?
                        </p>
                    </div>

                    <div>
                        <button 
                            disabled={isLoading}
                            className={(isLoading ? "bg-slate-300 text-gray-900" : "") + " max-w-sm w-full py-2 rounded-md bg-emerald-400 text-white font-semibold text-lg duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"}
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div> */}
        </div>
    );
}

export default Login;
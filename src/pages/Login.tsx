import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { AxiosError } from "axios";


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
        <div className="flex justify-center mt-24">
            <div className="md:max-w-2xl w-full mx-6 md:mx-0 bg-white border border-gray-200 rounded-md shadow-sm px-12 py-6">
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
            </div>
        </div>
    );
}

export default Login;
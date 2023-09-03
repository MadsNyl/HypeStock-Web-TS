import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { NavLink } from "react-router-dom";
import TextInput from "../components/form/TextInput";
import CheckBox from "../components/form/CheckBox";
import Button from "../components/form/Button";


const Register: React.FC = () => {
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
                                Welcome!
                            </h1>
                            <p>
                                Sign up and explore all the features HypeStock has to offer.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl w-full px-12 py-20">
                    <div>
                        <div className="space-y-4 pb-20">
                            <h1 className="font-bold text-3xl">
                                Register
                            </h1>
                            <p className="">
                                Already have an account? <NavLink to={"/login"} className="text-emerald-500 font-semibold">Login</NavLink>
                            </p>
                        </div>

                        <div className="space-y-12">
                            <h1 className="text-3xl font-bold">
                                It is not possible to create an account yet, unfortunately.
                            </h1>

                            <h1 className="font-semibold text-xl">
                                Please check in later for updates.
                            </h1>
                        </div>

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

export default Register;
import { useContext } from "react"
import AuthContext from "../context/AuthProvider"
import ContextAuth from "../types/ContextAuth";


const useAuth = (): ContextAuth => {
    return useContext(AuthContext)
}

export default useAuth;
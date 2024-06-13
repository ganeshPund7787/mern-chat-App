import { useState } from "react"
import { toast } from "react-hot-toast"
import { useAuthContex } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setloading] = useState(false);
    const { setAuthUser } = useAuthContex()

    const logout = async () => {
        try {
            setloading(true);
            const res = await fetch(`/api/auth/logout`);
            const data = await res.json();

            if (data.success === false) {
                throw new Error(data.message);
            }

            toast.success(data.message);
            localStorage.removeItem('chat-user');
            setAuthUser(null);
        } catch (error) {
            setloading(false)
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    }
    return { loading, logout };
}

export default useLogout
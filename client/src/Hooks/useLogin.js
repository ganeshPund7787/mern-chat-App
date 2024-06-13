import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContex } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setloading] = useState(false);
    const { setAuthUser } = useAuthContex();

    const login = async (username, password) => {
        console.log(username, password)
        try {
            const success = handleInputError(username, password);
            if (!success) return;

            setloading(true);
            const res = await fetch(`/api/auth/sign-in`, {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    username, password
                })
            });
            const data = await res.json();

            if (data.success === false) {
                throw new Error(data.message);
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading(false)
        }
    }
    return { loading, login }
}

export default useLogin


function handleInputError(username, password) {

    if (!username.trim() || !password.trim() === '') {
        toast.error("Please fill all the field");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be atleast 6 character");
        return false;
    }

    return true;
}

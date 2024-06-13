import React, { useState } from 'react'
import { toast } from "react-hot-toast"
import { useAuthContex } from '../context/AuthContext.jsx';

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContex();

    const SignUp = async (formData) => {
        try {
            const success = handleInputError(formData);
            if (!success) return;

            setLoading(true);
            const { confirmPassword, ...finalFormData } = formData;

            const res = await fetch(`/api/auth/sign-up`, {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(finalFormData)
            });

            const data = await res.json();

            if (data.success === false) {
                throw new Error(data.message);
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, SignUp };
}

function handleInputError(formData) {
    const { fullname, username, password, confirmPassword, gender } = formData;

    if (!fullname.trim() || !username.trim() || !password.trim() || !confirmPassword.trim() || !gender.trim() === '') {
        toast.error("Please fill all the field");
        return false;
    }
    console.log(password, "dfgsdfg", confirmPassword)
    if (password !== confirmPassword) {
        toast.error("Password do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be atleast 6 character");
        return false;
    }

    return true;
}

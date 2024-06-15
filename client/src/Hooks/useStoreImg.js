import React from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useStoreImg = () => {
    const { messages, setMessages, selectedConversation } = useConversation()

    const storeImgBackend = async (img) => {
        try {
            const res = await fetch(`/api/messages/sendImg/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ img })
            });

            const data = await res.json();

            setMessages([...messages, data])
            if (data.success === false) throw new Error(data.message);
        } catch (error) {
            toast.error(error.message)
        }
    }
    return { storeImgBackend }
}

export default useStoreImg
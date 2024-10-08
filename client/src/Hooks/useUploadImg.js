import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useState } from "react"
import { app } from "../firebase.js"



const useUploadImg = () => {
    const [filePer, setFilePer] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    const uploadImage = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePer(Math.round(progress))
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
                    setImageUrl(downLoadUrl);
                    setFilePer(0)
                })

            }
        )

        return
    }

    return { uploadImage, imageUrl, setImageUrl, filePer }
}

export default useUploadImg
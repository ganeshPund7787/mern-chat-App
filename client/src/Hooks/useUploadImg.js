import { getBytes, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useState } from "react"
import { app } from "../firebase.js"
import toast from "react-hot-toast";


const useUploadImg = () => {
    const [filePer, setFilePer] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    console.log(filePer)
    console.log(imageUrl)

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
                console.log("progress : ", progress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
                    setImageUrl(downLoadUrl);
                })

            }
        )

        return
    }

    return { uploadImage, imageUrl, setImageUrl }
}

export default useUploadImg
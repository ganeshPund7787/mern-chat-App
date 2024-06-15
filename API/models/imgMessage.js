import mongoose, { model } from "mongoose";

const imgMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const ImgMessage = new model("ImgMessage", imgMessageSchema)
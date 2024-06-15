import mongoose, { model } from "mongoose";

const imgMessageSchema = new mongoose.Schema({
    img: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const ImgMessage = new model("ImgMessage", imgMessageSchema)
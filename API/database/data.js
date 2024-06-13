import mongoose from "mongoose";

export const mongoConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, { dbName: "chatApp" })
        .then(() => console.log(`DB connected`))
        .catch((error) => console.log(`Error while db connection ${error}`))
}
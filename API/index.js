import express from "express";
import dotenv from "dotenv"
import path from "path"

import authRoutes from "./routes/auth.router.js"
import messageRoutes from "./routes/message.router.js"
import usersRoutes from "./routes/user.router.js"

import { mongoConnection } from "./database/data.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve()

dotenv.config();
mongoConnection();


app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', usersRoutes)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.use(errorMiddleware);

const port = process.env.PORT || 4999;
server.listen(port, () => {
    console.log(`The port is running on ${port}`)
});



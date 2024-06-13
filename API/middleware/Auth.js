import { errorHandler } from "../utils/error.handler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"

export const Authenticated = async (req, res, next) => {
    try {
        const { cookie } = req.cookies;

        if (!cookie) return next(errorHandler(402, "You should login first"))

        jwt.verify(cookie, process.env.JWT_SECREATE_KEY, async (err, user) => {
            if (err) return next(errorHandler(400, "Token is not valid"))
            req.user = await User.findById(user._id).select("-password");
            next();
        })
    } catch (error) {
        next(error);
        console.log(`Error while auth function : ${error}`);
    }
} 
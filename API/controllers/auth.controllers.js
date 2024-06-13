import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/error.handler.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next) => {
    try {
        const { fullname, username, password, gender } = req.body;

        const isUserExist = await User.findOne({ username });

        if (isUserExist) return next(errorHandler(400, "User already exist"));

        const hashPassword = bcryptjs.hashSync(password, 10);

        // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const boyProfilePic = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s`;
        const girlProfilePic = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEJ-8GyKlZr5ZmEfRMmt5nR4tH_aP-crbgg&s`;

        const newUser = await User.create({
            fullname,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });
        const { password: xyz, ...userData } = newUser._doc;
        const cookie = jwt.sign({ _id: newUser._id }, process.env.JWT_SECREATE_KEY);

        res.cookie("cookie", cookie, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).status(201).json(userData);
    } catch (error) {
        next(error);
    }
}
export const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const isUsernameExist = await User.findOne({ username });

        if (!isUsernameExist) {
            return next(errorHandler(401, "username is not exist"));
        }

        const validPassword = bcryptjs.compareSync(password, isUsernameExist.password);

        if (!validPassword) {
            return next(errorHandler(401, "Invalid Password"))
        }

        const { password: xyz, ...userData } = isUsernameExist._doc;

        const cookie = jwt.sign({ _id: isUsernameExist._id }, process.env.JWT_SECREATE_KEY);
        res.cookie("cookie", cookie, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000
        }).status(200).json(userData);
    } catch (error) {
        next(error);
    }
}
export const logout = async (req, res, next) => {
    try {
        res.clearCookie("cookie").json({
            success: true,
            message: "User Logout Successfully"
        })
    } catch (error) {
        next(error)
    }
}
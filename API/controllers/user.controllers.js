import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/error.handler.js";

export const getUserForSidebar = async (req, res, next) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filterUsers);
    } catch (error) {
        console.log(`Error while get Side Bar usrs : ${error.message}`)
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    if (req.params.id !== req.user.id) {
        return next(errorHandler(400, "You can update only your account"))
    }
    try {
        const { fullname, username, profilePic } = req.body;
        const { id } = req.params;
        const isUserExist = await User.findOne({ username });

        if (isUserExist) {
            return next(errorHandler(403, "Username is already exist"))
        }

        const updateUser = await User.findByIdAndUpdate(id, {
            $set: {
                fullname: fullname,
                username: username,
                profilePic: profilePic
            }
        }, { new: true })
        // console.log(updateUser)
    } catch (error) {
        next(error)
    }
}
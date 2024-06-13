import { User } from "../models/user.models.js";

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
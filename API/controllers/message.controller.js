import { Conversation } from "../models/conversation.model.js"
import { ImgMessage } from "../models/imgMessage.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            partcipants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                partcipants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId, receiverId, message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // this will run in parallel
        await Promise.all([await newMessage.save(), await conversation.save()]);

        //SOCKET IO FUNCTIONALITY WILL GO HERE

        const receiverSocketId = getReceiverSocketId(receiverId)

        if (receiverSocketId) {
            // io.to(<socket._id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(`Error While send Message: ${error}`)
        next(error);
    }
}

export const sendImgMessage = async (req, res, next) => {
    try {
        const { img } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            partcipants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                partcipants: [senderId, receiverId]
            });
        }

        const newImgMessage = new ImgMessage({
            senderId, receiverId, img
        })

        if (newImgMessage) {
            conversation.messages.push(newImgMessage._id);
        }

        await Promise.all([await newImgMessage.save(), await conversation.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId)

        if (receiverSocketId) {
            // io.to(<socket._id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newImgMessage);
        }

        res.status(201).json(newImgMessage);
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            partcipants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages
        console.log(messages)
        res.status(200).json(messages);
    } catch (error) {
        next(error)
    }
}
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true }, // Clerk user id
    receiverId: { type: String, required: true }, // Clerk user id
    content: { type: String, required: true }, // message content
}, {timestamps: true} // for createdAt or updatedAt
)

export const Message = mongoose.model("Message", messageSchema);
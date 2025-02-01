import Message from "../models/Message";
import User from "../models/User"

export class messageService {
    static createMessage = async (data: any) => {
        try {
            const userExist = await User.findById(data.userId);
            if (!userExist) {
                return {
                    status: 404,
                    message: "User not found"
                }
            }

            const receiverExist = await User.findById(data.receiverId);
            if (!receiverExist) {
                return {
                    status: 404,
                    message: "Receiver not found"
                }
            }

            const newMessage = await Message.create({
                sender: data.userId,
                receiver: data.receiverId,
                content: data.content,
                isRead: false,
            })
            return {
                status: 200,
                message: "Message created",
                newMessage
            }
        } catch (error: any) {
            return { status: 500, message: "Error creating message" }
            
        }
    }

    static updateMessage = async (data: any) => {
        try {
            const existMessage = await Message.findById(data.messageId);
            if (!existMessage) {
                return {
                    status: 404,
                    message: "Message not found"
                }
            }

            const creator = await User.findById(data.userId);
            if (!creator) {
                return {
                    status: 404,
                    message: "User not found"
                }
            }

            if (existMessage.sender.toString() !== creator.id.toString()) {
                return {
                    status: 403,
                    message: "Unauthorized"
                }
            }

            await Message.findByIdAndUpdate(data.messageId, { content: data.content }, { new: true });
            return {
                status: 200,
                message: "Message updated"
            }
        } catch (error: any) {
            return { status: 404, message: "Error updating" }
        }
    }

    static deleteMessage = async (data: any) => {
        try {
            const creator = await User.findById(data.userId);
            if (!creator) {
                return {
                    status: 404,
                    message: "User not found"
                }
            }

            const existMessage = await Message.findById(data.messageId);
            if (!existMessage) {
                return {
                    status: 404,
                    message: "Message not found"
                }
            }

            if (existMessage.sender.toString() !== creator.id.toString()) {
                return {
                    status: 404,
                    message: "Unauthorized"
                }
            }

            await Message.findByIdAndDelete(data.messageId);
            return {
                status: 200,
                message: "Message deleted"
            };
        } catch (error: any) {
            return { status: 404, message: "Error deleting" }
        }
    }

    static readMessage = async (userId: any, messageId: any) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return {
                    status: 404,
                    message: "User not found"
                }
            }

            const existingMessage = await Message.findById(messageId);
            if (!existingMessage) {
                return {
                    status: 404,
                    message: "Message may be deleted "
                }
            }
         await Message.findOneAndUpdate({_id:messageId,receiver:userId}, { read: true });
            return {
                status: 200,
                message: "Message read",
            }
        } catch (error: any) {
            return { status: 404, message: "Error reading message" }
        }
    }
    static getAllMessage =async(userId:string) =>{
        try {
            const messages = await Message.find({
              $or: [
                {
                  sender: userId,
                  receiver: userId,
                },
              ],
              
            }).populate("receiver");
            return ({status:200,messages})
        } catch (error:any) {
           return ({status:500, error:error.message}) 
        }
        
    }
}
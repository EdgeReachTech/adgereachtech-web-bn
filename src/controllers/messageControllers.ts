import { Request, Response } from "express";
import { messageService } from "../services/messageServices";

export class messageController {
    static createMessage = async (req: Request, res: Response) => {
        try {
            const data = await req.body;
            const receiverId = req.params.receiverId;
            const userId = await (req as any).user.id;
            data["userId"] = userId;
            data["receiverId"] = receiverId;

            const message = await messageService.createMessage(data);
            if (!message) {
                res.status(404).json({ message: "Error creating message" });
            }
            res.status(message?.status as number).json({ message: message?.message });
        } catch (error: any) {
            return res.status(500).json({ error: `Error ${error.message} happened` });
        }
    }

    static updateMessage = async (req: Request, res: Response) => {
        try {
            const data = await req.body;
            const userId = await (req as any).user.id;
            const messageId = req.params.messageId;
            data["userId"] = userId;
            data["messageId"] = messageId;

            const message = await messageService.updateMessage(data);
            if (!message) {
                res.status(404).json({ message: "Error creating message" });
            }

            res.status(message.status).json({ message: message.message });
        } catch (error: any) {
            return res.status(500).json({ error: `Error ${error.message} happened` });
        }
    }

    static deleteMessage = async (req: Request, res: Response) => {
        try {
            const data = await req.body;
            const userId = await (req as any).user.id;
            const messageId = req.params.messageId;
            data["userId"] = userId;
            data["messageId"] = messageId;

            const deletedMessage = await messageService.deleteMessage(data);

            res.status(deletedMessage.status).json({ message: deletedMessage.message });
        } catch (error: any) {
            return res.status(500).json({ error: `Error ${error.message} happened` });
        }
    }

    static readMessage = async (req: Request, res: Response) => {
        try {
            const userId = await (req as any).user.id;
            const messageId = req.params.messageId;

            const message = await messageService.readMessage(userId, messageId);
            res.status(message.status).json({ message: message });
        } catch (error: any) {
            return res.status(500).json({ error: `Error ${error.message} happened` });
        }
    }
    static getAllMessage = async (req:any, res:Response)=>{
       try {
         const userId = await req.user.id;
         const message = await messageService.getAllMessage(userId);
         res.status(message.status).json(message.messages)
       } catch (error:any) {
        res.status(500).json('failed to load message')
       }
    }}
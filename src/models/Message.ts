import { Document, model, Schema, Types } from "mongoose";

interface interMessage extends Document {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    content: string;
    timeStamp: Date;
    read: boolean;
    delivered:boolean
}

const messageSchema = new Schema<interMessage>({
    sender: { type: Schema.Types.ObjectId, reference: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, reference: "User", required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false, required: true },
    delivered: { type: Boolean, default: false, required: true }
},{timestamps:true});

const Message = model<interMessage>("Message", messageSchema);
export default Message;
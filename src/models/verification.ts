import { Document, model, Schema } from 'mongoose';

interface VerificationToken extends Document {
    email: string;
    token: string;
    expiresAt: Date;
}

const verificationTokenSchema = new Schema<VerificationToken>({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
}, {
    timestamps: true
});

const VerificationToken = model<VerificationToken>('VerificationToken', verificationTokenSchema);
export default VerificationToken;

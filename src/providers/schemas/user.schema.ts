import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from 'src/interfaces/enums';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true,
    })
    username: string;

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true,
    })
    email: string;

    @Prop({ type: String, required: true, index: true })
    keycloakId: string;

    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: false })
    lastName: string;

    @Prop({ type: Number })
    createdAt: number;

    @Prop({ type: Number })
    updatedAt: number;

    @Prop({
        type: String,
        enum: [UserType.BASIC, UserType.AUTHOR],
    })
    userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModelName = 'User';

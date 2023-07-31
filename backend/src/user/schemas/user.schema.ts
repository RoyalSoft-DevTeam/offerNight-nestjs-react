// import * as mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   permission: Boolean,
//   date_added: String
// })

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({required:true})
    name: string;

    @Prop({required:true, unique:true})
    email: string;

    @Prop({required:true})
    password: string

    @Prop({required:false, default: Date.now() })
    createdDate: Date
}

export const UserSchema = SchemaFactory.createForClass(User)

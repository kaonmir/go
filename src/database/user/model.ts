import mongoose, { Schema, model } from "mongoose";
import { IUserDocument, IUserModel } from "./types";
import * as statics from "./statics";
import * as methods from "./methods";

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    username: String,
    password: String,
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.statics = { ...UserSchema.statics, ...statics };
UserSchema.methods = { ...UserSchema.methods, ...methods };

export default model<IUserDocument, IUserModel>("go", UserSchema);

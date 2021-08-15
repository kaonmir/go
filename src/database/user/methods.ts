import { Document } from "mongoose";
import { IUserDocument, IUserType } from "./types";

export function verify(this: IUserDocument, password: String): Boolean {
  return this.password === password;
}

export async function assignAdmin(this: IUserDocument): Promise<IUserDocument> {
  this.admin = true;
  return this.save();
}

import { Document } from "mongoose";
import { IUserDocument, IUserType } from "./types";

export function verify(this: IUserDocument, password: String): boolean {
  return this.password === password;
}

export async function assignAdmin(this: IUserDocument): Promise<boolean> {
  this.admin = true;
  return this.admin;
}

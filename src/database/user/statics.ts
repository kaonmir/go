import { IUserDocument, IUserModel } from "./types";
export async function findOneByUsername(this: IUserModel, username: String) {
  return this.findOne({ username });
}

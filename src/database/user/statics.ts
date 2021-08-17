import { IUserDocument, IUserModel } from "./types";

export async function createUser(
  this: IUserModel,
  username: String,
  password: String
): Promise<IUserDocument> {
  const user = new this({ username, password });
  return user.save();
}

export async function findOneByUsername(this: IUserModel, username: String) {
  return this.findOne({ username });
}

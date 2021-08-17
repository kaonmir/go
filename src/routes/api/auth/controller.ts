import UserModel from "../../../database/user/model";
import { IUserType } from "../../../database/user/types";

export async function login(username: string, password: string) {
  const user = await UserModel.findOneByUsername(username);
  if (!user) throw new Error("Username non-exists");

  user.verify(password);
  return user.toJSON() as IUserType;
}

export async function register(username: string, password: string) {
  const user = await UserModel.findOneByUsername(username);
  const newUser = user ?? (await UserModel.createUser(username, password));

  if (user === newUser) throw new Error("username exists");
  if (newUser.username === "admin") await newUser.assignAdmin();

  newUser.save();
  return newUser.toJSON() as IUserType;
}

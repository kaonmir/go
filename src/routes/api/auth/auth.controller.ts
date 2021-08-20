import UserModel from "../../../database/user/model";
import jwt from "jsonwebtoken";

export async function register(username: string, password: string) {
  const user = await UserModel.findOneByUsername(username);
  const newUser = user ?? (await UserModel.createUser(username, password));

  if (user === newUser) throw new Error("username exists");
  if (newUser.username === "admin") await newUser.assignAdmin();

  newUser.save();
  return {
    message: "registered successfully",
    admin: newUser.admin,
  };
}

export async function login(
  username: string,
  password: string,
  secret: string
) {
  const user = await UserModel.findOneByUsername(username);
  if (!user) throw new Error("Username non-exists");
  if (!user.verify(password)) throw new Error("Login failed");

  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      admin: user.admin,
    },
    secret,
    {
      expiresIn: "7d",
      issuer: "kaonmir.xyz",
      subject: "userInfo",
    }
  );

  return {
    message: "logged in successfully",
    token,
  };
}

export async function check(token: string, secret: string) {
  jwt.verify(token, secret);
  return {
    success: true,
    info: token,
  };
}

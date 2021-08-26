import { BodyParams, Req } from "@tsed/common";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { UserInfoModel } from "../models/mongo/UserInfoModel";
import { UserRepository } from "../repositories/UserRepository";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
  },
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  constructor(private UserRepository: UserRepository) {}

  async $onVerify(@Req() request: Req, @BodyParams() userInfo: UserInfoModel) {
    const { email, password } = userInfo;

    const user = await this.UserRepository.findOne({ email });

    if (!user) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    // if (!user.verifyPassword(password)) {
    if (user.password !== password) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    return user;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}

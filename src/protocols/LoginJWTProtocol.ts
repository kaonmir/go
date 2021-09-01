import { BodyParams, HeaderParams, Inject, Req } from "@tsed/common";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { Unauthorized } from "@tsed/exceptions";
import jwt from "jsonwebtoken";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { UserInfoModel, UserInfoToken } from "src/models/mongo/UserInfoModel";
import { UserRepository } from "src/repositories/UserRepository";
import * as Config from "../config/config";

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.JWT_SECRET,
  },
})
export class JwtProtocol implements OnVerify {
  async $onVerify(@Req() req: Req, @Arg(0) userInfo: UserInfoToken) {
    // If jwt is parsable, it means all elements of users are validated.
    // So we don't have to keep checking with using repository.

    const date = new Date();
    const expiredDate = new Date(userInfo.expiredDate);

    if (date < expiredDate) return userInfo;
    else throw new Unauthorized("The token is expired!!");
  }
}

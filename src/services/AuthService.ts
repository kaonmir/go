import { Service } from "@tsed/di";
import { BodyParams, HeaderParams, Inject, Req } from "@tsed/common";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { NotFound } from "@tsed/exceptions";
import jwt from "jsonwebtoken";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { UserInfoModel, UserInfoToken } from "src/models/mongo/UserInfoModel";
import { UserRepository } from "src/repositories/UserRepository";
import * as Config from "../config/config";

@Service()
export class AuthService {
  @Inject() private userRepository: UserRepository;

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ email, password });
    if (!user) throw new NotFound("No user exists");

    const { id } = user;
    const currentDate = new Date();
    const expiredDate = new Date(
      currentDate.getTime() + Config.JWT_EXPIRED_MINUTES * 60000
    );

    const userInfoToken: UserInfoToken = { email, id, expiredDate };
    const token = jwt.sign(userInfoToken, Config.JWT_SECRET);
    return token;
  }
}

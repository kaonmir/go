import {
  BodyParams,
  Controller,
  Get,
  Inject,
  Logger,
  Patch,
} from "@tsed/common";
import { Req, Post, Res } from "@tsed/common";
import { Authenticate, Authorize } from "@tsed/passport";
import { UserInfoToken } from "src/models/mongo/UserInfoModel";
import { UserRepository } from "src/repositories/UserRepository";

@Controller("/auth")
// @Scope(ProviderScope.SINGLETON)
export class AuthCtrl {
  @Inject(UserRepository) private userRepo: UserRepository;

  @Post("/login")
  @Authenticate("login")
  login(
    @Req() req: Req,
    @BodyParams("email") email: string,
    @BodyParams("password") password: string
  ) {
    return req.user;
  }

  @Get("/logined")
  logined(@Req() req: Req) {
    return {
      logined: req.user ? true : false,
    };
  }

  @Post("/register")
  register(
    @BodyParams("email") email: string,
    @BodyParams("password") password: string
  ) {
    return this.userRepo.create({ email, password });
  }

  @Get("/logout")
  @Authorize("login")
  logout(@Req() req: Req, @Res() res: Res) {
    req.logout();
    return "successfully logout";
  }

  @Patch("/update")
  @Authorize("login")
  update(@Req() req: Req, @BodyParams("password") password: string) {
    const { id, email } = req.user as UserInfoToken;
    return this.userRepo.updateById(id, { email, password });
  }
}

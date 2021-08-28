import {
  BodyParams,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Res,
} from "@tsed/common";
import { Req } from "@tsed/common";
import { Authenticate, Authorize } from "@tsed/passport";
import { UserInfoModel, UserInfoToken } from "src/models/mongo/UserInfoModel";
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

  @Post("/register")
  register(
    @BodyParams("email") email: string,
    @BodyParams("password") password: string
  ) {
    return this.userRepo.create({ email, password });
  }

  @Get("/logout")
  logout(@Req() req: Req, @Res() res: Res) {
    req.logout();
  }

  @Patch("/update")
  @Authorize("login")
  update(@Req() req: Req, @BodyParams("password") password: string) {
    const { id, email } = req.user as UserInfoToken;
    return this.userRepo.updateById(id, { email, password });
  }
}

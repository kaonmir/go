import { BodyParams, Controller, Inject, Patch } from "@tsed/common";
import { Req, Post, ProviderScope, Scope } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { Returns } from "@tsed/schema";
import { UserInfoModel, UserInfoToken } from "src/models/mongo/UserInfoModel";
import { UserRepository } from "src/repositories/UserRepository";
import { AuthService } from "src/services/AuthService";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthCtrl {
  @Inject(UserRepository) private userRepo: UserRepository;
  @Inject() private authService: AuthService;

  @Post("/login")
  @(Returns(200, String).ContentType("plain/jwt"))
  async login(
    @BodyParams("email") email: string,
    @BodyParams("password") password: string
  ): Promise<string> {
    const token = await this.authService.login(email, password);
    return token;
  }

  @Post("/register")
  @(Returns(200).ContentType("application/json"))
  register(
    @BodyParams("email") email: string,
    @BodyParams("password") password: string
  ) {
    this.userRepo.create({ email, password });
  }

  @Patch("/update")
  @Authenticate("jwt")
  @(Returns(200).ContentType("application/json"))
  update(@Req() req: Req, @BodyParams("password") password: string) {
    const { id, email } = req.user as UserInfoToken;
    this.userRepo.updateById(id, { email, password });
  }
}

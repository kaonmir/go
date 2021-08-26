import {
  AcceptMime,
  BodyParams,
  Controller,
  Get,
  Inject,
  Req,
} from "@tsed/common";
import { Patch, PathParams, Post, QueryParams } from "@tsed/common";
import { Authorize } from "@tsed/passport";
import { ContentType, Property, Required, Returns } from "@tsed/schema";
import { GoModel } from "src/models/mongo/GoModel";
import { UserInfoModel, UserInfoToken } from "src/models/mongo/UserInfoModel";
import { GoRepository } from "src/repositories/GoRepository";

@Controller("/go")
@Authorize()
export class GoController {
  @Inject(GoRepository) private goRepo: GoRepository;

  @Get("/all")
  @(Returns(200, Array).Of(GoModel))
  @(Returns(404, String).Description("No Found"))
  async getAll(@Req() req: Req): Promise<GoModel[]> {
    const user = req.user as UserInfoToken;
    const owner = user.email;
    return this.goRepo.find({ owner });
  }

  @Get("/")
  @Returns(200, GoModel)
  async get(@Req() req: Req, @QueryParams("id") id: string): Promise<GoModel> {
    const user = req.user as UserInfoToken;
    const owner = user.email;
    return this.goRepo.findOne({ _id: id, owner });
  }

  @Post("/")
  @Returns(200, GoModel)
  create(@BodyParams() @Required() go: GoModel): Promise<GoModel> {
    return this.goRepo.save(go);
  }

  @Patch("/")
  @Returns(200, GoModel)
  patch(
    @QueryParams("id") @Required() id: string,
    @BodyParams() @Required() go: GoModel
  ): Promise<GoModel> {
    return this.goRepo.updateById(id, go);
  }
}

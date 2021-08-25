import { AcceptMime, BodyParams, Controller, Get, Inject } from "@tsed/common";
import { Patch, PathParams, Post, QueryParams } from "@tsed/common";
import { ContentType, Property, Required, Returns } from "@tsed/schema";
import { GoModel } from "src/models/mongo/GoModel";
import { GoRepository } from "src/repositories/GoRepository";

@Controller("/go")
export class GoController {
  @Inject(GoRepository) private goRepo: GoRepository;

  @Get("/all")
  @(Returns(200, Array).Of(GoModel))
  @(Returns(404, String).Description("No Found"))
  async getAll(): Promise<GoModel[]> {
    return this.goRepo.findAll();
  }

  @Get("/")
  @Returns(200, GoModel)
  async get(@QueryParams("id") id: string): Promise<GoModel> {
    return this.goRepo.findById(id);
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

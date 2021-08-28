import { Context, Controller, Get } from "@tsed/common";

@Controller("/test")
export class TestController {
  @Get("/")
  get(@Context() ctx: Context) {
    const t = ctx.get("test");
    return `test: ${t}`;
  }
}

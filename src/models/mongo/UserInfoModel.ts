import { Model, ObjectID, PreHook, Schema, Unique } from "@tsed/mongoose";
import { Ignore, MaxLength, MinLength, Required } from "@tsed/schema";
import { Example, Max, Min, Property } from "@tsed/schema";

@Model({
  //   connection: "default",
  name: "userinfo",
})
export class UserInfoModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Example("sonjeff@naver.com")
  @Required()
  email: string;

  @Property()
  @Required()
  password: string;
}

export class UserInfoToken {
  @Property()
  @Unique()
  id: string;

  @Property()
  email: string;
}

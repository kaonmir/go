import { Model, ObjectID, Unique } from "@tsed/mongoose";
import { Required, Example, Property, DateTime } from "@tsed/schema";

@Model({
  //   connection: "default",
  name: "userinfo",
})
export class UserInfoModel {
  @ObjectID("id")
  _id?: string;

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

  @Property()
  @DateTime()
  expiredDate: Date;
}

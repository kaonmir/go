import { Model, ObjectID, Schema } from "@tsed/mongoose";
import { CollectionOf, Default, Example, Integer } from "@tsed/schema";
import { Max, Min, Property } from "@tsed/schema";

@Model({
  //   connection: "default",
  name: "go",
})
export class GoModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Default([])
  @Example([12, 42, 49, 110])
  @(Integer(), Min(0), Max(361))
  @CollectionOf(Number)
  logs: number[];
}

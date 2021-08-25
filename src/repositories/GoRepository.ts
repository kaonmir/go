import { Inject, Injectable } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel, ObjectID } from "@tsed/mongoose";
import { Model } from "mongoose";
import { GoModel } from "../models/mongo/GoModel";

@Injectable()
export class GoRepository {
  @Inject(GoModel) private model: MongooseModel<GoModel>;

  findAll = async () => await this.model.find({});
  find = async (query: any) => await this.model.find(query).exec();
  save = async (obj: GoModel): Promise<GoModel> => await this.model.create(obj);

  async findById(id: string): Promise<GoModel> {
    const go = await this.model.findById(id);
    if (go === null) throw new NotFound("Go game not found");
    return go;
  }

  async updateById(_id: string, props: GoModel): Promise<GoModel> {
    const go = await this.model.findOneAndUpdate(
      { _id },
      { $set: props },
      { new: true }
    );
    console.log(props);

    if (go === null) throw new NotFound("Go game not found");
    return go;
  }
}
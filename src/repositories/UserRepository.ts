import { Inject, Injectable } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel, ObjectID } from "@tsed/mongoose";
import { Model } from "mongoose";
import { UserInfoModel } from "../models/mongo/UserInfoModel";

@Injectable()
export class UserRepository {
  @Inject(UserInfoModel) private model: MongooseModel<UserInfoModel>;

  findAll = async () => await this.model.find({});
  findOne = async (query: any) => await this.model.findOne(query);
  find = async (query: any) => await this.model.find(query).exec();
  create = async (obj: UserInfoModel): Promise<UserInfoModel> =>
    await this.model.create(obj);

  async findById(id: string): Promise<UserInfoModel> {
    const go = await this.model.findById(id);
    if (go === null) throw new NotFound("Go game not found");
    return go;
  }

  async updateById(_id: string, props: UserInfoModel): Promise<UserInfoModel> {
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

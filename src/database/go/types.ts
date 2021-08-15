import { Model, Document } from "mongoose";

export interface IGoType {
  goid: Number;
  whiteid: String;
  blackid: String;
  logs: String;
}

// 모델의 메소드를 Statics model methods라 부르고 모델이 생성한 인스턴스인 도큐먼트의 메소드를 Document instance methods라 한다.

// statics
export interface IGoDocument extends IGoType, Document {}

// methods
export interface IGoModel extends Model<IGoDocument> {
  findAll: (this: IGoModel) => Promise<IGoDocument[]>;
  findByGoid: (this: IGoModel, goid: Number) => Promise<IGoDocument>;
  findByUserId: (this: IGoModel, userid: String) => Promise<IGoDocument>;
  updateByGoid: (
    this: IGoModel,
    goid: Number,
    payload: IGoType
  ) => Promise<IGoDocument>;
  deleteByGoid: (this: IGoModel, goid: Number) => Promise<IGoDocument>;
}

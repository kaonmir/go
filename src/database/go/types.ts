import { Model, Document } from "mongoose";

export interface IGoType {
  whiteid: string;
  blackid: string;
  logs: string;
}

// 모델의 메소드를 Statics model methods라 부르고 모델이 생성한 인스턴스인 도큐먼트의 메소드를 Document instance methods라 한다.

// statics
export interface IGoModel extends Model<IGoDocument> {
  findAll: (this: IGoModel) => Promise<IGoDocument[]>;
  findByGoid: (this: IGoModel, goid: string) => Promise<IGoDocument>;
  findAllByUserId: (this: IGoModel, userid: string) => Promise<IGoDocument[]>;
  updateByGoid: (
    this: IGoModel,
    goid: string,
    payload: IGoType
  ) => Promise<IGoDocument>;
  deleteByGoid: (this: IGoModel, goid: string) => Promise<boolean>;
}

// methods

export interface IGoDocument extends IGoType, Document {
  resetID: (
    this: IGoDocument,
    deleteBlackid: boolean,
    deleteWhiteid: boolean
  ) => Promise<IGoDocument>;
}

import { Model, Document } from "mongoose";

export interface IUserType {
  username: String;
  password: String;
  admin: Boolean;
}

// 모델의 메소드를 Statics model methods라 부르고 모델이 생성한 인스턴스인 도큐먼트의 메소드를 Document instance methods라 한다.

// statics
export interface IUserDocument extends IUserType, Document {
  verify: (this: IUserType, password: String) => Boolean;
  assignAdmin: (this: IUserType) => Promise<IUserDocument>;
}

// methods
export interface IUserModel extends Model<IUserDocument> {
  findOneByUsername: (
    this: IUserModel,
    username: String
  ) => Promise<IUserDocument | null>;
}

import { Model, Document } from "mongoose";

export interface IUserType {
  username: String;
  password: String;
  admin: boolean;
}

// 모델의 메소드를 Statics model methods라 부르고 모델이 생성한 인스턴스인 도큐먼트의 메소드를 Document instance methods라 한다.

// methods
export interface IUserDocument extends IUserType, Document {
  verify: (this: IUserType, password: String) => boolean;
  assignAdmin: (this: IUserType) => boolean;
}

// statics
export interface IUserModel extends Model<IUserDocument> {
  createUser: (
    this: IUserModel,
    username: String,
    password: String
  ) => Promise<IUserDocument>;

  findOneByUsername: (
    this: IUserModel,
    username: String
  ) => Promise<IUserDocument | null>;
}

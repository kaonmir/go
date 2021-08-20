import { IUserType } from "../database/user/types";

declare global {
  namespace Express {
    interface Request {
      user?: IUserType | undefined;
      sample?: string | undefined;
    }
  }
}

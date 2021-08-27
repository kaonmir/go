import { Configuration } from "@tsed/di";
import express from "express";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
// import "@tsed/mongoose";
import config, { rootDir } from "./config";
import { IndexCtrl } from "./controllers/pages/IndexController";
import { UserInfoToken } from "./models/mongo/UserInfoModel";
import passport from "passport";
import session from "express-session";

import * as Config from "./config/config";
import sessionConfig from "./config/session";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: Config.PORT,
  httpsPort: false, // CHANGE
  mount: {
    "/api": [`${rootDir}/controllers/**/*.ts`],
    "/": [IndexCtrl],
  },
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    cookieParser(Config.COOKIE_SECRET!),
    express.json(),
    express.urlencoded({ extended: true }),
    session(sessionConfig),
    passport.initialize(),
    passport.session(),
  ],
  passport: {
    userInfoModel: UserInfoToken,
  },
  swagger: [
    {
      path: "/v3/docs",
      specVersion: "3.0.1",
    },
  ],
  componentsScan: [
    `${rootDir}/services/**/*.ts`,
    `${rootDir}/middlewares/**/*.ts`,
    `${rootDir}/protocols/**/*.ts`,
    `${rootDir}/repositories/**/*.ts`,
  ],
  exclude: ["**/*.spec.ts"],
})
export class Server {}

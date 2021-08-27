import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
// import "@tsed/mongoose";
import { config, rootDir } from "./config";
import { IndexCtrl } from "./controllers/pages/IndexController";
import { UserInfoModel, UserInfoToken } from "./models/mongo/UserInfoModel";
import passport from "passport";
import session from "express-session";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
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
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    }),

    cookieParser(process.env.COOKIE_SECRET!),
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET!,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
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

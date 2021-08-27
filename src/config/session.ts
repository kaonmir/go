import * as Config from "./config";

export default {
  resave: false,
  saveUninitialized: false,
  secret: Config.COOKIE_SECRET!,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

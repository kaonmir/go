export const config = require("dotenv").config();

export const isProduction = process.env.NODE_ENV === "production";

//

export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI || "http://localhost:27017";

export const COOKIE_SECRET = process.env.COOKIE_SECRET || "apnosfdipbn";
export const JWT_SECRET = process.env.JWT_SECRET || "329h-ewfgbpiavno[";

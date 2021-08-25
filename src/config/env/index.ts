export const config = require("dotenv").config();

export const isProduction = process.env.NODE_ENV === "production";

export const PORT = process.env.PORT!;
export const DEFAULT_URL = process.env.DEFAULT_URL;

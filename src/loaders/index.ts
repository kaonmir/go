import express from "express";

import mongooseLoader from "./mongoose";
import expressLoader from "./express";

async function init(expressApp: express.Express) {
  const mongoConnection = await mongooseLoader();
  console.log("Mongo DB is running");

  await expressLoader(expressApp);
  console.log("express loader is completed");

  return { mongoConnection };
}

export default { init };

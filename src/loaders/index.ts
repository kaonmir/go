import express from "express";

import mongooseLoader from "./mongoose";
import expressLoader from "./express";
import swaggerLoader from "./swagger";

async function init(expressApp: express.Express) {
  const mongoConnection = await mongooseLoader();
  console.log("Mongo DB is running");

  await swaggerLoader(expressApp);
  console.log("swagger is running on '/api-docs'");

  await expressLoader(expressApp);
  console.log("express loader is completed");

  return { mongoConnection };
}

export default { init };

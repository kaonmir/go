import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "GO",
      version: "1.0.0",
      description: "test API with express",
      // contact: {
      //   email: "sonjeff@naver.com",
      // },
      // license: {
      //   name: "Apache 2.0",
      //   url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      // },
    },
    host: "localhost:4000",
    basePath: "/",
  },
  apis: ["./src/routes/swagger/**/*", "./openapi.yml"],
};

const swaggerLoader = async (app: express.Express) => {
  const specs = swaggerJSdoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
};

export default swaggerLoader;

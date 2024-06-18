const swaggerUi = require("swagger-ui-express");
const fs = require("node:fs");
const YAML = require("yaml");

const file = fs.readFileSync("./config/swagger.yaml", "utf-8");
const swaggerDocument = YAML.parse(file);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

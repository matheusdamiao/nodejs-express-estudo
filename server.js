require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.connectionString)
  .then(() => {
    console.log("Conectado à base de dados");
    app.emit("Done");
  })
  .catch((e) => console.log(e));

const routes = require("./routes");
const path = require("path");
const { middle } = require("./src/middlewares/middleware.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(middle);
app.use(routes);

app.on("Done", () => {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
});

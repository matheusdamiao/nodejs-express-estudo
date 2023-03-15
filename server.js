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

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const routes = require("./routes");
const path = require("path");
const { middle, middlewareGlobal } = require("./src/middlewares/middleware.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "daskdosakdoas",
  store: MongoStore.create({ mongoUrl: process.env.connectionString }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(middlewareGlobal);
app.use(routes);

app.on("Done", () => {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
});

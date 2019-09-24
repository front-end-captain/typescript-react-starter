const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.all("*", function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization,key,timestamp,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use((request, _, next) => {
  console.log(
    "The request type is " +
      chalk.green(request.method) +
      "; request url is " +
      chalk.green(request.originalUrl) +
      "; " +
      chalk.yellow(new Date().toLocaleString()),
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/primary/paper", require("./controller/papers"));


app.use((error, _, response) => {
  if (response.name === "next") {
    return response(error);
  }
  console.dir(chalk.red(error));
  response.status(500).send(error);
});

const server = app.listen(PORT, HOST, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(chalk.blue(`The server is listening at http://${host}:${port}`));
});

module.exports = server;

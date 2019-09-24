"use strict";

// init environment variable
const args = {};
process.argv.forEach((val) => {
  const key = val.split("=")[0];
  const value = val.split("=")[1];
  args[key] = value || "";
});

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";
process.env.TEST = args.TEST;
process.env.LOCAL = args.LOCAL;

const { initURLS } = require("./url");

const URL_MAP = initURLS(args.LOCAL);

process.address = {};

Object.keys(URL_MAP.dev).forEach((key) => {
  process.address[key] = URL_MAP.dev[key];
});

process.on("unhandledRejection", (err) => {
  throw err;
});

const chalk = require("react-dev-utils/chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const { choosePort, createCompiler, prepareProxy, prepareUrls } = require("react-dev-utils/WebpackDevServerUtils");
const openBrowser = require("react-dev-utils/openBrowser");
const paths = require("./paths");
const config = require("./webpack.dev");
const createDevServerConfig = require("./webpack.devServer");

const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;
const HOST = process.env.HOST || "0.0.0.0";

if (process.env.HOST) {
  console.log(
    chalk.cyan(`Attempting to bind to HOST environment variable: ${chalk.yellow(chalk.bold(process.env.HOST))}`),
  );
  console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`);
  console.log(`Learn more here: ${chalk.yellow("https://bit.ly/CRA-advanced-config")}`);
  console.log();
}

const { checkBrowsers } = require("react-dev-utils/browsersHelper");
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then((port) => {
    if (port == null) {
      return;
    }

    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);

    const compiler = createCompiler({
      appName,
      config,
      urls,
      useYarn: false,
      webpack,
    });

    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
    const devServer = new WebpackDevServer(compiler, serverConfig);

    devServer.listen(port, HOST, (err) => {
      if (err) {
        return console.log(err);
      }

      if (process.env.NODE_PATH) {
        console.log(
          chalk.yellow(
            "Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.",
          ),
        );
        console.log();
      }

      Object.keys(process.address).forEach((key) => {
        console.log(chalk.green(`${key} ${process.address[key]}`));
      });

      console.log();

      console.log(chalk.cyan("Starting the development server..."));
      openBrowser(urls.localUrlForBrowser);
    });

    ["SIGINT", "SIGTERM"].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

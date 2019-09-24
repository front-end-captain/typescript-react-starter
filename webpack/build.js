"use strict";

const args = {};
process.argv.forEach((val) => {
  const key = val.split("=")[0];
  const value = val.split("=")[1];
  args[key] = value || "";
});

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
process.env.TEST = args.TEST;
process.env.LOCAL = args.LOCAL;

const { initURLS } = require("./url");

const URL_MAP = initURLS(JSON.parse(args.LOCAL));

const TEST = JSON.parse(args.TEST);
const ANALYSIS = JSON.parse(args.ANALYSIS || false);

process.address = {};

Object.keys(URL_MAP.dev).forEach((key) => {
  process.address[key] = TEST ? URL_MAP.test[key] : URL_MAP.prod[key];
});

process.on("unhandledRejection", (err) => {
  throw err;
});

const path = require("path");
const chalk = require("react-dev-utils/chalk");
const webpack = require("webpack");
const paths = require("./paths");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const printHostingInstructions = require("react-dev-utils/printHostingInstructions");
const FileSizeReporter = require("react-dev-utils/FileSizeReporter");
const printBuildError = require("react-dev-utils/printBuildError");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = false;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const config = require("./webpack.prod");

if (ANALYSIS) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

const { checkBrowsers } = require("react-dev-utils/browsersHelper");
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return measureFileSizesBeforeBuild(paths.appBuild);
  })
  .then((previousFileSizes) => {
    console.log(chalk.green("NODE_ENV", process.env.NODE_ENV));
    console.log(chalk.green("TEST", process.env.TEST));
    console.log(chalk.green("LOCAL", process.env.LOCAL));

    Object.keys(process.address).forEach((key) => {
      console.log(chalk.green(`${key} ${process.address[key]}`));
    });

    console.log();

    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow("Compiled with warnings.\n"));
        console.log(warnings.join("\n\n"));
        console.log();
      } else {
        console.log(chalk.green("Compiled successfully.\n"));
      }

      console.log("File sizes after gzip:\n");
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrl;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(appPackage, publicUrl, publicPath, buildFolder, useYarn);
    },
    (err) => {
      console.log(chalk.red("Failed to compile.\n"));
      printBuildError(err);
      process.exit(1);
    },
  )
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

function build(previousFileSizes) {
  if (process.env.NODE_PATH) {
    console.log(
      chalk.yellow(
        "Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.",
      ),
    );
    console.log();
  }

  console.log("Creating an optimized production build...");

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        messages = formatWebpackMessages({
          errors: [err.message],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(stats.toJson({ all: false, warnings: true, errors: true }));
      }
      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== "string" || process.env.CI.toLowerCase() !== "false") &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            "\nTreating warnings as errors because process.env.CI = true.\n" +
              "Most CI servers set it automatically.\n",
          ),
        );
        return reject(new Error(messages.warnings.join("\n\n")));
      }

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

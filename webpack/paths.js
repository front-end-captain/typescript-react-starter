"use strict";

const path = require("path");
const fs = require("fs");
const url = require("url");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const ensureSlash = (path, needsSlash) => {
  const hasSlash = path.endsWith("/");
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
};

const getPublicUrl = (appPackageJson) => envPublicUrl || require(appPackageJson).homepage;

const getServedPath = (appPackageJson) => {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
  return ensureSlash(servedUrl, true);
};

const getAlias = () => {
  const appSrc = resolveApp("src");
  return {
    "@/pages": path.join(appSrc, "/pages"),
    "@/components": path.join(appSrc, "/components"),
    "@/utils": path.join(appSrc, "/utils"),
    "@/constants": path.join(appSrc, "/constants"),
    "@/router": path.join(appSrc, "/router"),
    "@/api": path.join(appSrc, "/service/api"),
    "@/types": path.join(appSrc, "/types"),
    "@/hooks": path.join(appSrc, "/hooks"),
    "@/style": path.join(appSrc, "/style"),
    "@/service": path.join(appSrc, "/service"),
    "@/library": path.join(appSrc, "/library"),
    "@/model": path.join(appSrc, "/model"),
    "URL": path.join(appSrc, "/service/URL.ts"),
  };
};

module.exports = {
  getAlias,
  dotenv: resolveApp(".env"),
  appPath: resolveApp('.'),
  appBuild: resolveApp("build"),
  node_modules: resolveApp("node_modules"),
  appHtml: resolveApp("template/index.html"),
  appIndexJs: resolveApp("src/index.tsx"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  testsSetup: resolveApp("tests/setup.js"),
  appNodeModules: resolveApp("node_modules"),
  publicUrl: getPublicUrl(resolveApp("package.json")),
  servedPath: getServedPath(resolveApp("package.json")),
};

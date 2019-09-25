"use strict";

/**
 *
 * @param {boolean} local
 */
const initURLS = (local) => {
  return {
    dev: {
      ONE_API: "http://localhost:3000",
      ASSETS_PATH: "/",
    },
    test: {
      ONE_API: "https://test.example.cn",
      ASSETS_PATH: local ? "/" : "https://online.test.cn/assets/",
    },
    prod: {
      ONE_API: "https://example.cn",
      ASSETS_PATH: "https://online.cn/assets/",
    },
  };
};

module.exports = { initURLS };

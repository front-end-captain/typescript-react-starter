"use strict";

/**
 *
 * @param {boolean} local
 */
const initURLS = (local) => {
  return {
    dev: {
      ONE_API: "http://localhost:3000",
      ANOTHER_API: "https://localhost:4000",
      ASSETS_PATH: "/",
    },
    test: {
      ONE_API: "https://test.example.cn",
      ANOTHER_API: "https://test.another.example.cn",
      ASSETS_PATH: local ? "/" : "https://online.test.cn/assets/",
    },
    prod: {
      ONE_API: "https://example.cn",
      ANOTHER_API: "https://another.example.cn",
      ASSETS_PATH: "https://online.cn/assets/",
    },
  };
};

module.exports = { initURLS };

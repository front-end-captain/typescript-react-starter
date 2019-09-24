/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-ignore */

const APIS: { [key: string]: any } = {};

// @ts-ignore
Object.keys(process.address).forEach((k) => {
  // @ts-ignore
  APIS[k] = process.address[k];
});

module.exports = APIS;

import { ResponseData } from "@/types/response";

export const DEFAULT_RESPONSE_DATA: ResponseData = {
  code: 0,
  data: {},
};

export const REQUEST_SUCCESS_CODE_REG = /^2\d{5}$/;
export const REQUEST_FAILURE_CODE_REG = /^3\d{5}$/;
export const REQUEST_AUTH_CODE_REG = /^4\d{5}$/;
export const REQUEST_SERVER_CODE_REG = /^5\d{5}$/;

export const REQUEST_SUCCESS_CODE = 200000;

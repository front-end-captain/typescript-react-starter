import { useEffect, useState, useRef } from "react";
import axios, { AxiosPromise, AxiosResponse, Canceler } from "axios";

import { ResponseData } from "@/types/response";
import { DEFAULT_RESPONSE_DATA, REQUEST_SUCCESS_CODE_REG } from "@/constants/request";

export type FetchCallback<D extends unknown = {}, P extends object = {}> = (params: P) => AxiosPromise<ResponseData<D>>;
type Callback = () => void;

type Fetching = undefined | boolean;
type RequestError = { message?: string; [key: string]: any } | null;

function checkResponseCode(code: number): boolean {
  return REQUEST_SUCCESS_CODE_REG.test(code.toString()) || code === 1001;
}

const { CancelToken } = axios;

/**
 * only invoke http request function when manual trigger request callback.
 * will not trigger after component mounted.
 * for example, user clicked the search button, countdown time out.
 *
 * @param {FetchCallback<D, P>} fetchCallback
 * @param {Callback | undefined} callback
 * @param {P | undefined} params
 * @type D ResponseData.data @see @/types/response `ResponseData.data`
 * @type P request params
 */
const useTriggerRequest = <D extends unknown = {}, P extends object = {}>(
  fetchCallback: FetchCallback<D, P>,
  callback?: Callback,
  params?: P,
) => {
  const [fetching, setFetching] = useState<Fetching>(undefined);
  const [data, setData] = useState<D>(({} as any) as D);
  const [error, setError] = useState<RequestError>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [responseData, setResponseData] = useState<ResponseData<D>>(DEFAULT_RESPONSE_DATA as ResponseData<D>);

  const [reload, setReload] = useState<boolean>(false);
  const prevReloadRef = useRef(reload);

  let cancel: Canceler;

  const sendRequest = async (args?: P) => {
    // clear error info before each request
    setError(null);
    setFetching(true);

    let response: AxiosResponse<ResponseData<D>>;

    const realParams = typeof params === "object" ? params : (({} as any) as P);
    const realArgs = typeof args === "object" ? args : (({} as any) as P);

    try {
      response = await fetchCallback({ ...realParams, ...realArgs, cancelToken: new CancelToken((c) => (cancel = c)) });

      setResponseData(response.data);

      if (response.status === 200 && checkResponseCode(response.data.code)) {
        setData(response.data.data);

        setSuccess(true);

        if (typeof callback === "function") {
          callback();
        }
      } else {
        throw new Error(`操作失败, 原因 ${response.data.msg || "未知"}`);
      }
    } catch (error) {
      // console.warn(error);
      setError(error);
      setSuccess(false);
      if (axios.isCancel(error)) {
        console.warn("request canceled", error.message);
      }
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (reload !== prevReloadRef.current) {
      sendRequest();
    }

    prevReloadRef.current = reload;
  }, [reload]);

  const doSendRequest = (args?: P) => {
    sendRequest(args);
  };

  const reSendRequest = () => {
    setReload(!reload);
  };

  const clearResponseData = () => {
    setResponseData(DEFAULT_RESPONSE_DATA as ResponseData<D>);
  };

  const clearData = () => {
    setData(({} as any) as D);
  };

  const cancelRequest = () => {
    cancel();
  };

  return {
    fetching,
    data,
    error,
    doSendRequest,
    responseData,
    reSendRequest,
    success,
    clearResponseData,
    clearData,
    cancelRequest,
  };
};

/**
 * invoke http request function when component mounted or other occasion.
 * for example, when component mounted, when page changed, when searchCondition changed.
 *
 * @param {FetchCallback<D, P} fetchCallback
 * @param {P | undefined} params
 * @param {Callback | undefined} callback
 */
const useRequest = <D extends unknown = {}, P extends object = {}>(
  fetchCallback: FetchCallback<D, P>,
  params?: P,
  callback?: Callback,
) => {
  const { doSendRequest, cancelRequest, ...reset } = useTriggerRequest<D, P>(fetchCallback, callback, params);

  const realParams: P = typeof params === "object" ? params : (({} as any) as P);

  useEffect(() => {
    doSendRequest(realParams);

    return () => {
      cancelRequest();
    };
  }, [...Object.values(realParams)]);

  return { doSendRequest, ...reset };
};

export { useRequest, useTriggerRequest };

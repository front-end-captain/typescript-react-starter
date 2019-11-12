export interface ResponseData<T extends unknown> {
  /**
   * 状态码
   *
   * @type {number}
   */
  code: number;

  /**
   * 消息
   *
   * @type {string}
   */
  msg?: string;

  /**
   * 数据
   *
   * @type {T extends unknown}
   */
  data: T;
}

export interface ResponsePagination {
  page: number;
  pageSize: number;
  total: number;
}

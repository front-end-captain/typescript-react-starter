export interface ResponseData<T> {
  /**
   * 状态码
   *
   * @type {number}
   */
  code: number;

  /**
   * 消息
   *
   * @type {number}
   */
  msg?: string;

  /**
   * 数据
   *
   * @type {T}
   */
  data: T;
}

export interface ResponsePagination {
  page: number;
  pageSize: number;
  total: number;
}

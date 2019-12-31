export interface ResponseData<T extends unknown = {}> {
  /**
   * 状态码
   *
   * @type {number}
   */
  readonly code: number;

  /**
   * 消息
   *
   * @type {string}
   */
  readonly msg?: string;

  /**
   * 数据
   *
   * @type {T extends any = {}}
   */
  readonly data: T;
}

export interface ResponsePagination {
  page: number;
  pageSize: number;
  total: number;
}

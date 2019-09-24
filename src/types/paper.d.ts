import { ResponsePagination } from "./response";

declare namespace PaperAPI {
  /**
   * @description 获取试卷列表查请求询参数
   */
  export type getPaperListQuery = {
    page?: number;
    size?: number;
    name?: string;
  };

  /**
   * @description 试卷列表项
   */
  export type PaperListItem = {
    id: number;
    name: string;
    examTime: number;
    createTime: string;
    creator: string;
  };

  /**
   * @description 试卷列表数据
   */
  export type PaperList = {
    pagination: ResponsePagination;
    list: PaperListItem[];
  };

  /**
   * @description 删除试卷请求参数
   */
  export type DeletePaperQuery = {
    paperId: number;
  };
}

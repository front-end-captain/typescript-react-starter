import { request } from "../request";
import { PaperAPI } from "@/types/paper";
import { ResponseData } from "@/types/response";

/**
 * 获取试卷列表
 */
export const getPapers = (params: PaperAPI.getPaperListQuery) => {
  return request.post<ResponseData<PaperAPI.PaperList>>("/paper/list", { ...params });
};

/**
 * 删除试卷
 */
export const deletePaper = (params: PaperAPI.DeletePaperQuery) => {
  return request.post<ResponseData<number>>("/paper/del", { ...params });
};

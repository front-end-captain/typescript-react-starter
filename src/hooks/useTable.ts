import { useState, useEffect, useRef } from "react";

import { useRequest, FetchCallback } from "./useRequest";
import { ResponsePagination } from "@/types/response";

const defaultSize = 10;
const defaultPage = 1;
const defaultTotal = 0;

const DefaultPagination: ResponsePagination = { total: defaultTotal, page: defaultPage, pageSize: defaultSize };

const useTable = <D, P>(fetchCallback: FetchCallback<D, P>, searchConditions?: P) => {
  const realSearchCondition = typeof searchConditions === "object" ? searchConditions : (({} as any) as P);

  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  const [pageSize, setPageSize] = useState<number>(defaultSize);
  const [condition, setCondition] = useState<P>({ ...realSearchCondition });
  const [reload, setReload] = useState<boolean>(false);

  const prevReloadRef = useRef<boolean>(reload);

  const searchQuery = ({
    page: currentPage,
    size: pageSize,
    ...condition,
  } as any) as P;

  const { fetching, data, error, doSendRequest } = useRequest<D, P>(fetchCallback, searchQuery);

  useEffect(() => {
    if (reload !== prevReloadRef.current) {
      doSendRequest(searchQuery);
    }

    prevReloadRef.current = reload;
  }, [reload]);

  const handlePaginationChange = (current: number, pageSize: number | undefined) => {
    setCurrentPage(current);
    setPageSize(pageSize || defaultSize);
  };

  const handleSearch = (condition: P) => {
    setCurrentPage(defaultPage);
    setCondition(condition);
  };

  const reloadTable = () => {
    setReload(!reload);
  };

  const reloadTableWithParams = (condition: P) => {
    doSendRequest(condition);
  };

  const resetPagination = () => {
    setCurrentPage(defaultPage);
    setPageSize(defaultSize);
  };

  // REVIEW TYPE 丢失了 list 的类型
  const dataSource: Array<any> = (data as any).list || [];
  const pagination: ResponsePagination = (data as any).pagination || DefaultPagination;

  const realLoading = typeof fetching === "undefined" ? true : fetching;

  return {
    loading: realLoading,
    error,
    data: dataSource,
    pagination,
    handlePaginationChange,
    currentPage,
    pageSize,
    handleSearch,
    reloadTable,
    resetPagination,
    reloadTableWithParams,
  };
};

export { useTable };

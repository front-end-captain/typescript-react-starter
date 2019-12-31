import React, { useEffect, FunctionComponent, FormEvent } from "react";
import { Button, Form, Col, Input, Row, Table, message, Modal } from "antd";

import { useTable } from "@/hooks/useTable";
import { useTriggerRequest } from "@/hooks/useRequest";
import { getPapers, deletePaper } from "@/api/paper";

import { StandardTableWrapper } from "@/style/common.css";
import { RouteComponentProps } from "react-router";
import { FormComponentProps } from "antd/lib/form";
import { ColumnProps } from "antd/lib/table";
import { PaperAPI } from "@/types/paper";

const { Item: FormItem } = Form;

interface PaperListTableSearchFields {
  name?: string;
}

interface ExamPapersProps extends RouteComponentProps, FormComponentProps<PaperListTableSearchFields> {}

const ExamPapersComponent: FunctionComponent<ExamPapersProps> = (props) => {
  const {
    data,
    loading,
    handlePaginationChange,
    currentPage,
    pageSize,
    pagination,
    handleSearch,
    reloadTable,
  } = useTable(getPapers, { name: "" });

  const { doSendRequest: delPaper, responseData: delPaperResult, fetching: deletingPaper } = useTriggerRequest(
    deletePaper,
    reloadTable,
  );

  // 删除试卷处理
  useEffect(() => {
    if (delPaperResult.code === 500004 && !deletingPaper) {
      message.error("本试卷已被关联，请解绑后删除");
    }
  }, [delPaperResult, deletingPaper]);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();

    const {
      form: { validateFields },
    } = props;

    validateFields((error, fieldsValue) => {
      if (error) {
        return;
      }

      handleSearch({ ...fieldsValue });
    });
  };

  const renderSearchForm = () => {
    const {
      form: { getFieldDecorator },
    } = props;

    return (
      <Form layout="inline" onSubmit={onSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="试卷名称">{getFieldDecorator("name")(<Input placeholder="请输入试卷名称" />)}</FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span>
              <Button type="primary" icon="search" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  const handleDeletePaper = (paperId: number, paperName: string) => {
    Modal.confirm({
      title: `确定要删除 "${paperName}试卷" 吗？`,
      okText: "确定",
      cancelText: "取消",
      onOk: () => delPaper({ paperId }),
      onCancel: () => {},
      centered: true,
    });
  };

  const papersTableColumn: Array<ColumnProps<PaperAPI.PaperListItem>> = [
    {
      title: "试卷名称",
      dataIndex: "name",
      width: "25%",
      className: "paper-name ellipsis-cell",
      onCell: (record) => ({ style: { maxWidth: `${Math.round(1200 * 0.25)}px` }, title: record.name }),
    },
    {
      title: "试卷时长",
      dataIndex: "examTime",
      render: (record) => `${record} 分钟`,
      width: "10%",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: "20%",
    },
    {
      title: "创建人",
      dataIndex: "creator",
      width: "10%",
      className: "paper-creator ellipsis-cell",
      onCell: (record) => ({ style: { maxWidth: `${Math.round(1200 * 0.1)}px` }, title: record.creator }),
    },
    {
      title: "操作",
      width: "20%",
      align: "center",
      className: "table-operator-cell",
      render: (_: any, record) => (
        <>
          <Button type="link" onClick={() => props.history.push(`/papers/previous/${record.id}`)}>
            查看
          </Button>
          <Button type="link" loading={deletingPaper} onClick={() => handleDeletePaper(record.id, record.name)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <StandardTableWrapper>
      <div className="table-list-form ">{renderSearchForm()}</div>
      <div className="table-list-operator" style={{ marginBottom: "20px" }}>
        <Button key="create" icon="plus" type="primary" onClick={() => props.history.push("/papers/create")}>
          新建试卷
        </Button>
      </div>

      <Table<PaperAPI.PaperListItem>
        loading={loading}
        columns={papersTableColumn}
        dataSource={data}
        rowKey={(record) => record.id.toString()}
        pagination={{
          total: pagination.total,
          showSizeChanger: false,
          current: currentPage,
          pageSize,
          onChange: handlePaginationChange,
        }}
      />
    </StandardTableWrapper>
  );
};

const ExamPapers = Form.create<ExamPapersProps>()(ExamPapersComponent);

export { ExamPapers };

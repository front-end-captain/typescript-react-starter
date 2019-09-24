import styled from "styled-components";
import { successColor } from "./theme.css";

const StandardTableWrapper = styled.div`
  .table-list-operator {
    margin-bottom: 16px;

    button {
      margin-right: 8px;
    }

    button[disabled] {
      display: none !important;
    }
  }

  .table-list-form {
    .ant-form-item {
      display: flex;
      margin-right: 0;
      margin-bottom: 24px;

      > .ant-form-item-label {
        width: auto;
        padding-right: 8px;
        line-height: 32px;
      }

      .ant-form-item-control {
        line-height: 32px;
      }
    }

    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }

  .ant-table-wrapper {
    min-height: 660px;

    .ant-table {
      min-height: 600px;

      .ant-table-fixed-right {
        .ant-table-tbody {
          .row-disabled {
            .ant-btn-link {
              cursor: not-allowed !important;
              color: #ccc !important;
            }

            a {
              cursor: not-allowed;
              color: #ccc;
              pointer-events: none;
            }
          }

          .table-operator-cell {
            .button-no-permission {
              display: none !important;
            }
          }
        }
      }
    }
  }

  .ant-table-body {
    .ant-table-thead {
      th {
        text-align: center;
      }
    }

    .ant-table-tbody {
      td {
        text-align: center;
      }

      .table-operator-cell {
        .button-no-permission {
          display: none !important;
        }
      }
    }

    .ant-table-row {
      .class-status-1,
      .class-status-2,
      .class-status-3 {
        color: ${successColor};
      }

      .class-status-4 {
        color: #ccc !important;
        cursor: not-allowed;
      }

      .ellipsis-cell {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .row-disabled {
      cursor: not-allowed;
      color: #ccc;

      a {
        cursor: not-allowed;
        color: #ccc;
        pointer-events: none;
      }
    }
  }
`;

export { StandardTableWrapper };

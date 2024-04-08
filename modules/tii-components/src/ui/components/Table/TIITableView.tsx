import React from "react";
import { TIITableViewProps, TIITableViewPropsKeys } from "../../../props";
import { APIContext, isResponseLoading } from "@tii/ui-core-framework";
import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { TableRowSelection } from "antd/es/table/interface";

const TIIStyledTable = styled(Table)`
  .ant-table table {
    border: 1px solid #d9d9d9;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan]):before {
    background-color: #d9d9d9;
  }
  .ant-table-thead > tr > th {
    background: #f5f5f5;
    border-bottom: 1px solid #d9d9d9;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #d9d9d9;
  }
`;

export abstract class TIITableView<
  T,
  P extends TIITableViewProps<T> = TIITableViewProps<T>,
  S = {}
> extends React.PureComponent<P, S> {
  constructor(props: P) {
    super(props);
  }

  abstract getColumnNames: () => ColumnsType<Partial<T>>;

  private getTableProps: () => Partial<TableProps<any>> = () => {
    return Object.keys(this.props)
      .filter((key) => !TIITableViewPropsKeys.includes(key))
      .reduce((acc, key) => {
        // @ts-ignore
        acc[key] = this.props[key];
        return acc;
      }, {} as Partial<TableProps<T>>);
  };

  render() {
    let response = this.context;
    return (
      <TIIStyledTable
        loading={isResponseLoading(response)}
        columns={this.getColumnNames()}
        dataSource={this.props.records?.map((it: any, i: number) => {
          it["key"] = "" + i;
          return it;
        })}
        rowSelection={this.props.rowSelection as TableRowSelection<object>}
        pagination={{
          total: this.props.total ?? 0,
          defaultCurrent: this.props.currentPage ?? 1,
          defaultPageSize: this.props.currentSize ?? 30,
          current: this.props.currentPage,
          pageSize: this.props.currentSize,
          position: ["bottomCenter"],
          showSizeChanger: true,
          pageSizeOptions: ["30", "50", "100", "500", "1000"],
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={(pagination, filters, sorter) => {
          this.props.onRequestData?.(
            pagination.current ?? 1,
            pagination.pageSize ?? 30
          );
        }}
        {...this.getTableProps()}
      />
    );
  }
}

TIITableView.contextType = APIContext;

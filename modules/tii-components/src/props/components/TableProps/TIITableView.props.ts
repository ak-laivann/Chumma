import { SpinProps, TableProps } from "antd";

export interface TIITableViewProps<T> extends TableProps<T> {
  onRequestData: (pageNumber: number, pageSize: number) => void;
  records: Array<T>;
  total: number;
  currentPage?: number;
  currentSize?: number;
  isLoading?: boolean | SpinProps;
  onRecordClick?: (elementIndex: number) => void;
}

// TODO: Worst hack. Be better. Do better.
export const TIITableViewPropsKeys = [
  "onRequestData",
  "records",
  "total",
  "isLoading",
  "onRecordClick",
];

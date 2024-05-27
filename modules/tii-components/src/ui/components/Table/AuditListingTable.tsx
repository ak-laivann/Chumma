import { ColumnsType } from "antd/es/table";
import { Audit, TIITableViewProps } from "../../../props";
import { TIITableView } from "./TIITableView";

export class AuditsTable extends TIITableView<Audit, TIITableViewProps<Audit>> {
  constructor(props: TIITableViewProps<Audit>) {
    super(props);
  }

  getColumnNames = (): ColumnsType<Partial<Audit>> => {
    const columns: ColumnsType<Partial<Audit>> = [
      {
        title: "Type",
        key: "type",
        dataIndex: "type",
      },
      {
        title: "Date Detail(s)",
        key: "dateDetails",
        dataIndex: "dateDetails",
        render: () => {
          return <></>;
        },
      },
      {
        title: "Auditor Name(s)",
        key: "auditorNames",
        dataIndex: "auditorNames",
      },
      {
        title: "Location Details",
        key: "locationDetails",
        dataIndex: "locationDetails",
        render: (_, record) => {
          return <></>;
        },
      },
      {
        title: "Observation Details",
        key: "observationDetails",
        dataIndex: "observationDetails",
        render: (_, record) => {
          return <></>;
        },
      },
      {
        title: "Responsibility",
        key: "responsibility",
        dataIndex: "responsibility",
      },
      {
        title: "Status",
        key: "completionStatus",
        dataIndex: "completionStatus",
      },
    ];
    return columns;
  };
}

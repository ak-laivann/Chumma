import { ColumnsType } from "antd/es/table";
import { Audit, AuditStatus, TIITableViewProps } from "../../../props";
import { TIITableView } from "./TIITableView";
import { Modal, Typography } from "antd";
import moment from "moment-timezone";
import { useState } from "react";

const ObservationView = (props: Partial<Audit>) => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <Modal
        closable
        closeIcon
        keyboard={true}
        open={modal}
        title="Observation Details"
        children={
          <>
            <Typography.Text mark>Observation</Typography.Text>:{" "}
            {props.observation}
            <br />
            <Typography.Text mark>Comments</Typography.Text>: {props.comments}
            <br />
            <Typography.Text mark>Recommendation</Typography.Text>:{" "}
            {props.recommendation}
          </>
        }
        footer={<></>}
        onCancel={() => setModal(false)}
      />
      <Typography.Link
        children={"Observation Details"}
        onClick={() => setModal(true)}
      />
    </>
  );
};

export class AuditsTable extends TIITableView<Audit, TIITableViewProps<Audit>> {
  constructor(props: TIITableViewProps<Audit>) {
    super(props);
  }

  getColumnNames = (): ColumnsType<Partial<Audit>> => {
    const columns: ColumnsType<Partial<Audit>> = [
      {
        title: "Audit Date",
        key: "dateDetails",
        dataIndex: "dateDetails",
        render: (_, record) => {
          return <>{moment(record.date).format("DD-MM-YY")}</>;
        },
      },

      {
        title: "Auditor Name(s)",
        key: "auditorNames",
        dataIndex: "auditorNames",
      },
      {
        title: "Zone",
        key: "zone",
        dataIndex: "zone",
      },
      {
        title: "Department",
        key: "department",
        dataIndex: "department",
      },
      {
        title: "Observation Details",
        key: "observationDetails",
        dataIndex: "observationDetails",
        render: (_, record) => {
          return (
            <>
              <ObservationView {...record} />
            </>
          );
        },
      },
      {
        title: "Responsibility",
        key: "responsibility",
        dataIndex: "responsibility",
      },

      {
        title: "Target Date",
        key: "target",
        dataIndex: "targetDate",
        render: (_, record) => {
          return <>{moment(record.targetDate).format("DD-MM-YY")}</>;
        },
      },
      {
        title: "Overdue in Day(s)",
        key: "overdue",
        dataIndex: "overdueDate",
      },
    ];
    return columns;
  };
}

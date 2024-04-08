import { TIITableViewProps, Spare } from "../../../props";
import { ColumnsType } from "antd/es/table";
import { TIITableView } from "./TIITableView";
import { Form, InputNumber, Modal, Typography, message } from "antd";
import React, { useState } from "react";
import { TIIButton } from "../../constructs";

const ModalForMachineDetails = (props: { record: Partial<Spare> }) => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <Modal
        closable
        closeIcon
        keyboard={true}
        open={modal}
        title="Machine Details"
        children={
          <>
            <Typography.Paragraph>
              <Typography.Text mark>Machine Name</Typography.Text>:{" "}
              {props.record.machineName?.toString()}
            </Typography.Paragraph>
            <Typography.Text>
              <Typography.Text mark>Machine Terminology</Typography.Text>:{" "}
              {props.record.machineTerminology}
            </Typography.Text>
          </>
        }
        footer={<></>}
        onCancel={() => setModal(false)}
      />
      <Typography.Title level={5} ellipsis onClick={() => setModal(true)}>
        {props.record.machineName?.toString()}
      </Typography.Title>
      <Typography.Paragraph ellipsis={true} onClick={() => setModal(true)}>
        {/* {props.record.machineTerminology} */}
      </Typography.Paragraph>
    </>
  );
};

const ModalForSupplierDetails = (props: { record: Partial<Spare> }) => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <Modal
        closable
        closeIcon
        keyboard={true}
        open={modal}
        title="Supplier Details"
        children={
          <>
            <Typography.Text mark>Suppliers</Typography.Text>:{" "}
            {props.record.suppliers?.toString()}
            <Typography.Paragraph>
              <Typography.Text mark>Lead Time</Typography.Text>:{" "}
              {props.record.leadTime}
            </Typography.Paragraph>
          </>
        }
        footer={<></>}
        onCancel={() => setModal(false)}
      />
      <Typography.Paragraph ellipsis onClick={() => setModal(true)}>
        {props.record.suppliers?.toString()}
      </Typography.Paragraph>
      Lead Time: {props.record.leadTime}
    </>
  );
};

const ModalForSpareDetails = (props: { record: Partial<Spare> }) => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <Modal
        closable
        closeIcon
        keyboard={true}
        open={modal}
        title="Spare Details"
        children={<>{props.record.description}</>}
        footer={<></>}
        onCancel={() => setModal(false)}
      />
      <Typography.Title level={5}>{props.record.name}</Typography.Title>
      <Typography.Paragraph ellipsis onClick={() => setModal(true)}>
        {/* {props.record.description} */}
      </Typography.Paragraph>
      <p>
        Item Code:{" "}
        <Typography.Text mark>{props.record.itemCode}</Typography.Text>
      </p>
      <Typography.Link underline href="./view">
        Update Details
      </Typography.Link>
    </>
  );
};

const UnitsDetailsWithUpdationForm: React.FC<{
  record: Partial<Spare>;
}> = (prop: { record: Partial<Spare> }) => {
  console.log("record = ", prop.record);
  const [modal, setModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  return (
    <>
      <p>
        <Typography.Text mark italic strong>
          Min
        </Typography.Text>
        : {prop.record.minimumNumber}
      </p>
      <p>
        <Typography.Text code strong>
          Present
        </Typography.Text>
        : {prop.record.presentNumbers}
      </p>
      <p>
        <Typography.Text strong>UOM</Typography.Text>:{" "}
        {prop.record.unitOfMeasurement}
      </p>
      <TIIButton children="Update" onClick={() => setModal(true)} />
      <Modal
        open={modal}
        title={`Updating ${prop.record.name} - ${prop.record.itemCode}`}
        footer={<></>}
        onCancel={() => {
          setModal(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 24 }}
          onFinish={(val) => {
            console.log(val);
            message.success("details updated").then(() => setModal(false));
          }}
        >
          <Form.Item
            name={"add"}
            label={
              <Typography.Text strong italic>
                Select the number that has to be added
              </Typography.Text>
            }
          >
            <InputNumber type="number" min={1} />
          </Form.Item>
          <br />
          <Form.Item
            name={"subtract"}
            label={
              <Typography.Text strong italic>
                Select the number that has to be deducted
              </Typography.Text>
            }
          >
            <InputNumber type="number" min={1} />
          </Form.Item>
          <TIIButton htmlType="submit" children="Update" />
        </Form>
      </Modal>
    </>
  );
};

export class SparesTable extends TIITableView<Spare, TIITableViewProps<Spare>> {
  constructor(props: TIITableViewProps<Spare>) {
    console.log("props,", props);
    super(props);
  }
  getColumnNames = (): ColumnsType<Partial<Spare>> => {
    const columns: ColumnsType<Partial<Spare>> = [
      {
        title: "Spare Details",
        key: "spareDetails",
        fixed: true,
        render: (_, record) => <ModalForSpareDetails record={record} />,
      },
      {
        title: "Machine Details",
        key: "machineDetails",
        dataIndex: "machineName",
        render: (_, record) => <ModalForMachineDetails record={record} />,
      },
      {
        title: "Cupboard Details",
        key: "cupboardDetails",
        render: (_, record) => (
          <>
            {record.cupboardName}
            <br />
            <Typography.Text mark italic strong>
              Rack
            </Typography.Text>
            : {record.rackNumber}
          </>
        ),
      },
      {
        title: "Supplier Details",
        key: "supplierDetails",
        render: (_, record) => <ModalForSupplierDetails record={record} />,
      },
      {
        title: "Units Details",
        key: "units",
        render: (_, record) => <UnitsDetailsWithUpdationForm record={record} />,
      },
    ];
    return columns;
  };
}

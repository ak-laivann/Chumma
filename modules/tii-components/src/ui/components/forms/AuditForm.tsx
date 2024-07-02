import React from "react";
import { AuditFormProps, AuditFormType } from "../../../props";
import { Col, Collapse, DatePicker, Form, Row, Typography } from "antd";
import {
  CustomRequiredFormItem as FormItem,
  TIIFormFooter,
  TIISelect,
  TIITextAreaComponent,
  TIITextInput,
} from "../../constructs";
import {
  CalendarTwoTone,
  CaretRightFilled,
  CompassTwoTone,
  ReconciliationTwoTone,
  ScheduleTwoTone,
} from "@ant-design/icons";
import moment from "moment-timezone";

const AuditDetailsColor = "#3498DB";
const DateDetailsColor = "#E74C3C";
const ObservationDetailsColor = "#F39C12";
const LocationDetailsColor = "#9B59B6";
export const AuditForm = React.memo((props: AuditFormProps) => {
  const [form] = props.form ? [props.form] : Form.useForm<AuditFormType>();
  const initialValue = {
    ...props.auditDetails,
    date: props.auditDetails.date ? moment(props.auditDetails.date) : undefined,
    targetDate: props.auditDetails.targetDate
      ? moment(props.auditDetails.targetDate)
      : undefined,
  };
  return (
    <>
      <Form
        form={form}
        name="auditDetails"
        initialValues={initialValue}
        labelCol={{ span: 24 }}
        onFinish={(values) => {
          console.log("values", values),
            props.submitBtnProps.onSubmitClick(values);
        }}
        onFinishFailed={(err: any) => console.error("error = ", err)}
      >
        <Collapse
          expandIcon={({ isActive }) => (
            <CaretRightFilled
              style={{ fontSize: "22px" }}
              rotate={isActive ? 90 : 270}
            />
          )}
          expandIconPosition={"end"}
          defaultActiveKey={"auditDetails"}
        >
          <Collapse.Panel
            extra={
              <>
                <ScheduleTwoTone
                  style={{ fontSize: "22px" }}
                  twoToneColor={AuditDetailsColor}
                />
                &emsp;
              </>
            }
            key={"auditDetails"}
            header={
              <>
                <Typography.Text
                  style={{ fontSize: "22px", color: AuditDetailsColor }}
                >
                  Audit Details
                </Typography.Text>
              </>
            }
          >
            <Row gutter={[12, 0]}>
              <Col span={12}>
                <TIISelect
                  mode="tags"
                  name={"auditorNames"}
                  label={"Auditor Name(s)"}
                  required
                />
              </Col>
              <Col span={12}>
                <TIISelect
                  mode="tags"
                  name={"responsibility"}
                  label={"Responsibility"}
                  required
                />
              </Col>
              <Col span={12}>
                <TIISelect
                  name={"type"}
                  label={"Audit Type"}
                  required
                  mode="tags"
                />
              </Col>
              <Col span={12}>
                <TIISelect
                  name={"department"}
                  label={"Department"}
                  required
                  mode="tags"
                />
              </Col>
            </Row>
          </Collapse.Panel>
          <Collapse.Panel
            extra={
              <>
                <CalendarTwoTone
                  style={{ fontSize: "22px" }}
                  twoToneColor={DateDetailsColor}
                />
                &emsp;
              </>
            }
            key={"dateDetails"}
            header={
              <Typography.Text
                style={{ fontSize: "22px", color: DateDetailsColor }}
              >
                Date Details
              </Typography.Text>
            }
          >
            <Row gutter={[12, 0]}>
              <Col span={12}>
                {DatePickerAbstracted({
                  label: "Audit Date",
                  name: "date",
                })}
              </Col>
              <Col span={12}>
                {DatePickerAbstracted({
                  label: "Target Date",
                  name: "targetDate",
                })}
              </Col>
            </Row>
          </Collapse.Panel>
          <br />
          <Collapse.Panel
            extra={
              <>
                <CompassTwoTone
                  style={{ fontSize: "22px" }}
                  twoToneColor={LocationDetailsColor}
                />
                &emsp;
              </>
            }
            key={"locationDetails"}
            header={
              <Typography.Text
                style={{ fontSize: "22px", color: LocationDetailsColor }}
              >
                Location Details
              </Typography.Text>
            }
          >
            <Row gutter={[12, 0]}>
              <Col span={12}>
                <TIITextInput
                  min={0}
                  name={"zone"}
                  type="number"
                  label={"Zone"}
                  required
                />
              </Col>
              <Col span={12}>
                <TIITextAreaComponent
                  name={"locationOrMachine"}
                  label={"Location Or Machine"}
                  required
                />
              </Col>
            </Row>
          </Collapse.Panel>
          <br />
          <Collapse.Panel
            extra={
              <>
                <ReconciliationTwoTone
                  style={{ fontSize: "22px" }}
                  twoToneColor={ObservationDetailsColor}
                />
                &emsp;
              </>
            }
            key={"observationDetails"}
            header={
              <Typography.Text
                style={{ fontSize: "22px", color: ObservationDetailsColor }}
              >
                Observation Details
              </Typography.Text>
            }
          >
            <Row gutter={[12, 0]}>
              <Col span={12}>
                <TIITextAreaComponent
                  name={"observation"}
                  label={"Observation"}
                  required
                />
              </Col>
              <Col span={12}>
                <TIITextAreaComponent
                  name={"recommendation"}
                  label={"Recommendation"}
                  required
                />
              </Col>
              <Col span={12}>
                <TIITextAreaComponent
                  name={"comments"}
                  label={"Comments"}
                  required
                />
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Form>
      <TIIFormFooter
        footerDisabled={false}
        submit={{
          ...props.submitBtnProps,
          onSubmitClick: () => {
            form?.submit()!;
          },
        }}
        secondaryLink={{
          text: "Cancel",
          onSubmitClick: () => props.onCancel(),
        }}
      />
    </>
  );
});

function DatePickerAbstracted(props: { name: string; label: string }) {
  return (
    <FormItem
      rules={[{ required: true, message: `${props.label} is required` }]}
      hasFeedback
      name={props.name}
      label={props.label}
    >
      <DatePicker style={{ width: "100%" }} size="large" />
    </FormItem>
  );
}

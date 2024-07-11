import React from "react";
import { AuditFormProps, AuditFormType } from "../../../props";
import { Col, Collapse, DatePicker, Form, Row, Typography, Upload } from "antd";
import {
  CustomRequiredFormItem as FormItem,
  TIIButton,
  TIIFormFooter,
  TIISelect,
  TIITextAreaComponent,
  TIITextInput,
} from "../../constructs";
import {
  CalendarTwoTone,
  CameraTwoTone,
  CaretRightFilled,
  CheckCircleTwoTone,
  CompassTwoTone,
  ReconciliationTwoTone,
  ScheduleTwoTone,
} from "@ant-design/icons";
import moment from "moment-timezone";
import { DraggerProps } from "antd/lib/upload";

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

  const uploadProps: DraggerProps = {
    name: "file",
    multiple: false,
    accept: ".jpg,.jpeg,.svg,.png",
    maxCount: 1,
    beforeUpload: () => {
      /* 
        returning false,
        because once you select the file, 
        the upload component will call the url that would be specified in the action prop of draggerprops 
        or calls empty string with method "POST", 
        so overriding that by returning false. 
        And we wouldnt be needing this to be tested, so using istanbul ignore next.
      */

      /* istanbul ignore next */
      return false;
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <>
      {props.auditDetails.completionStatus === "PENDING_VERIFICATION" && (
        <Row gutter={[24, 24]}>
          <Col span={21}></Col>
          <Col span={3}>
            <TIIButton type="primary" size="large">
              ReAssign
            </TIIButton>
          </Col>
          <Col span={24}></Col>
        </Row>
      )}
      <Form
        disabled={props.readonly}
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
              <Col span={24}>
                <FormItem
                  required={true}
                  name={"observationImage"}
                  label="Observation Image"
                >
                  <Upload.Dragger
                    {...uploadProps}
                    fileList={props.auditDetails?.observationImage}
                    children={
                      <>
                        <p className="ant-upload-drag-icon">
                          <CameraTwoTone twoToneColor={"blue"} />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Upload the Observation Image and don't spam. Supported
                          file types - *.jpg,.jpeg,.svg,.png
                        </p>
                      </>
                    }
                  />
                </FormItem>
              </Col>
              {props.showCorrectedImage && (
                <Col span={24}>
                  <FormItem name={"correctedImage"} label="Corrected Image">
                    <Upload.Dragger
                      disabled={false}
                      {...uploadProps}
                      fileList={props.auditDetails?.correctedImage}
                      children={
                        <>
                          <p className="ant-upload-drag-icon">
                            <CameraTwoTone twoToneColor={"green"} />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="ant-upload-hint">
                            Upload the Corrected Image and don't spam. Supported
                            file types - *.jpg,.jpeg,.svg,.png
                          </p>
                        </>
                      }
                    />
                  </FormItem>
                </Col>
              )}
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
        draft={
          props.auditDetails.completionStatus === "PENDING_VERIFICATION"
            ? {
                text: "Verified",
                onSubmitClick: () => {},
                icon: <CheckCircleTwoTone />,
              }
            : undefined
        }
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

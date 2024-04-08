import React, { useState } from "react";
import { SparesFormProps } from "../../../props";
import { Typography, Form, Row, Col, Input, Switch } from "antd";
import {
  TIISelect,
  TIITextInput,
  TIIFormFooter,
  CustomRequiredFormItem,
} from "../../constructs";

export const SparesForm = React.memo((props: SparesFormProps) => {
  const [showCupboardDetails, setShowCupboardDetails] = useState<boolean>(
    props.spareDetails.isInsideCupboard! ?? false
  );
  const [form] = Form.useForm();

  return (
    <>
      <Typography.Title level={3} type="danger">
        Spare Details
      </Typography.Title>
      <Form
        name="sparesForm"
        initialValues={props.spareDetails}
        form={props.form ?? form}
        labelCol={{ span: 24 }}
        onFinish={(values) => {
          console.log({ ...values, type: "MECHANICAL" });
          props.submitBtnProps.onSubmitClick(values);
        }}
        onFinishFailed={(err: any) => console.error("error = ", err)}
      >
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <TIITextInput label="Spare Name" name={"spareName"} required />
          </Col>
          <Col span={24}>
            <CustomRequiredFormItem
              label="Description"
              name={"description"}
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea
                size="large"
                style={{ border: "1px solid grey" }}
                placeholder="Enter the Description"
              />
            </CustomRequiredFormItem>
          </Col>
          <Col span={8}>
            <TIITextInput
              label="Minimum Number to be stocked"
              name={"minimumNumber"}
              type="number"
              required
            />
          </Col>
          <Col span={8}>
            <TIITextInput
              type="number"
              label="Number of Items present"
              name={"presentNumbers"}
            />
          </Col>
          <Col span={8}>
            <TIITextInput
              name={"unitOfMeasurement"}
              label="Unit of Measurement"
            />
          </Col>
          <Col span={12}>
            <TIISelect
              label="Machine Name"
              name={"machineName"}
              mode="tags"
              selectoptions={{ COMMON: "Common" }}
            />
          </Col>
          <Col span={12}>
            <TIITextInput
              label="Machine Terminology"
              name={"machineTerminology"}
            />
          </Col>
          <Col span={12}>
            <TIITextInput name={"itemCode"} label="Item Code" type="number" />
          </Col>
          <Col span={12}></Col>
          <Col span={12}>
            <TIITextInput name={"leadTime"} label="Lead Time" />
          </Col>
          <Col span={12}>
            <TIISelect
              name={"suppliers"}
              label="Suppliers"
              mode="tags"
              open={false}
            />
          </Col>
          <Col span={24}>
            <Form.Item name={"isInsideCupboard"}>
              <Switch
                onChange={setShowCupboardDetails}
                size="default"
                checkedChildren="Is a cupboard item"
                unCheckedChildren="Not a cupboard item"
              />
            </Form.Item>
          </Col>
          {showCupboardDetails && (
            <>
              <Col span={12}>
                <TIITextInput
                  name={"cupboardName"}
                  label="Cupboard Name"
                  required
                />
              </Col>
              <Col span={12}>
                <TIITextInput
                  name={"rackNumber"}
                  label="Rack Number"
                  required
                />
              </Col>
            </>
          )}
        </Row>
      </Form>
      <TIIFormFooter
        submit={{
          text: props.submitBtnProps.text,
          icon: props.submitBtnProps.icon,
          onSubmitClick: () => form.submit(),
        }}
        secondaryLink={{
          onSubmitClick: () => props.onCancel(),
          text: "Cancel",
        }}
        footerDisabled={false}
      />
    </>
  );
});

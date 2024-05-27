import React from "react";
import { Form, Upload, message } from "antd";
import { DraggerProps } from "antd/lib/upload";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { TIIButton } from "../../constructs";
import { UploadAuditFileProps } from "../../../props";

export const UploadAuditFile = React.memo((props: UploadAuditFileProps) => {
  const [form] = Form.useForm();
  const uploadProps: DraggerProps = {
    name: "file",
    multiple: false,
    accept: ".xls,.xlsx",
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
      <Form
        form={form}
        onFinish={(val) => {
          console.log("val = ", val);
          props.uploadBtnProps.onSubmitClick(val.dragger.fileList);
        }}
      >
        <Form.Item name={"dragger"}>
          <Upload.Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Upload the Audit File and don't spam. Supported file types -
              *.xls,.xlsx
            </p>
          </Upload.Dragger>
        </Form.Item>
        <TIIButton
          htmlType="submit"
          icon={props.uploadBtnProps.icon}
          children={props.uploadBtnProps.text}
        />
      </Form>
    </>
  );
});

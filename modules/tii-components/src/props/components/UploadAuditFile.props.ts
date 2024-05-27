import { UploadFile } from "antd";
import { ButtonProps } from "../constructs";
import { FormInstance } from "antd/es/form/Form";

export interface UploadAuditFileProps {
  uploadBtnProps: ButtonProps<UploadFile<any>>;
  form?: FormInstance;
}

import { FormInstance } from "antd";
import { ButtonProps } from "../constructs";
import { Audit } from "../entity";

export type AuditFormType = Omit<Audit, "id" | "buId">;

export interface AuditFormProps {
  auditDetails: Partial<Audit>;
  submitBtnProps: ButtonProps<AuditFormType>;
  onCancel: () => void;
  form?: FormInstance<AuditFormType>;
  readonly?: boolean;
  showCorrectedImage?: boolean;
}

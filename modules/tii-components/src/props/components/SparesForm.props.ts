import { FormInstance } from "antd";
import { ButtonProps } from "../constructs";
import { Spare } from "../entity";

export type SpareFormType = Omit<Spare, "id" | "buId">;

export interface SparesFormProps {
  spareDetails: Partial<Spare>;
  submitBtnProps: ButtonProps<SpareFormType>;
  onCancel: () => void;
  form?: FormInstance<SpareFormType>;
  readonly?: boolean;
  department?: "ELECTRICAL" | "MECHANICAL";
}

import { SelectProps } from "antd";
import { FormItemProps } from "antd";
import { NamePath } from "antd/lib/form/interface";

export type TIISelectOptions = {
  [key: string]: string;
};

export interface TIISelectType extends SelectProps {
  selectoptions?: TIISelectOptions;
  maxTagCount?: number | "responsive";
}

export type TIISelectProps = TIISelectType & {
  showLabel?: boolean;
  name?: NamePath;
  label?: React.ReactNode;
  required?: boolean;
  formProps?: Omit<FormItemProps, "name" | "label" | "required">;
};

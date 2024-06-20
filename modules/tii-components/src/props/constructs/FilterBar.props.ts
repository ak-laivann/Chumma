import { InputProps, SelectProps } from "antd";
import { ButtonProps } from "./TIIButtonAndLink.props";
import { RangePickerProps } from "antd/lib/date-picker";

export interface FilterBarViewProps {
  fields: FilterBarField[];
  onSearch: (payload: FilterBarResult) => void;
  actionBtn?: ButtonProps<FilterBarResult>;
  onClear?: () => void;
}

export interface FilterBarField {
  name: string;
  id: string;
  type: "string" | "array" | "number" | "tree" | "numberRange" | "dateRange";
  value?: string | Array<string> | number | Array<Object> | Object;
  initialValue?: string | Array<string> | number | Array<Object> | Object;
  onChange?: (value: any) => void;
  placeholder?: string;
  addedProps?: InputProps | SelectProps | RangePickerProps;
}

export interface NumberTypeFilter {
  value: number;
  operator: string;
}

export function isNumberType(data: any): data is NumberTypeFilter {
  return data.hasOwnProperty("value") && data.hasOwnProperty("operator");
}
export interface FilterBarResult {
  [key: string]: NumberTypeFilter | string | string[];
}

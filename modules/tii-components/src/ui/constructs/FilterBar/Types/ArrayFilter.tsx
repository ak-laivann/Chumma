import { Form, Select, SelectProps } from "antd";
import React from "react";
import { TIISelect } from "../../../constructs";
import {
  FilterBarResult,
  FilterBarViewProps as props,
} from "../../../../props";
const { Option } = Select;

function isArrayOfStrings(inputValue: any): boolean {
  if (!Array.isArray(inputValue)) {
    return false;
  }

  for (const value of inputValue) {
    if (typeof value !== "string") {
      return false;
    }
  }

  return true;
}

export const ArrayFilter = React.memo((item: any) => {
  const selectProps: SelectProps = {
    size: "large",
    mode: "tags",
    maxTagCount: "responsive",
    style: { width: "100%" },
    placeholder: item.name,
    //@ts-ignore
    "data-testid": item.id,
  };

  let views = <></>;
  if (isArrayOfStrings(item.value)) {
    let child = item.value?.map((option: any, index: number) => (
      <Option key={index} label={option} value={option}>
        {`${option}`}
      </Option>
    ));
    views = (
      <Select
        mode="multiple"
        {...selectProps}
        placeholder={item.placeholder ?? item.name}
        onChange={(value) => item.onChange?.(value)}
      >
        {child}
      </Select>
    );
  } else {
    views = (
      <TIISelect
        mode="multiple"
        {...selectProps}
        selectoptions={item.value}
        placeholder={item.placeholder ?? item.name}
        onChange={(value) => item.onChange?.(value)}
      />
    );
  }

  return (
    <Form.Item
      name={item.id}
      label={item.name}
      initialValue={item.initialValue}
    >
      {views}
    </Form.Item>
  );
});

export function handleArrayOk(
  values: any,
  props: props,
  i: number,
  finaldata: FilterBarResult
) {
  let data: string[] = values[props.fields[i].id];
  if (
    data != null &&
    data.length > 0 &&
    data.map((i) => i.trim()).filter((i) => i.length > 0).length > 0
  ) {
    finaldata[props.fields[i].id] = data
      .map((i) => i.trim())
      .filter((i) => i.length > 0);
  }
}

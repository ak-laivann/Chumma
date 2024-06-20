import {
  FilterBarResult,
  FilterBarViewProps as props,
} from "../../../../props";
import { Form, Input } from "antd";
import React from "react";

export const StringFilter = React.memo((item: any) => {
  return (
    <Form.Item
      name={item.id}
      label={item.name}
      initialValue={item.initialValue}
    >
      <Input
        size="large"
        placeholder={item.placeholder ?? item.name}
        name={item.id}
        data-testid={item.id}
        onChange={(value) => item.onChange?.(value)}
      />
    </Form.Item>
  );
});

export function handleStringOk(
  values: any,
  props: props,
  i: number,
  finaldata: FilterBarResult
) {
  let data: string = values[props.fields[i].id];
  if (data != null && data.trim().length > 0) {
    finaldata[props.fields[i].id] = data.trim();
  }
}

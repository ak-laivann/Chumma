import { Form, Input, Select } from "antd";
import React from "react";

const Operators = {
  EQ: "=",
  GTE: ">=",
  LTE: "<=",
};

const { Option } = Select;

export const NumberFilter = React.memo((item: any) => {
  return (
    <Form.Item
      name={item.id}
      label={item.name}
      initialValue={item.initialValue}
    >
      <Input
        addonBefore={
          <Form.Item initialValue={"EQ"} noStyle name={item.id + "Operator"}>
            <Select defaultValue={"EQ"} size="large">
              {Object.entries(Operators).map(([key, value]) => (
                <Option key={key} value={key} label={value} title={key}>
                  {value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        }
        size="large"
        placeholder={item.placeholder ?? item.name}
        data-testid={item.id}
      />
    </Form.Item>
  );
});

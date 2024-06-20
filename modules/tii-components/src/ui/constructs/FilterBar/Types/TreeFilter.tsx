import {
  FilterBarResult,
  FilterBarViewProps as props,
} from "../../../../props";
import { Form, TreeSelect } from "antd";
import React from "react";

const { SHOW_PARENT } = TreeSelect;

export const TreeFilter = React.memo((item: any) => {
  return (
    <Form.Item
      name={item.id}
      label={item.name}
      initialValue={item.initialValue}
    >
      <TreeSelect
        maxTagCount={1}
        style={{ width: "100%" }}
        treeData={item.value}
        placeholder={item.placeholder ?? item.name}
        treeDefaultExpandAll
        size="large"
        treeCheckable={true}
        showCheckedStrategy={SHOW_PARENT}
        labelInValue
      />
    </Form.Item>
  );
});

export function handleTreeOk(
  values: any,
  props: props,
  i: number,
  finaldata: FilterBarResult
) {
  let str: string[] = [];
  let tempData = values[props.fields[i].id];
  for (let j = 0; j <= tempData?.length - 1; j++) {
    str.push(tempData[j].value);
  }
  finaldata[props.fields[i].id] = str;
}

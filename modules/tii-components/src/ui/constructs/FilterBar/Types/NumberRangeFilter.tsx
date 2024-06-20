import {
  FilterBarField,
  FilterBarResult,
  FilterBarViewProps as props,
} from "../../../../props";
import { Form, Input } from "antd";
import React from "react";
import { TIITextInput } from "../../../constructs";

export const NumberRangeFilter = React.memo((item: FilterBarField) => {
  const minWatch = Form.useWatch([item.id, "start"]);
  const maxWatch = Form.useWatch([item.id, "end"]);
  return (
    <Form.Item
      label={item.name}
      style={{ marginBottom: 0 }}
      initialValue={item.initialValue}
    >
      <Input.Group compact>
        <div style={{ width: "47.5%", textAlign: "center" }}>
          <TIITextInput
            data-testid="min"
            name={[item.id, "start"]}
            type="number"
            placeholder="Min"
            min={0}
            rules={[
              {
                validator: (_, minvalue) => {
                  if (
                    maxWatch &&
                    minvalue &&
                    parseInt(minvalue) > parseInt(maxWatch)
                  ) {
                    return Promise.reject(
                      new Error("Minimum must be less than Maximum")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          />
        </div>
        <div style={{ width: "5%" }}>
          <TIITextInput
            style={{ pointerEvents: "none", justifyContent: "center" }}
            disabled={true}
            value="-"
          />
        </div>
        <div style={{ width: "47.5%", textAlign: "center" }}>
          <TIITextInput
            rules={[
              {
                validator: (_, maxvalue) => {
                  if (
                    minWatch &&
                    maxvalue &&
                    parseInt(maxvalue) < parseInt(minWatch)
                  ) {
                    return Promise.reject(
                      new Error("Maximum must be greater than Minimum")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            data-testid="max"
            type="number"
            placeholder="Max"
            name={[item.id, "end"]}
            min={0}
          />
        </div>
      </Input.Group>
    </Form.Item>
  );
});

export function handleNumberRangeOk(
  values: any,
  props: props,
  i: number,
  finaldata: FilterBarResult
) {
  let { start, end } = values[props.fields[i].id];
  finaldata[props.fields[i].id] = {
    ...values[props.fields[i].id],
    start: start != null && start.length > 0 ? start : undefined,
    end: end != null && end.length > 0 ? end : undefined,
  };
}

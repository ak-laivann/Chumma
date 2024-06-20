import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  FilterBarResult,
  NumberTypeFilter,
  FilterBarViewProps as props,
} from "../../../props";
import { Button, Form, Row, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { ColWrapper, FilterBarArea } from "./FilterBar.styles";
import { FilterFactory } from "./FilterFactory";
import {
  handleArrayOk,
  handleDateRangeOk,
  handleNumberRangeOk,
  handleStringOk,
  handleTreeOk,
} from "./Types";
import { FormInstance } from "antd/es/form";
import { TIIButton } from "../TIIButtonAndLink";

function findOffset(a: number): number {
  let offset: number = 3;
  switch (a % 4) {
    case 0:
      offset = 18;
      break;
    case 1:
      offset = 12;
      break;
    case 2:
      offset = 6;
      break;
    case 3:
      offset = 0;
      break;
  }
  return offset;
}

export const FilterBar = React.memo((props: props) => {
  const [form] = Form.useForm();

  const [clientIds, setClientIds] = useState<string[]>([]);
  const clientIdsWatch = Form.useWatch("clientsFilter", form);

  useEffect(() => {
    if (clientIdsWatch) {
      setClientIds(clientIdsWatch);
    }
  }, [clientIdsWatch]);

  function handleOk(values: any) {
    let finaldata: FilterBarResult = {};
    for (let i = 0; i <= props.fields.length - 1; i++) {
      if (values.hasOwnProperty(props.fields[i].id)) {
        let temp: string | string[] | NumberTypeFilter = {
          value: 0,
          operator: "",
        };
        temp.value = values[props.fields[i].id];
        if (values.hasOwnProperty(props.fields[i].id + "Operator")) {
          temp.operator = values[props.fields[i].id + "Operator"];
          finaldata[props.fields[i].id] = temp;
        } else if (props.fields[i].type == "tree") {
          handleTreeOk(values, props, i, finaldata);
        } else if (props.fields[i].type == "array") {
          handleArrayOk(values, props, i, finaldata);
        } else if (props.fields[i].type === "string") {
          handleStringOk(values, props, i, finaldata);
        } else if (props.fields[i].type === "numberRange") {
          handleNumberRangeOk(values, props, i, finaldata);
        } else if (props.fields[i].type === "dateRange") {
          handleDateRangeOk(finaldata, props, i, values);
        } else {
          finaldata[props.fields[i].id] = values[props.fields[i].id];
        }
      }
    }
    return finaldata;
  }

  return (
    <FilterBarArea>
      {createForm(form, props, handleOk, clientIds)}
    </FilterBarArea>
  );
});

function createForm(
  form: any,
  props: props,
  handleOk: (values: any) => FilterBarResult,
  clientIds: string[]
) {
  return (
    <Form
      form={form}
      initialValues={props}
      name="form"
      layout="vertical"
      onFinish={(values) => {
        props.onSearch(handleOk(values));
      }}
    >
      {createFilterRow(props, handleOk, form, clientIds)}
    </Form>
  );
}

function createFilterRow(
  props: props,
  handleOk: (values: any) => FilterBarResult,
  form: any,
  clientIds: string[]
) {
  return (
    <Row align="middle" gutter={[8, 0]}>
      {createFilters(props, clientIds)}
      {createButtons(props, handleOk, form)}
    </Row>
  );
}

function createButtons(
  props: props,
  handleOk: (values: any) => FilterBarResult,
  form: any
) {
  return (
    <ColWrapper span={6} offset={findOffset(props.fields.length)}>
      <Space align="center">
        {checkAndCreateAdditionButton(props, handleOk, form)}
        {searchButton({ ...props, form: form })}
      </Space>
    </ColWrapper>
  );
}

function checkAndCreateAdditionButton(
  props: props,
  handleOk: (values: any) => FilterBarResult,
  form: any
): React.ReactNode {
  return (
    !!props.actionBtn &&
    props.fields.length > 0 &&
    additionalButton(props, handleOk, form)
  );
}

function additionalButton(
  props: props,
  handleOk: (values: any) => FilterBarResult,
  form: any
): React.ReactNode {
  return (
    <Button
      type={"default"}
      size="large"
      icon={props.actionBtn?.icon}
      onClick={() => {
        props.actionBtn?.onSubmitClick(handleOk(form.getFieldsValue()));
      }}
    >
      {props.actionBtn?.text}
    </Button>
  );
}

function searchButton(
  props: props & { form: FormInstance<any> }
): React.ReactNode {
  return (
    props.fields.length > 0 && (
      <>
        <TIIButton
          role="button"
          type={"primary"}
          htmlType="submit"
          size="large"
          icon={<SearchOutlined />}
        >
          Search
        </TIIButton>
        <Tooltip
          color="orange"
          title={"Clear Fields"}
          children={
            <TIIButton
              icon={
                <ClearOutlined
                  style={{ paddingLeft: "0px", fontSize: "20px" }}
                />
              }
              size="large"
              color="orange"
              onClick={() => {
                props.onClear?.();
                props.form.resetFields();
              }}
            />
          }
        />
      </>
    )
  );
}

function createFilters(props: props, clientIds: string[]): React.ReactNode {
  return props.fields.map((item, index) => (
    <ColWrapper span={6} key={index}>
      <FilterFactory item={item} clientIds={clientIds} />
    </ColWrapper>
  ));
}

import { TIISelectType, TIISelectProps } from "../../props";
import { Select } from "antd";
import { placeHolderGenerator, requiredValidator } from "./Utils";
import { CustomRequiredFormItem as FormItem } from "./constructs.styles";
import { Form } from "antd";

function getSubmitOptions(data: { [key: string]: string }) {
  const options = Object.entries(data).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });
  return options;
}

export const SelectComponent = (props: TIISelectProps) => {
  const { selectoptions, options, ...selectProps } = props;

  const maxTagCount = props.maxTagCount ? props.maxTagCount : "responsive";

  const optionsFromProps = selectoptions
    ? getSubmitOptions(props.selectoptions!)
    : [];
  return (
    <Select size="large" {...selectProps} maxTagCount={maxTagCount}>
      {optionsFromProps.map((i, index) => {
        return (
          <Select.Option key={index} value={i.value}>
            {i.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export const TIISelect = (props: TIISelectProps) => {
  const { showLabel, formProps, ...selectProps } = props;
  const showLabelInitialised = showLabel ?? true;
  const form = Form.useFormInstance() ?? Form.useForm()[0];
  return (
    <FormItem
      name={props.name}
      hasFeedback
      rules={props.required ? [requiredValidator(props.label as string)] : []}
      label={showLabelInitialised ? props.label : undefined}
      {...formProps}
    >
      <TIISelect
        placeholder={
          props.placeholder ??
          placeHolderGenerator(
            props.label as string,
            props.mode ? "Tags" : "Select"
          )
        }
        {...selectProps}
        onChange={(val: string[], option: any) => {
          props.mode == "tags" &&
            form.setFieldValue(
              props.name!,
              val.flatMap((i) =>
                i
                  .split(",")
                  .map((i) => i.trim())
                  .filter((j) => j.length > 0)
              )
            );
          !!props.onChange && props.onChange(val, option);
        }}
      />
    </FormItem>
  );
};

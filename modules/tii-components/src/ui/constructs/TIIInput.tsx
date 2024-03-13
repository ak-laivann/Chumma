import { FormItemProps, Input, InputProps } from "antd";
import { placeHolderGenerator, requiredValidator } from "./Utils";
import { CustomRequiredFormItem as FormItem } from "./constructs.styles";
import { TextAreaProps } from "antd/lib/input";

export const TIITextInput = (
  formItemProps: Omit<InputProps, "name"> & FormItemProps
) => {
  const { name, required, initialValue, style, noStyle, ...inputProps } =
    formItemProps;

  return (
    <FormItem
      rules={
        formItemProps.required
          ? [requiredValidator(formItemProps.label as string)]
          : []
      }
      hasFeedback
      {...formItemProps}
      label={formItemProps.label}
      style={undefined}
    >
      <Input
        size="large"
        placeholder={placeHolderGenerator(
          formItemProps.label as string,
          "Input"
        )}
        style={style}
        {...(inputProps as InputProps)}
      />
    </FormItem>
  );
};

export const TIITextAreaComponent = (
  props: Omit<InputProps, "name"> & Omit<TextAreaProps, "name"> & FormItemProps
) => {
  const {
    showCount,
    initialValue,
    required,
    bordered,
    hasFeedback,
    ...inputProp
  } = props;

  const formProps = Object.assign({}, props);
  delete formProps["bordered"];

  return (
    <FormItem
      rules={props.required ? [requiredValidator(props.label as string)] : []}
      hasFeedback
      {...(formProps as FormItemProps)}
      label={props.label}
      initialValue={initialValue}
    >
      <Input.TextArea
        bordered={bordered}
        autoSize
        size="large"
        placeholder={placeHolderGenerator(props.label as string, "Input")}
        {...(inputProp as InputProps & TextAreaProps)}
      />
    </FormItem>
  );
};

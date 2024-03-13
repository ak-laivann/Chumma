import styled from "styled-components";
import { Form } from "antd";

export const CustomRequiredFormItem = styled(Form.Item)`
  .ant-form-item-label
    > label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    )::after {
    display: inline-block;
    color: #ff4d4f;
    content: "*";
  }
  .ant-form-item-label
    > label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    )::before {
    display: none;
  }
`;

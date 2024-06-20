import styled from "styled-components";
import { Space, Badge, Form, Select, Row, Col } from "antd";

export const FilterBarArea = styled.div`
  background: #fff;
  flex-grow: 1;
  .ant-empty-normal {
    visibility: hidden;
  }
  padding: 5px 15px 5px 20px;
`;

export const ColWrapper = styled(Col)`
  .ant-btn-primary {
    background: #0d3f4b;
    border: none;
  }
  .ant-btn > span {
    padding-left: 8px;
  }
`;

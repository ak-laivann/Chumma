import styled from "styled-components";
import { Layout } from "antd";

export const HeaderNameBoardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 60px;
  padding: 12px 24px 12px 12px;
  width: 100%;
`;

export const HeaderNameBoardInitialDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  gap: 10px;
  color: white;
  width: 32px;
  height: 32px;
  background: #0d3f4b;
  border-radius: 2px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const InternalNameBoardHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderName = styled.div`
  margin-left: 10px;
  width: 126px;
  height: 16px;
  // font-family: 'Circular Std ';
  font-style: normal;
  font-weight: 450;
  font-size: 12px;
  line-height: 16px;
  color: #262626;
  flex: none;
  order: 0;
  flex-grow: 0;
  word-spacing: -3px;
`;

export const HeaderSignOut = styled.div`
  width: 45%;
  height: 20px;
  font-style: normal;
  font-weight: 450;
  font-size: 14px;
  line-height: 20px;
  color: #2094e8;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-left: 10px;
  border-bottom: 2px solid;
`;
export const HeaderWrapper = styled(Layout.Header)`
  width: 100%;
  height: 60px;
  border-right: 1px solid #eee;
  cursor: pointer;
  padding: 0;
  // padding-top:10px;
  background: #fff;
  border: 1px solid #eee;
  display: flex;
  justifycontent: space-between;
`;

export const HeaderCollapseDiv = styled.div`
  display: flex;
  padding: 12px 24px;
  border-right: 1px solid #bfbfbf;
`;

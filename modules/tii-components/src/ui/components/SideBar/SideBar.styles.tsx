import styled from "styled-components";
import { Layout } from "antd";

export const TIISidebarTitle = styled.div`
  width: 100%;
  color: #fff;
`;

export const SidebarLogArea = styled.div`
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Recruitment = styled(TIISidebarTitle)`
  height: 14px;
  // font-family: 'Circular Std ';
  font-style: normal;
  font-weight: 450;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.15em;
  color: #ebbe21 !important;
  margin-top: 25px;
  padding: 14px 24px;
  margin-bottom: 8px;
`;

export const SiderFooterTII = styled.div`
  color: white !important;
  margin-top: 3px;
  word-spacing: 1px;
  cursor: pointer;
`;

export const SideBarContactSupport = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

export const SiderWrapper = styled(Layout.Sider)`
  .ant-menu {
    background: #0d3f4b;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background: rgba(255, 255, 255, 0.15) !important;
    border-right: 3px solid #36c185;
  }
  .ant-menu-item-active {
    color: white !important;
  }
  .ant-menu-submenu-active {
    color: white !important;
  }
  .ant-menu-submenu-active:hover {
    color: white !important;
  }
  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    color: white !important;
    background: rgba(255, 255, 255, 0.15);
  }
  height: 100vh;
  background: #0d3f4b;

  & .ant-menu-submenu-arrow {
    color: white !important;
  }
`;

export const SiderFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 10px 5px;
  border-top: 1px solid #eee;
  flex-direction: column;
  width: 100%;
`;
export const ContactDesign = styled.div`
  color: #36c185;
  line-height: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-left: 10px;
  border-bottom: 1.5px solid #36c185;
`;
export const MenuWrapper = styled.div`
  width: 100%;
  overflow: auto;
  margin-top: 5px;
  max-height: 80%;
  height: 100% !important;

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 14px 14px transparent;
    border: solid 4px transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 14px 14px #80999f;
    border: solid 4px transparent;
    border-radius: 14px;
  }

  /* set button(top and bottom of the scrollbar) */
  ::-webkit-scrollbar-button {
    display: none;
  }
  .ant-menu-submenu-active {
    color: white !important;
  }
  .ant-menu-submenu-active:hover {
    color: white !important;
  }
  .ant-menu-title-content::after {
    color: white !important;
  }
  .ant-menu-submenu-title:hover {
    color: white !important;
  }

  .ant-menu-submenu-title {
    padding: 5% 15% !important;
  }

  .ant-menu-title-content {
    color: white !important;
  }

  // display: flex;
  // justify-content: space-between;
  width: 100%;
  // background:red;
  .ant-menu-inline.ant-menu-root .ant-menu-item {
    background: none;
  }
  .ant-menu {
    width: 100% !important;
    color: white !important;
  }
  align-items: center;
  .ant-menu-item-selected {
    background: rgba(255, 255, 255, 0.15);
    border-right: 3px solid #36c185;
    color: white !important;
  }

  &::selection {
    color: white !important;
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus {
    color: white !important;
    background: rgba(255, 255, 255, 0.15);
  }

  .ant-menu-vertical .ant-menu-item {
    width: 100%;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: rgba(255, 255, 255, 0.15);
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    color: white !important;
    background: rgba(255, 255, 255, 0.15);
  }

  .ant-menu-item-group-title {
    // font-family: 'Circular Std ';
    font-style: normal;
    font-weight: 450;
    line-height: 15px;
    letter-spacing: 0.15em;
    color: #ebbe21 !important;
    margin-bottom: 25px;
    padding: 14px 24px;
    margin-bottom: 8px;
    gap: 5px;
  }
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: none !important;
  }
  .ant-layout-sider-children {
    background-color: #0d3f4b;
  }
`;

export const TIIIconWrapper = styled.div`
  margin-left: 10px;
`;

export const TIIContactIconWrapper = styled.div`
  margin-top: 5px;
  margin-right: 10px;
`;

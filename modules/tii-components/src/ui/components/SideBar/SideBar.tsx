import React from "react";
import { SiderProps } from "../../../props";
import { MenuItemGroupType } from "antd/lib/menu/hooks/useItems";
import { Menu } from "antd";
import { If } from "../../../ui/constructs";
import {
  SiderWrapper,
  SidebarLogArea,
  MenuWrapper,
  SiderFooter,
  SiderFooterTII,
  SideBarContactSupport,
  ContactDesign,
  TIIIconWrapper,
  TIIContactIconWrapper,
} from "./SideBar.styles";
import { ContactsOutlined } from "@ant-design/icons";

export const TIISideBar = React.memo((props: SiderProps) => {
  const copyright = String.fromCodePoint(0x00a9);
  const registered = String.fromCodePoint(0x000ae);
  const { collapsed, onItemClick, onContactClick, items, onLogoClick, logo } =
    props;
  const menuItems: Array<MenuItemGroupType> = items.map((item) => {
    return {
      type: "group",
      key: item.id,
      label: item.title,
      children: item.data.map((child) => {
        const Icon = child.icon;
        return {
          key: child.id,
          label: child.title,
          icon: Icon,
        };
      }),
    };
  });
  const Icon = props.logo;
  return (
    <SiderWrapper trigger={null} collapsible collapsed={collapsed}>
      <SidebarLogArea onClick={props.onLogoClick} data-testid="logo">
        <If condition={!collapsed}>{props.logo}</If>
        <If condition={collapsed}>
          <TIIIconWrapper>{/* <IconCollapse /> */}</TIIIconWrapper>
        </If>
      </SidebarLogArea>

      <MenuWrapper>
        <Menu
          data-testid="selections"
          items={menuItems}
          selectedKeys={props.selectedItemId ? [props.selectedItemId] : []}
          onClick={(menuInfo) => {
            props.items.forEach((item) => {
              let filteredItem = item.data.find((data) => {
                return data.id === menuInfo.key;
              });
              if (filteredItem) {
                console.log(item.id, filteredItem);
                props.onItemClick(item.id, filteredItem);
              }
            });
          }}
        />
      </MenuWrapper>

      <SiderFooter>
        <If condition={!collapsed}>
          <SiderFooterTII>
            {copyright} TII{registered}
          </SiderFooterTII>
          <SideBarContactSupport onClick={props.onContactClick}>
            <TIIContactIconWrapper>
              <ContactsOutlined />
            </TIIContactIconWrapper>

            <SiderFooterTII>
              <ContactDesign>Contact Support</ContactDesign>
            </SiderFooterTII>
          </SideBarContactSupport>
        </If>
        <If condition={collapsed}>
          <SiderFooterTII>
            {" "}
            {copyright} TII{registered}
          </SiderFooterTII>
          <SiderFooterTII>
            <ContactsOutlined onClick={props.onContactClick} />
          </SiderFooterTII>
        </If>
      </SiderFooter>
    </SiderWrapper>
  );
});

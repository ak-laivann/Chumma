import React from "react";

export interface SiderProps {
  collapsed: boolean;
  onItemClick: (sectionId: string, SideBarItem: SideBarItem) => void;
  items: SectionedItem[];
  selectedItemId?: string;
  onContactClick: () => void;
  onLogoClick: () => void;
  logo: React.ReactElement | React.ReactNode;
}

export interface SectionedItem {
  id: string;
  title: string;
  icon?: React.ReactNode | React.ReactElement;
  expanded?: Boolean;
  data: SideBarItem[];
}
export interface SideBarItem {
  id: string;
  title: string;
  icon: React.ReactNode | React.ReactElement;
}

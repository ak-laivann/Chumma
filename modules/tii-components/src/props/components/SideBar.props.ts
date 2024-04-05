import { Icon } from "../constructs";

export interface SiderProps {
  collapsed: boolean;
  onItemClick: (sectionId: string, SideBarItem: SideBarItem) => void;
  items: SectionedItem[];
  selectedItemId?: string;
  onLogoClick: () => void;
  logo: Icon;
}

export interface SectionedItem {
  id: string;
  title: string;
  icon?: Icon;
  expanded?: Boolean;
  data: SideBarItem[];
}
export interface SideBarItem {
  id: string;
  title: string;
  icon: Icon;
}

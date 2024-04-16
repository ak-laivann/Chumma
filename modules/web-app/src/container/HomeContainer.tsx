import { RootRouter } from "../Router";
import { useContext, useState } from "react";
import { UserContext } from "@tii/ui-core-framework";
import { useLocation, useNavigate } from "react-router";
import {
  SolutionOutlined,
  AuditOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Col, Form, Layout, Row, Select, Typography } from "antd";
import {
  SectionedItem,
  SideBarItem,
  TIISideBar,
  Header,
  NavMenuIconState,
} from "@tii/components";
const { Content } = Layout;

const onSignOutClick = () => {
  console.log("signed out");
};

export const HomeContainer = () => {
  const { mail, buId, id, departmentId } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const onSideBarItemClick = (
    sectionId: string,
    sideBarItem: SideBarItem
  ): void => {
    if (!!sectionId) {
      navigate(
        `bu/${buId}/departments/${departmentId}/${sectionId}/${sideBarItem.id}`
      );
    } else navigate(sideBarItem.id);
  };

  const selectedSideBarTab = location.pathname.split("/")[2];

  const maintenanceItems: SectionedItem = {
    id: "spares",
    title: "Spares",
    // @ts-ignore
    icon: FileTextOutlined,
    data: [
      {
        // @ts-ignore
        icon: FileDoneOutlined,
        id: "list",
        title: "Spares List",
      },
      {
        // @ts-ignore
        icon: FileDoneOutlined,
        id: "add",
        title: "Add Spares",
      },
    ],
  };

  const safetyRoutes: SectionedItem = {
    id: "safety",
    title: "Audits",
    // @ts-ignore
    icon: AuditOutlined,
    data: [
      {
        //@ts-ignore
        icon: AuditOutlined,
        id: "myGemba",
        title: "Mine",
      },
      {
        //@ts-ignore
        icon: AuditOutlined,
        id: "listInventories",
        title: "Inventories",
      },
      {
        //@ts-ignore
        icon: AuditOutlined,
        id: "listGovernment",
        title: "Government",
      },
    ],
  };

  const items: SectionedItem[] = [maintenanceItems, safetyRoutes];

  const ProfileObject = {
    displayName: mail.split("@")[0],
    avatar: mail.split("@")[0],
  };

  const onNavMenuIconClick = (a: NavMenuIconState) => {
    setCollapsed(a === NavMenuIconState.COLLAPSED);
  };

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <TIISideBar
        collapsed={collapsed}
        onItemClick={onSideBarItemClick}
        items={items}
        onLogoClick={() => navigate(`/`)}
        // @ts-ignore
        logo={AuditOutlined}
        selectedItemId={selectedSideBarTab}
      />
      <Layout>
        <Header
          onSignOutClick={onSignOutClick}
          onNavMenuIconClick={onNavMenuIconClick}
          profile={ProfileObject}
          navMenuIconState={NavMenuIconState.EXPANDED}
        />
        <Content
          style={{
            margin: "24px 16px",
            height: "100vh",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <RootRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

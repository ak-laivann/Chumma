import { RootRouter } from "../Router";
import { useContext, useState } from "react";
import { UserContext } from "@tii/ui-core-framework";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AuditOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
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

  // the selected side bar tab is the id of the menu item, that should be passed to the sidebar so as to get it highlighted
  const selectedSideBarTab = location.pathname.split("/")[6];

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
        icon: FileTextOutlined,
        id: "add",
        title: "Add Spares",
      },
    ],
  };

  const safetyRoutes: SectionedItem = {
    id: "audits",
    title: "Audits",
    // @ts-ignore
    icon: AuditOutlined,
    data: [
      {
        //@ts-ignore
        icon: AuditOutlined,
        id: "all",
        title: "List",
      },
      {
        //@ts-ignore
        icon: AuditOutlined,
        id: "new",
        title: "New Audit",
      },
      {
        //@ts-ignore
        icon: UploadOutlined,
        id: "upload",
        title: "Upload",
      },
      {
        //@ts-ignore
        icon: UploadOutlined,
        id: "mine",
        title: "Mine",
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

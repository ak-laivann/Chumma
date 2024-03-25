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
import { Layout } from "antd";
import { SectionedItem, SideBarItem, TIISideBar } from "@tii/components";
const { Content } = Layout;

const onContactClick = () => {
  window.open("mailto:ananthakrishnan@tii.murugappa.com");
};

const onSignOutClick = () => {
  console.log("signed out");
};

export const HomeContainer = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const onSideBarItemClick = (
    sectionId: string,
    sideBarItem: SideBarItem
  ): void => {
    navigate(sideBarItem.id);
  };

  const selectedSideBarTab = location.pathname.split("/")[1];

  const items: SectionedItem[] = [];
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <TIISideBar
        collapsed={collapsed}
        onItemClick={onSideBarItemClick}
        items={items}
        onContactClick={onContactClick}
        onLogoClick={() => navigate(`/`)}
        logo={<AuditOutlined />}
        selectedItemId={selectedSideBarTab}
      />
      <Layout>
        <Layout.Header />
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

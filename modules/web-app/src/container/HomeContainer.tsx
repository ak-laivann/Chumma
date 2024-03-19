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

const onContactClick = () => {
  window.open("mailto:ananthakrishnan@tii.murugappa.com");
};

const onSignOutClick = () => {
  console.log("signed out");
};

export const HomeContainer = () => {
  const { mail, buId, id } = useContext(UserContext);
  const navigate = useNavigate();

  const { Content } = Layout;
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Layout.Sider />
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

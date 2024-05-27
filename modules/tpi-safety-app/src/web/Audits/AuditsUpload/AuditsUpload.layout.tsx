import React from "react";
import { UploadAuditFile } from "@tii/components";
import { UploadOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { AuditFileUploadPageProps } from "./AuditsUpload.df";
import Marquee from "react-fast-marquee";

export const AuditFileUpload: React.FC<AuditFileUploadPageProps> = React.memo(
  (props: AuditFileUploadPageProps) => {
    return (
      <>
        <Alert
          type="info"
          message={
            <Marquee pauseOnHover gradient={false}>
              Upload the audit excel file to be processed and added in the
              listing. The excel file should have only one sheet or if many
              sheets are present the audit observations should be in the first
              sheet &emsp;
            </Marquee>
          }
          banner={true}
        />
        <br />

        <UploadAuditFile
          uploadBtnProps={{
            icon: <UploadOutlined />,
            onSubmitClick: (input) => {
              props.onFileUpload(input);
            },
            text: "Upload",
          }}
        />
      </>
    );
  }
);

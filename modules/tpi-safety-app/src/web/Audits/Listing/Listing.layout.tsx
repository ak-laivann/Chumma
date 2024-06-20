import React, { useState } from "react";
import { AuditListingPageProps } from "./Listing.df";
import { Tabs } from "antd";
import { AuditsTable, AuditStatus } from "@tii/components";

export const AuditOwnershipListingLayout: React.FunctionComponent<
  AuditListingPageProps
> = (props: AuditListingPageProps) => {
  const [activeTab, setActiveTab] = useState<string>(AuditStatus.ASSIGNED);

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      <Tabs activeKey={activeTab} onChange={onTabChange}>
        <Tabs.TabPane tab={AuditStatus.ASSIGNED} key={AuditStatus.ASSIGNED}>
          <props.assignedResponse.Wrapper>
            <AuditsTable {...props.assignedResponse.getResponse()!} />
          </props.assignedResponse.Wrapper>
        </Tabs.TabPane>
        <Tabs.TabPane tab={AuditStatus.CLOSED} key={AuditStatus.CLOSED}>
          <props.closedResponse.Wrapper>
            <AuditsTable {...props.closedResponse.getResponse()!} />
          </props.closedResponse.Wrapper>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={AuditStatus.IN_PROGRESS}
          key={AuditStatus.IN_PROGRESS}
        >
          <props.progressResponse.Wrapper>
            <AuditsTable {...props.progressResponse.getResponse()!} />
          </props.progressResponse.Wrapper>
        </Tabs.TabPane>
        <Tabs.TabPane tab={AuditStatus.OPEN} key={AuditStatus.OPEN}>
          <props.openResponse.Wrapper>
            <AuditsTable {...props.openResponse.getResponse()!} />
          </props.openResponse.Wrapper>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={AuditStatus.PENDING_VERIFICATION}
          key={AuditStatus.PENDING_VERIFICATION}
        >
          <props.verifyResponse.Wrapper>
            <AuditsTable {...props.verifyResponse.getResponse()!} />
          </props.verifyResponse.Wrapper>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={AuditStatus.RE_ASSIGNED}
          key={AuditStatus.RE_ASSIGNED}
        >
          <props.reassignedResponse.Wrapper>
            <AuditsTable {...props.reassignedResponse.getResponse()!} />
          </props.reassignedResponse.Wrapper>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

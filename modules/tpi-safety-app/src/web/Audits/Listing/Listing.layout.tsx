import React, { useState } from "react";
import { AuditListingPageProps } from "./Listing.df";
import { Segmented, Tabs } from "antd";
import {
  AuditsTable,
  AuditStatus,
  AuditTypes,
  FilterBar,
  NumberTypeFilter,
} from "@tii/components";
import {
  ContactsTwoTone,
  HomeTwoTone,
  ReconciliationTwoTone,
  SecurityScanTwoTone,
  SlidersTwoTone,
  TrophyTwoTone,
} from "@ant-design/icons";

const iconSize = { fontSize: "22px" };

export const AuditOwnershipListingLayout: React.FunctionComponent<
  AuditListingPageProps
> = (props: AuditListingPageProps) => {
  const [activeTab, setActiveTab] = useState<string>(AuditStatus.ASSIGNED);
  const [activeSegment, setActiveSegment] = useState<string>("all");

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      <Segmented
        size="large"
        options={[
          {
            label: "All",
            value: "all",
            icon: <SlidersTwoTone style={iconSize} twoToneColor={"green"} />,
          },
          {
            label: "Leadership",
            value: "leadership",
            icon: <TrophyTwoTone style={iconSize} twoToneColor="red" />,
          },
          {
            label: "Safety",
            value: "safety",
            icon: (
              <SecurityScanTwoTone style={iconSize} twoToneColor="violet" />
            ),
          },
          {
            label: "Internal",
            value: "internal",
            icon: <HomeTwoTone style={iconSize} twoToneColor="blue" />,
          },
          {
            label: "ISO",
            value: "iso",
            icon: (
              <ReconciliationTwoTone style={iconSize} twoToneColor="#fc9105" />
            ),
          },
          {
            label: "External",
            value: "external",
            icon: <ContactsTwoTone style={iconSize} twoToneColor="#5d04bd" />,
          },
        ]}
        defaultValue={"all"}
        block
        onChange={(val) => {
          setActiveSegment(val.toString());
          props.onSearch({ type: val.toString() });
        }}
      />
      <br />
      <FilterBar
        fields={[
          { id: "auditorName", name: "Auditor Name", type: "string" },
          { id: "zone", name: "Zone", type: "number" },
          { id: "department", name: "Department", type: "string" },
          { id: "responsibility", name: "Responsibility", type: "string" },
          { id: "overdue", name: "Overdue", type: "numberRange" },
          { id: "target", name: "Target Date", type: "dateRange" },
          { id: "auditDate", name: "Audit Date", type: "dateRange" },
        ]}
        onSearch={(val) => (
          console.log("val =>", val),
          props.onSearch({
            auditDateEndDate: val.auditEndDate as string,
            auditDateStartDate: val.auditStartDate as string,
            auditorName: val.auditorName as string,
            zone: (val.zone as NumberTypeFilter).value,
            responsibility: val.responsibility as string,
            department: val.department as string,
            //@ts-ignore
            overdueStart: (val.overdue as object).start as string,
            // @ts-ignore
            overdueEnd: (val.overdue as object)["end"] as string,
            targetEndDate: val.targetEndDate as string,
            targetStartDate: val.targetStartDate as string,
            type: activeSegment,
          })
        )}
      />
      <br />
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

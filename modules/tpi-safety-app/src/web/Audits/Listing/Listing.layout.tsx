import React from "react";
import { AuditListingPageProps } from "./Listing.df";
import { Tabs } from "antd";
import { AuditsTable } from "@tii/components";

export const AuditOwnershipListingLayout: React.FunctionComponent<
  AuditListingPageProps
> = (props: AuditListingPageProps) => {
  return (
    <>
      <Tabs tabBarExtraContent={{}}>
        <Tabs.TabPane>
          <props.listingResponse.Wrapper>
            <AuditsTable {...props.listingResponse.getResponse()!} />
          </props.listingResponse.Wrapper>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

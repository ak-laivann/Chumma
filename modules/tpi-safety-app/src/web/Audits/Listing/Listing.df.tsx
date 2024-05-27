import {
  useMultiListingQuery,
  UseListingResponseType,
} from "@tii/ui-core-framework";
import { AsyncGetUI, useAsyncGetUI } from "@tii/components";
import { useState } from "react";
import {
  AuditOwnershipListingResponse,
  GetAuditOwnershipListingDAO,
} from "../../../dao";

export interface AuditListingPageProps {
  listingResponse: AsyncGetUI<
    UseListingResponseType<AuditOwnershipListingResponse>
  >;
  onSearch: (searchParams: any) => void;
}

export const AuditListingDataFetcher = (): AuditListingPageProps => {
  const [filterValues, setFilterValues] = useState<any>(undefined);

  const auditListingResponseData = useMultiListingQuery<
    AuditOwnershipListingResponse,
    GetAuditOwnershipListingDAO
  >(GetAuditOwnershipListingDAO, 1, 10, [{ queryId: "all" }]);
  return {
    listingResponse: useAsyncGetUI(auditListingResponseData.all),
    onSearch: (searchParams) => {
      console.log("search params = ", searchParams);
      setFilterValues(searchParams);
    },
  };
};

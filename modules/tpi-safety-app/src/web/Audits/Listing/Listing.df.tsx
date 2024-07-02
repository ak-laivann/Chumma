import {
  useMultiListingQuery,
  UseListingResponseType,
} from "@tii/ui-core-framework";
import {
  AsyncGetUI,
  Audit,
  AuditStatus,
  AuditTypes,
  useAsyncGetUI,
} from "@tii/components";
import { useState } from "react";
import {
  AuditOwnershipListingResponse,
  GetAuditOwnershipListingDAO,
} from "../../../dao";

interface AuditListingSearch {
  auditorName?: string;
  zone?: number;
  department?: string;
  responsibility?: string;
  overdueStart?: string;
  overdueEnd?: string;
  targetStartDate?: string;
  targetEndDate?: string;
  auditDateStartDate?: string;
  auditDateEndDate?: string;
  type?: string;
}

export interface AuditListingPageProps {
  assignedResponse: AsyncGetUI<
    UseListingResponseType<AuditOwnershipListingResponse>
  >;
  closedResponse: AsyncGetUI<
    UseListingResponseType<AuditOwnershipListingResponse>
  >;
  reassignedResponse: AsyncGetUI<
    UseListingResponseType<AuditOwnershipListingResponse>
  >;
  openResponse: AsyncGetUI<
    UseListingResponseType<AuditOwnershipListingResponse>
  >;
  progressResponse: AsyncGetUI<
    UseListingResponseType<AuditOwnershipListingResponse>
  >;
  verifyResponse: AsyncGetUI<
    UseListingResponseType<AuditOwnershipListingResponse>
  >;
  onSearch: (searchParams: AuditListingSearch) => void;
}

const toCamelCase = (str: string) => {
  return str
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1).toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

const auditStatuses = Object.values(AuditStatus).map(toCamelCase);

export const AuditListingDataFetcher = (): AuditListingPageProps => {
  const [filterValues, setFilterValues] = useState<
    AuditListingSearch | undefined
  >(undefined);

  const auditListingResponseData = useMultiListingQuery<
    AuditOwnershipListingResponse,
    GetAuditOwnershipListingDAO
  >(
    GetAuditOwnershipListingDAO,
    1,
    10,
    auditStatuses.map((i) => {
      return {
        queryId: i,
        ...filterValues,
      };
    })
  );
  return {
    assignedResponse: useAsyncGetUI(auditListingResponseData.assigned),
    closedResponse: useAsyncGetUI(auditListingResponseData.closed),
    openResponse: useAsyncGetUI(auditListingResponseData.open),
    verifyResponse: useAsyncGetUI(auditListingResponseData.pendingVerification),
    reassignedResponse: useAsyncGetUI(auditListingResponseData.reAssigned),
    progressResponse: useAsyncGetUI(auditListingResponseData.inProgress),
    onSearch: (searchParams) => {
      setFilterValues(searchParams);
    },
  };
};

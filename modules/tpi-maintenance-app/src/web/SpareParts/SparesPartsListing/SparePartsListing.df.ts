import {
  useMultiListingQuery,
  UseListingResponseType,
} from "@tii/ui-core-framework";
import { SearchSparesDAO, SparePartsResponse } from "../../../dao";
import { AsyncGetUI, useAsyncGetUI } from "@tii/components";
import { useState } from "react";

export interface SparesListingProps {
  sparesResponse: AsyncGetUI<UseListingResponseType<SparePartsResponse>>;
  onSearch: (searchParams: any) => void;
}

export const SparesListingDataFetcher = (): SparesListingProps => {
  const [filterValues, setFilterValues] = useState<any>(undefined);

  console.log("insid the listing datafetcher");
  const sparesListingResponseData = useMultiListingQuery<
    SparePartsResponse,
    SearchSparesDAO
  >(SearchSparesDAO, 1, 10, [{ queryId: "maintenanceSpares" }]);

  return {
    sparesResponse: useAsyncGetUI(sparesListingResponseData.maintenanceSpares),
    onSearch: (searchParams) => {
      console.log("search params = ", searchParams);
      setFilterValues(searchParams);
    },
  };
};

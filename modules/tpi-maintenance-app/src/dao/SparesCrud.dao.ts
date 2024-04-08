import {
  InternalAxiosInstance,
  generateCRUDHooks,
  AsyncRequest,
  MultiListingDaoOutput,
} from "@tii/ui-core-framework";
import { QueryObserverOptions } from "@tanstack/react-query";
import { Spare } from "@tii/components";

export const {
  useGetHook: useGetSpareHook,
  usePostHook: usePostSpareHook,
  usePutHook: usePutSpareHook,
} = generateCRUDHooks<Spare>("spares", InternalAxiosInstance, true);

export interface SparePartsResponse {
  total: number;
  records: Spare[];
}

export class SearchSparesDAO extends AsyncRequest<
  MultiListingDaoOutput<SparePartsResponse>
> {
  private readonly contentFrom: number;
  constructor(
    private readonly pageNumber: number,
    private readonly pageSize: number,
    private readonly queryParam: object
  ) {
    super();
    this.contentFrom = (this.pageNumber - 1) * this.pageSize;
  }

  getConfig = (): QueryObserverOptions<any, Error> => {
    return {
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      enabled: true,
    };
  };

  getAsyncFunction = async (): Promise<
    MultiListingDaoOutput<SparePartsResponse>
  > => {
    console.log("inside the listing dao");
    let url = "/usePostToMultiSearch/spares";

    const res = await InternalAxiosInstance.post(url, this.queryParam, {
      params: {
        from: this.contentFrom,
        size: this.pageSize,
      },
      headers: {
        useMirage: true,
      },
    });
    return res.data;
  };

  getCacheKey = (): string[] => {
    return [
      "searchSpares",
      this.contentFrom.toString(),
      this.pageSize.toString(),
      this.pageNumber.toString(),
      JSON.stringify(this.queryParam),
    ];
  };
}

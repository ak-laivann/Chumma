import { QueryObserverOptions } from "@tanstack/react-query";
import { Audit } from "@tii/components";
import {
  AsyncRequest,
  MultiListingDaoOutput,
  InternalAxiosInstance,
} from "@tii/ui-core-framework";

export interface AuditOwnershipListingResponse {
  total: number;
  records: Audit[];
}

export class GetAuditOwnershipListingDAO extends AsyncRequest<
  MultiListingDaoOutput<AuditOwnershipListingResponse>
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
    MultiListingDaoOutput<AuditOwnershipListingResponse>
  > => {
    let url = "/usePostToMultiSearch/audits";

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
      "listOwnership",
      this.contentFrom.toString(),
      this.pageSize.toString(),
      this.pageNumber.toString(),
      JSON.stringify(this.queryParam),
    ];
  };
}

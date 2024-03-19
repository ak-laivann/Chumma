import { Spare, useAsyncPostAndPutUI } from "@tii/components";
import {
  AsyncGetAndPutUI,
  AsyncPostAndPutUI,
  useAsyncGetAndPutUI,
} from "@tii/components";
import { useGetSpareHook, usePostSpareHook, usePutSpareHook } from "../../dao";
import { useParams } from "react-router-dom";

export interface SparesFormLayoutProps {
  asyncSparesUI: AsyncGetAndPutUI<Spare> | AsyncPostAndPutUI<Spare>;
}

export const AddSparesDataFetcher = (): SparesFormLayoutProps => {
  return {
    asyncSparesUI: useAsyncPostAndPutUI<Spare>(
      usePostSpareHook(),
      usePutSpareHook()
    ),
  };
};

export const ViewSparesDataFetcher = (): SparesFormLayoutProps => {
  const { spareId, departmentId } = useParams();
  return {
    asyncSparesUI: useAsyncGetAndPutUI<Spare>(
      useGetSpareHook(`tii.tpi.maintenance.${departmentId}`, spareId),
      usePutSpareHook()
    ),
  };
};

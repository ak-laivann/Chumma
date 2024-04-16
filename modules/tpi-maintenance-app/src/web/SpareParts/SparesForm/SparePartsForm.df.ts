import { Spare, useAsyncPostAndPutUI } from "@tii/components";
import {
  AsyncGetAndPutUI,
  AsyncPostAndPutUI,
  useAsyncGetAndPutUI,
} from "@tii/components";
import {
  useGetSpareHook,
  usePostSpareHook,
  usePutSpareHook,
} from "../../../dao";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@tii/ui-core-framework";

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
  const { buId, departmentId } = useContext(UserContext);
  const { spareId } = useParams();
  return {
    asyncSparesUI: useAsyncGetAndPutUI<Spare>(
      useGetSpareHook(`tii_${buId}_${departmentId}`, spareId),
      usePutSpareHook()
    ),
  };
};

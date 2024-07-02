import {
  Audit,
  useAsyncPostAndPutUI,
  useAsyncGetAndPutUI,
  AsyncGetAndPutUI,
  AsyncPostAndPutUI,
} from "@tii/components";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@tii/ui-core-framework";
import {
  useGetAuditHook,
  usePostAuditHook,
  usePutAuditHook,
} from "../../../dao";

export interface AuditFormLayoutProps {
  asyncAuditUI: AsyncGetAndPutUI<Audit> | AsyncPostAndPutUI<Audit>;
}

export const AddAuditsDataFetcher = (): AuditFormLayoutProps => {
  return {
    asyncAuditUI: useAsyncPostAndPutUI<Audit>(
      usePostAuditHook(),
      usePutAuditHook()
    ),
  };
};

export const ViewAuditsDataFetcher = (): AuditFormLayoutProps => {
  const { buId, departmentId } = useContext(UserContext);
  const { auditId } = useParams();
  return {
    asyncAuditUI: useAsyncGetAndPutUI<Audit>(
      useGetAuditHook(`tii_${buId}_${departmentId}`, auditId),
      usePutAuditHook()
    ),
  };
};

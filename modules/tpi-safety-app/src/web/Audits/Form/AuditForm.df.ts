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

export interface AuditFormAccessProps {
  showCorrectedImage: boolean;
  disabled: boolean;
}

export interface AuditFormLayoutProps extends AuditFormAccessProps {
  asyncAuditUI: AsyncGetAndPutUI<Audit> | AsyncPostAndPutUI<Audit>;
}

export const AddAuditsDataFetcher = (
  props: AuditFormAccessProps
): AuditFormLayoutProps => {
  return {
    asyncAuditUI: useAsyncPostAndPutUI<Audit>(
      usePostAuditHook(),
      usePutAuditHook()
    ),
    ...props,
  };
};

export const ViewAuditsDataFetcher = (
  props: AuditFormAccessProps
): AuditFormLayoutProps => {
  const { buId, departmentId } = useContext(UserContext);
  const { auditId } = useParams();
  return {
    asyncAuditUI: useAsyncGetAndPutUI<Audit>(
      useGetAuditHook(`tii_${buId}_${departmentId}`, auditId),
      usePutAuditHook()
    ),
    ...props,
  };
};

import { Route, Routes } from "react-router-dom";
import {
  AuditFileUpload,
  AddAuditFileUploadDataFetcher,
  AuditFileUploadPageProps,
  AuditListingDataFetcher,
  AuditListingPageProps,
  AuditOwnershipListingLayout,
  AddAuditsDataFetcher,
  AuditFormLayoutProps,
  AuditFormLayout,
  ViewAuditsDataFetcher,
  AuditFormAccessProps,
} from "../web";
import { UserContext, attachAsyncDataWithLayout } from "@tii/ui-core-framework";
import { useContext } from "react";

export const SafetyRoutes = () => {
  const { departmentId } = useContext(UserContext);
  console.log("inside the safety routes");

  const AuditFileUploadPage =
    attachAsyncDataWithLayout<AuditFileUploadPageProps>("auditUpload")(
      AddAuditFileUploadDataFetcher
    )(AuditFileUpload);

  const AuditListingPage = attachAsyncDataWithLayout<AuditListingPageProps>(
    "auditListing"
  )(AuditListingDataFetcher)(AuditOwnershipListingLayout);

  const NewAuditPage = attachAsyncDataWithLayout<
    AuditFormLayoutProps,
    AuditFormAccessProps
  >("createAudit")(AddAuditsDataFetcher)(AuditFormLayout);

  const ViewAuditPage = attachAsyncDataWithLayout<
    AuditFormLayoutProps,
    AuditFormAccessProps
  >("viewAudit")(ViewAuditsDataFetcher)(AuditFormLayout);
  return (
    <Routes>
      <Route path="upload" element={<AuditFileUploadPage />} />
      <Route path="all" element={<AuditListingPage />} />
      <Route
        path="new"
        // if need be, the disabled and corrected image can be shown based on the user access
        element={<NewAuditPage disabled={false} showCorrectedImage={false} />}
      />
      <Route
        path=":auditId/view"
        // if need be, the disabled and corrected image can be shown based on the user access
        element={<ViewAuditPage disabled={true} showCorrectedImage={true} />}
      />
    </Routes>
  );
};

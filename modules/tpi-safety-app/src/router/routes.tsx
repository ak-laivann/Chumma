import { Navigate, Route, Routes } from "react-router-dom";
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
} from "../web";
import { attachAsyncDataWithLayout } from "@tii/ui-core-framework";

export const SafetyRoutes = () => {
  console.log("inside the safety routes");

  const AuditFileUploadPage =
    attachAsyncDataWithLayout<AuditFileUploadPageProps>("auditUpload")(
      AddAuditFileUploadDataFetcher
    )(AuditFileUpload);

  const AuditListingPage = attachAsyncDataWithLayout<AuditListingPageProps>(
    "auditListing"
  )(AuditListingDataFetcher)(AuditOwnershipListingLayout);

  const NewAuditPage =
    attachAsyncDataWithLayout<AuditFormLayoutProps>("createAudit")(
      AddAuditsDataFetcher
    )(AuditFormLayout);

  const ViewAuditPage = attachAsyncDataWithLayout<AuditFormLayoutProps>(
    "viewAudit"
  )(ViewAuditsDataFetcher)(AuditFormLayout);
  return (
    <Routes>
      <Route path="upload" element={<AuditFileUploadPage />} />
      <Route path="all" element={<AuditListingPage />} />
      <Route path="new" element={<NewAuditPage />} />
      <Route path=":auditId/view" element={<ViewAuditPage />} />
    </Routes>
  );
};

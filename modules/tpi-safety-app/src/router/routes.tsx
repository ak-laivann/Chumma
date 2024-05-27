import { Navigate, Route, Routes } from "react-router-dom";
import {
  AuditFileUpload,
  AddAuditFileUploadDataFetcher,
  AuditFileUploadPageProps,
  AuditListingDataFetcher,
  AuditListingPageProps,
  AuditOwnershipListingLayout,
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
  return (
    <Routes>
      <Route path="upload" element={<AuditFileUploadPage />} />
      <Route path="all" element={<AuditListingPage />} />
    </Routes>
  );
};

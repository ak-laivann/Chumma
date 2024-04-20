import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { attachAsyncDataWithLayout } from "@tii/ui-core-framework";
import {
  AddSparesDataFetcher,
  SparesFormLayout,
  SparesFormLayoutProps,
  SparesListingDataFetcher,
  SparesListingProps,
  SparesListingLayout,
  ViewSparesDataFetcher,
} from "../web";

export const MaintenanceRoutes = () => {
  const SparePartAdditionPage =
    attachAsyncDataWithLayout<SparesFormLayoutProps>("Adding New Spares Page")(
      AddSparesDataFetcher
    )(SparesFormLayout);

  const SparePartViewPage = attachAsyncDataWithLayout<SparesFormLayoutProps>(
    "Viewing Spare Page"
  )(ViewSparesDataFetcher)(SparesFormLayout);

  const SparePartsListingPage = attachAsyncDataWithLayout<SparesListingProps>(
    "Listing the Spares"
  )(SparesListingDataFetcher)(SparesListingLayout);
  return (
    <Routes>
      <Route index path="list" element={<SparePartsListingPage />} />
      <Route path="add" element={<SparePartAdditionPage />} />
      <Route path=":spareId/view" element={<SparePartViewPage />} />
    </Routes>
  );
};

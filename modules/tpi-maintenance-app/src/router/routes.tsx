import { Navigate, Route, Routes, useNavigate } from "react-router";
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
      <Route index element={<Navigate to={"spares"} />} />
      <Route path="spares/list" element={<SparePartsListingPage />} />
      <Route path="spares/add" element={<SparePartAdditionPage />} />
      <Route path="spares/:spareId/view" element={<SparePartViewPage />} />
    </Routes>
  );
};

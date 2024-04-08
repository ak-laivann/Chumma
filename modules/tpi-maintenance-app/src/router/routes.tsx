import { Navigate, Route, Routes, useNavigate } from "react-router";
import { attachHandlers } from "@tii/ui-core-framework";
import {
  AddSparesDataFetcher,
  SparesFormLayout,
  SparesFormLayoutProps,
  SparesListingDataFetcher,
  SparesListingProps,
  SparesListingLayout,
} from "../web";

export const MaintenanceRoutes = () => {
  const SparePartAdditionPage = attachHandlers<SparesFormLayoutProps>(
    "Adding New Spares Page"
  )(AddSparesDataFetcher)(SparesFormLayout);

  const SparePartsListingPage = attachHandlers<SparesListingProps>(
    "Listing the Spares"
  )(SparesListingDataFetcher)(SparesListingLayout);
  console.log("inside maintenance routes");
  return (
    <Routes>
      <Route index element={<Navigate to={"listSpares/"} />} />
      <Route path="listSpares" element={<SparePartsListingPage />} />
      <Route path="addSpare" element={<SparePartAdditionPage />} />
    </Routes>
  );
};

import { Navigate, Route, Routes, useNavigate } from "react-router";
import { attachHandlers } from "@tii/ui-core-framework";
import {
  AddSparesDataFetcher,
  SparesFormLayout,
  SparesFormLayoutProps,
} from "../web/SpareParts";

export const MaintenanceRoutes = () => {
  const SparePartAdditionPage = attachHandlers<SparesFormLayoutProps>(
    "Adding New Spares Page"
  )(AddSparesDataFetcher)(SparesFormLayout);
  console.log("inside maintenance routes");
  return (
    <Routes>
      <Route index element={<Navigate to={"add"} />} />
      <Route path="/add" element={<SparePartAdditionPage />} />
    </Routes>
  );
};

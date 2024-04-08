import { Navigate, Route, Routes } from "react-router-dom";
import { attachHandlers } from "@tii/ui-core-framework";
import { MaintenanceRoutes } from "@tii/tpi-maintenance-app";

export const RootRouter = () => {
  console.log("inside root router");
  return (
    <Routes>
      <Route index element={<Navigate to={"maintenance"} />} />
      <Route path="/maintenance/*" element={<MaintenanceRoutes />} />
    </Routes>
  );
};

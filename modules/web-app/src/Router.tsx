import { Route, Routes } from "react-router-dom";
import { MaintenanceRoutes } from "@tii/tpi-maintenance-app";
import { SafetyRoutes } from "@tii/tpi-safety-app";
import { MathGame } from "@tii/tpi-common";

export const RootRouter = () => {
  return (
    <Routes>
      <Route
        path={`bu/:buId/departments/:departmentId/spares/*`}
        element={<MaintenanceRoutes />}
      />
      <Route
        path={`bu/:buId/departments/:departmentId/audits/*`}
        element={<SafetyRoutes />}
      />
      <Route
        path={`bu/:buId/departments/:departmentId/learn/*`}
        element={<MathGame />}
      />
    </Routes>
  );
};

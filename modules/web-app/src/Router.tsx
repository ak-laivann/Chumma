import { Route, Routes } from "react-router-dom";
import { MaintenanceRoutes } from "@tii/tpi-maintenance-app";
import { useContext } from "react";
import { UserContext } from "@tii/ui-core-framework";

export const RootRouter = () => {
  const { departmentId } = useContext(UserContext);
  const Children =
    departmentId === "maintenance" ? <MaintenanceRoutes /> : <></>;
  return (
    <Routes>
      <Route path={`bu/:buId/departments/:departmentId/*`} element={Children} />
    </Routes>
  );
};

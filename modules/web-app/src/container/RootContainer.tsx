import { HomeContainer } from "./HomeContainer";
import { Route, Routes } from "react-router";

export const RootContainer = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<HomeContainer />} />
        <Route index element={<HomeContainer />} />
      </Routes>
    </>
  );
};

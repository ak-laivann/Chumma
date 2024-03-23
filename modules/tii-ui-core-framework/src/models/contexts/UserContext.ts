import React from "react";

export interface UserContextObject {
  mail: string;
  isSignedIn: boolean;
  buId: string;
  name: string;
  id: string;
  departmentId: string;
  categoryId: "MS" | "SS" | "Not Assigned";
}

export const UserContext = React.createContext<UserContextObject>({
  mail: "",
  isSignedIn: false,
  buId: "",
  name: "",
  id: "",
  departmentId: "",
  categoryId: "Not Assigned",
});

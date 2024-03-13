import React from "react";

export interface UserContextObject {
  mail: string;
  idToken: string;
  isSignedIn: boolean;
  buId: string;
  name?: string;
  id?: string;
  roles?: string[];
  feature?: string;
}

export const UserContext = React.createContext<UserContextObject>({
  mail: "",
  idToken: "",
  isSignedIn: false,
  buId: "",
  name: "",
  id: "",
  roles: [],
  feature: "",
});

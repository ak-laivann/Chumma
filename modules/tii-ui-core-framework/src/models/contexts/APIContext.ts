import React from "react";
import { AsyncResponse, LoaderProps } from "../apis";

export const APIContext = React.createContext<AsyncResponse<any>>(
  new LoaderProps("idle")
);

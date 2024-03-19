import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext, UserContextObject } from "@tii/ui-core-framework";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { RootContainer } from "./container/RootContainer";

const queryClient = new QueryClient();

function App() {
  let values: UserContextObject = {
    mail: "",
    idToken: "",
    isSignedIn: false,
    buId: "",
    name: "",
    id: "",
    roles: [],
    feature: "",
  };
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={values}>
        <ThemeProvider theme={{}}>
          <BrowserRouter>
            {
              (() => {
                return <RootContainer />;
              })() //IIFE
            }
          </BrowserRouter>
        </ThemeProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

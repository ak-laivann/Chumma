import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  InternalAxiosInstance,
  UserContext,
  UserContextObject,
  generateCRUDHooks,
} from "@tii/ui-core-framework";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { RootContainer } from "./container/RootContainer";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<any>(null);

  let values: UserContextObject = {
    mail: "ChellaGowtham@tii.murugappa.com",
    isSignedIn: false,
    buId: "tpi",
    name: "Chella Gowtham",
    id: "CG",
    categoryId: "MS",
    departmentId: "safety",
  };

  useEffect(() => {
    setUser({ ...values, isSignedIn: true });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* change the values to user afterwards */}
      <UserContext.Provider value={values}>
        {/* theme can be changed when required */}
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

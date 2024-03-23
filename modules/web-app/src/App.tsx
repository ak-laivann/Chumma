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
    mail: "",
    isSignedIn: false,
    buId: "",
    name: "",
    id: "",
    categoryId: "Not Assigned",
    departmentId: "",
  };

  useEffect(() => {
    setUser({ ...values, isSignedIn: true });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={user}>
        {/* theme can be changed when required, but as of now, we are using only the global style with dark mode */}
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

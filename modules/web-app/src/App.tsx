import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "@tii/ui-core-framework";

const queryClient = new QueryClient();

function App() {
  let values: UserContext = {
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
        {
          (() => {
            return (
              <>
                <>TPI ERP</>
              </>
            );
          })() //IIFE
        }
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

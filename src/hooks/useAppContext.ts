import { useContext } from "react";
import { AppContext, AppContextData } from "~contexts/AppContext";

// A simple hook to facilitate the access to the AppContext
// and permit components to subscribe to AppContext updates
function useAppContext(): AppContextData {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

export { useAppContext };

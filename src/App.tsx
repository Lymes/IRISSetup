import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Router } from "~routes/Router";
import { AppContextProvider } from "~contexts/AppContext";
import ThemeProvider from "~themes/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";

export const Router = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="#5E8D48"
        barStyle="light-content"
      />
      <AppStack />
    </NavigationContainer>
  );
};

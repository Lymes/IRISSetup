import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import Spinner from "~components/Spinner";
import SplashScreen from "react-native-splash-screen";
import { useNetInfo } from "@react-native-community/netinfo";

export const Router = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

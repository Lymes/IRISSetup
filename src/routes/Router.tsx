import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import Spinner from "~components/Spinner";
import SplashScreen from "react-native-splash-screen";
import { useNetInfo } from "@react-native-community/netinfo";

export const Router = () => {
  const netInfo = useNetInfo();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  console.log("network changed!");
  return (
    <NavigationContainer>
      {netInfo.type == "wifi" && netInfo.details.ssid !== null ? null : (
        <Spinner visible={true} textContent={"Please connect to WiFi..."} />
      )}
      <AppStack />
    </NavigationContainer>
  );
};

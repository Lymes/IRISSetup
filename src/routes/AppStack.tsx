import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BLEScreen from "~screens/BLE/BLEScreen";
import { RootStackParamList } from "~navigation/RootStackPrams";
import useTheme from "~hooks/useTheme";
import QRCoderScreen from "~screens/QRCode/QRCodeScreen";
import SetupScreen from "~screens/Setup/SetupScreen";
import Orientation from "react-native-orientation-locker";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppStack = () => {
  const theme = useTheme();
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <Stack.Navigator initialRouteName="QR">
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: theme.colors.headerTint,
            headerStyle: { backgroundColor: theme.colors.headerBackground },
          }}
          name="BLE"
          component={BLEScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "QR Code",
            headerShown: true,
            headerTintColor: theme.colors.headerTint,
            headerStyle: { backgroundColor: theme.colors.headerBackground },
          }}
          name="QR"
          component={QRCoderScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Setup",
            headerShown: true,
            headerTintColor: theme.colors.headerTint,
            headerStyle: { backgroundColor: theme.colors.headerBackground },
          }}
          name="Setup"
          component={SetupScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

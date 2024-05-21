import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BLEScreen from "~screens/BLE/BLEScreen";
import { RootStackParamList } from "~navigation/RootStackPrams";
import useTheme from "~hooks/useTheme";
import HomeScreen from "~screens/Home/HomeScreen";
import QRCoderScreen from "~screens/QRCode/QRCodeScreen";
import MonitoringScreen from "~screens/Monitoring/MonitoringScreen";
import NetworkConfigScreen from "~screens/NetworkConfig/NetworkConfigScreen";
import SetupScreen from "~screens/Setup/SetupScreen";
import Orientation from "react-native-orientation-locker";
import IfaceConfigScreen from "~screens/IfaceConfig/IfaceConfigScreen";
import { Button } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppStack = () => {
  const theme = useTheme();
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
            headerTintColor: theme.colors.headerTint,
            headerStyle: { backgroundColor: theme.colors.headerBackground },
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: theme.colors.headerTint,
            headerStyle: { backgroundColor: theme.colors.headerBackground },
          }}
          name="Monitoring"
          component={MonitoringScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Network",
            headerShown: true,
            headerTintColor: theme.colors.headerTint,
            headerStyle: { backgroundColor: theme.colors.headerBackground },
          }}
          name="NetworkConfig"
          component={NetworkConfigScreen}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: route.params.iface,
            headerShown: true,
            headerTintColor: theme.colors.headerTint,
            headerStyle: { backgroundColor: theme.colors.headerBackground },
            headerRight: () => <Button title="Apply" />,
          })}
          name="IfaceConfig"
          component={IfaceConfigScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Bluetooth",
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

import React, { useEffect } from "react";
import useTheme from "~hooks/useTheme";
import Orientation from "react-native-orientation-locker";
import { Image, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeIcon from "assets/images/home.png";
import LicenseIcon from "assets/images/license.png";
import NetworkIcon from "assets/images/network.png";
import MonitorIcon from "assets/images/monitor.png";
import BarBackground from "assets/images/tabbarback.png";
import { LicenseStackScreen } from "./LicenseStack";
import { HomeStackScreen } from "./HomeStack";
import { NetworkStackScreen } from "./NetworkStack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import { MonitorStackScreen } from "./MonitorStack";

const Tabs = createBottomTabNavigator<RootStackParamList>();

export const AppStack = () => {
  const theme = useTheme();
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "HomeStack":
              return (
                <Image
                  source={HomeIcon}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? theme.colors.secondary : "white",
                  }}
                />
              );
            case "LicenseStack":
              return (
                <Image
                  source={LicenseIcon}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? theme.colors.secondary : "white",
                  }}
                />
              );
            case "NetworkStack":
              return (
                <Image
                  source={NetworkIcon}
                  style={{
                    width: 30,
                    height: 25,
                    tintColor: focused ? theme.colors.secondary : "white",
                  }}
                />
              );
            case "MonitorStack":
              return (
                <Image
                  source={MonitorIcon}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? theme.colors.secondary : "white",
                  }}
                />
              );
            default:
              return null;
          }
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: "white",
        tabBarBackground: () => (
          <ImageBackground
            source={BarBackground}
            style={{ flex: 1, backgroundColor: "transparent" }}
          />
        ),
      })}
    >
      <Tabs.Screen name="HomeStack" component={HomeStackScreen} />
      <Tabs.Screen name="LicenseStack" component={LicenseStackScreen} />
      <Tabs.Screen name="NetworkStack" component={NetworkStackScreen} />
      <Tabs.Screen name="MonitorStack" component={MonitorStackScreen} />
    </Tabs.Navigator>

    // <Stack.Navigator initialRouteName="Home">
    //   <Stack.Group>
    //     <Stack.Screen
    //       options={{
    //         headerShown: false,
    //         headerTintColor: theme.colors.headerTint,
    //         headerStyle: { backgroundColor: theme.colors.headerBackground },
    //       }}
    //       name="Home"
    //       component={HomeScreen}
    //     />
    //     <Stack.Screen
    //       options={{
    //         headerShown: true,
    //         headerTintColor: theme.colors.headerTint,
    //         headerStyle: { backgroundColor: theme.colors.headerBackground },
    //       }}
    //       name="Monitoring"
    //       component={c}
    //     />
    //     <Stack.Screen
    //       options={{
    //         headerTitle: "Network",
    //         headerShown: true,
    //         headerTintColor: theme.colors.headerTint,
    //         headerStyle: { backgroundColor: theme.colors.headerBackground },
    //       }}
    //       name="NetworkConfig"
    //       component={NetworkConfigScreen}
    //     />
    //     <Stack.Screen
    //       options={({ route }) => ({
    //         title: route.params.iface,
    //         headerShown: true,
    //         headerTintColor: theme.colors.headerTint,
    //         headerStyle: { backgroundColor: theme.colors.headerBackground },
    //         headerRight: () => <Button title="Apply" />,
    //       })}
    //       name="IfaceConfig"
    //       component={IfaceConfigScreen}
    //     />
    //     <Stack.Screen
    //       options={{
    //         headerTitle: "Bluetooth",
    //         headerShown: true,
    //         headerTintColor: theme.colors.headerTint,
    //         headerStyle: { backgroundColor: theme.colors.headerBackground },
    //       }}
    //       name="BLE"
    //       component={BLEScreen}
    //     />
    //     <Stack.Screen
    //       options={{
    //         headerTitle: "QR Code",
    //         headerShown: true,
    //         headerTintColor: theme.colors.headerTint,
    //         headerStyle: { backgroundColor: theme.colors.headerBackground },
    //       }}
    //       name="QR"
    //       component={QRCoderScreen}
    //     />
    //     <Stack.Screen
    //       options={{
    //         headerTitle: "Setup",
    //         headerShown: true,
    //         headerTintColor: theme.colors.headerTint,
    //         headerStyle: { backgroundColor: theme.colors.headerBackground },
    //       }}
    //       name="Setup"
    //       component={SetupScreen}
    //     />
    //   </Stack.Group>
    // </Stack.Navigator>
  );
};

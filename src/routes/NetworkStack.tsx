import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, ImageBackground } from "react-native";
import { FromScreen, RootStackParamList } from "~navigation/RootStackPrams";
import BarBackground from "assets/images/tabbarback.png";
import NetworkConfigScreen from "~screens/NetworkConfig/NetworkConfigScreen";
import useTheme from "~hooks/useTheme";
import BLEScreen from "~screens/BLE/BLEScreen";
import IfaceConfigScreen from "~screens/IfaceConfig/IfaceConfigScreen";

const NetworkStack = createNativeStackNavigator<RootStackParamList>();

export const NetworkStackScreen = () => {
  const theme = useTheme();
  return (
    <NetworkStack.Navigator initialRouteName="BLE">
      <NetworkStack.Group>
        <NetworkStack.Screen
          options={{
            headerTitle: "SELECT IRIS DEVICE",
            headerShown: true,
            headerTintColor: theme.colors.secondary,
            headerBackground: () => (
              <ImageBackground
                source={BarBackground}
                style={{ flex: 1, backgroundColor: "transparent" }}
              />
            ),
          }}
          name="BLE"
          component={BLEScreen}
          initialParams={{ from: FromScreen.NetworkConfig }}
        />
        <NetworkStack.Screen
          name="NetworkConfig"
          component={NetworkConfigScreen}
          options={{
            title: "NETWORK",
            headerBackground: () => (
              <ImageBackground
                source={BarBackground}
                style={{ flex: 1, backgroundColor: "transparent" }}
              />
            ),
            headerTintColor: theme.colors.secondary,
          }}
        />
        <NetworkStack.Screen
          options={({ route }) => ({
            title: route.params.iface,
            headerShown: true,
            headerTintColor: theme.colors.secondary,
            headerBackground: () => (
              <ImageBackground
                source={BarBackground}
                style={{ flex: 1, backgroundColor: "transparent" }}
              />
            ),
            headerRight: () => (
              <Button title="Apply" color={theme.colors.secondary} />
            ),
          })}
          name="IfaceConfig"
          component={IfaceConfigScreen}
        />
      </NetworkStack.Group>
    </NetworkStack.Navigator>
  );
};

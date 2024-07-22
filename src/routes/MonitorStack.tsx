import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, ImageBackground } from "react-native";
import { FromScreen, RootStackParamList } from "~navigation/RootStackPrams";
import BarBackground from "assets/images/tabbarback.png";
import useTheme from "~hooks/useTheme";
import BLEScreen from "~screens/BLE/BLEScreen";
import MonitoringScreen from "~screens/Monitoring/MonitoringScreen";

const MonitorStack = createNativeStackNavigator<RootStackParamList>();

export const MonitorStackScreen = () => {
  const theme = useTheme();
  return (
    <MonitorStack.Navigator initialRouteName="BLE">
      <MonitorStack.Group>
        <MonitorStack.Screen
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
          initialParams={{ from: FromScreen.Monitoring }}
        />
        <MonitorStack.Screen
          name="Monitoring"
          component={MonitoringScreen}
          options={{
            title: "IRIS LOGS",
            headerTintColor: theme.colors.secondary,
            headerBackground: () => (
              <ImageBackground
                source={BarBackground}
                style={{ flex: 1, backgroundColor: "transparent" }}
              />
            ),
          }}
        />
      </MonitorStack.Group>
    </MonitorStack.Navigator>
  );
};

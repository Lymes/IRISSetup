import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ImageBackground } from "react-native";
import { FromScreen, RootStackParamList } from "~navigation/RootStackPrams";
import QRCoderScreen from "~screens/QRCode/QRCodeScreen";
import BarBackground from "assets/images/tabbarback.png";
import BLEScreen from "~screens/BLE/BLEScreen";
import useTheme from "~hooks/useTheme";
import SetupScreen from "~screens/Setup/SetupScreen";

const LicenseStack = createNativeStackNavigator<RootStackParamList>();
type LoginProps = NativeStackScreenProps<RootStackParamList, "LicenseStack">;

export const LicenseStackScreen = ({ navigation, route }: LoginProps) => {
  const theme = useTheme();
  return (
    <LicenseStack.Navigator initialRouteName="QR">
      <LicenseStack.Group>
        <LicenseStack.Screen
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
          initialParams={{ from: FromScreen.LicenseSetup }}
        />
        <LicenseStack.Screen
          name="QR"
          component={QRCoderScreen}
          options={{
            title: "SCAN QR CODE",
            headerBackground: () => (
              <ImageBackground
                source={BarBackground}
                style={{ flex: 1, backgroundColor: "transparent" }}
              />
            ),
            headerTintColor: theme.colors.secondary,
          }}
        />
        <LicenseStack.Screen
          options={{
            title: "SELECT IRIS LICENSE",
            headerBackground: () => (
              <ImageBackground
                source={BarBackground}
                style={{ flex: 1, backgroundColor: "transparent" }}
              />
            ),
            headerTintColor: theme.colors.secondary,
          }}
          name="Setup"
          component={SetupScreen}
        />
      </LicenseStack.Group>
    </LicenseStack.Navigator>
  );
};

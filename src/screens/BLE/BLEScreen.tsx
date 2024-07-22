import React from "react";
import { Linking, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FromScreen, RootStackParamList } from "~navigation/RootStackPrams";
import { styles } from "./BLEScreen.style";
import useThemedStyles from "~hooks/useThemedStyles";
import BLEScanner from "~components/BLEScanner/BLEScanner";
import { useAppContext } from "~hooks/useAppContext";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import LicenseCounter from "~components/LicenseViewer/LicenseCounter";

type LoginProps = NativeStackScreenProps<RootStackParamList, "BLE">;

export default function BLEScreen({ navigation, route }: LoginProps) {
  const style = useThemedStyles(styles);
  const { blePermissionsGranted } = useAppContext();
  return (
    <View style={style.container}>
      {route.params.from == FromScreen.LicenseSetup ? <LicenseCounter /> : null}
      <View style={style.box}>
        <Text style={style.description} numberOfLines={2}>
          {blePermissionsGranted
            ? "Scan and select IRIS device to connect"
            : "Please allow Nearby devices and re-lauch app"}
        </Text>
        {blePermissionsGranted ? (
          <BLEScanner
            onConnect={() => {
              switch (route.params.from) {
                case FromScreen.LicenseSetup:
                  navigation.navigate("Setup");
                  break;
                case FromScreen.Monitoring:
                  navigation.navigate("Monitoring");
                  break;
                case FromScreen.NetworkConfig:
                  navigation.navigate("NetworkConfig");
                  break;
              }
            }}
          />
        ) : (
          <PrimaryButton
            style={style.button}
            title="Settings"
            onPress={() => {
              Linking.openSettings();
            }}
          />
        )}
      </View>
    </View>
  );
}

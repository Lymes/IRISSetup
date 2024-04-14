import React from "react";
import { ImageBackground, Linking, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import { styles } from "./BLEScreen.style";
import useThemedStyles from "~hooks/useThemedStyles";
import BLEScanner from "~components/BLEScanner/BLEScanner";
import { useAppContext } from "~hooks/useAppContext";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import ble from "assets/images/ble_bg.png";
import LicenseCounter from "~components/LicenseViewer/LicenseCounter";

type LoginProps = NativeStackScreenProps<RootStackParamList, "BLE">;

export default function BLEScreen({ navigation }: LoginProps) {
  const style = useThemedStyles(styles);
  const { blePermissionsGranted } = useAppContext();
  return (
    <View style={style.container}>
      <ImageBackground
        source={ble}
        style={style.background}
        tintColor={"#0000aa22"}
      >
        <LicenseCounter />
        <View style={style.box}>
          <Text style={style.title}>Select IRIS</Text>
          <Text style={style.description} numberOfLines={2}>
            {blePermissionsGranted
              ? "Scan and select IRIS device to connect"
              : "Please allow Nearby devices and re-lauch app"}
          </Text>
          {blePermissionsGranted ? (
            <BLEScanner
              onConnect={() => {
                navigation.navigate("Setup");
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
      </ImageBackground>
    </View>
  );
}

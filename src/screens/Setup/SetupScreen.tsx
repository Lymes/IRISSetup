import React from "react";
import {
  Text,
  Keyboard,
  Linking,
  ImageBackground,
  View,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import useSetupScreenHooks from "./useSetupScreenHooks";
import InputText from "~components/Inputs/InputText";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import dsgw from "assets/images/dsgw_bg2.png";
import Spinner from "~components/Spinner";

type SetupProps = NativeStackScreenProps<RootStackParamList, "Setup">;

export default function SetupScreen({ navigation }: SetupProps) {
  const {
    wifiPermissions,
    ssid,
    cloudData,
    style,
    isSending,
    code,
    setCode,
    sendToIris,
  } = useSetupScreenHooks();

  return (
    <View style={style.safeContainer}>
      <ImageBackground
        source={dsgw}
        style={style.background}
        imageStyle={{ opacity: 0.4 }}
      >
        <View style={style.container}>
          <Text style={style.title}>IRIS setup recap:</Text>
          <View style={style.valueRow}>
            <Text style={style.ssidLabel}>Plant ID:</Text>
            <Text style={style.ssidValue}>
              {cloudData.plantID || "not found"}
            </Text>
          </View>
          <View style={style.valueRow}>
            <Text style={style.ssidLabel}>WiFi SSID:</Text>
            <Text style={style.ssidValue}>{ssid || "not found"}</Text>
          </View>
          {wifiPermissions === "granted" ? (
            <>
              <InputText
                value={code}
                style={style.credentialsInput}
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry={true}
                onChangeText={setCode}
              />
              <PrimaryButton
                style={style.sendButton}
                title="Send to IRIS"
                disabled={code === undefined || code.length < 8}
                onPress={async () => {
                  try {
                    Keyboard.dismiss();
                    await sendToIris();
                  } catch (error) {
                    Alert.alert("IRIS", `${error}`, [{ text: "OK" }]);
                  }
                }}
              />
            </>
          ) : (
            <>
              <Text style={style.description} numberOfLines={4}>
                Location permissions needed in order to get WiFi SSID. Please
                allow Location and re-lauch app
              </Text>
              <PrimaryButton
                style={style.sendButton}
                title="Settings"
                onPress={() => {
                  Linking.openSettings();
                }}
              />
            </>
          )}
        </View>
      </ImageBackground>
      <Spinner visible={isSending} textContent={"Sending..."} />
    </View>
  );
}

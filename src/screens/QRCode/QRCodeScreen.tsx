import React from "react";
import { Text, View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FromScreen, RootStackParamList } from "~navigation/RootStackPrams";
import QRScanner from "~components/QRScanner/QRScanner";
import InputText from "~components/Inputs/InputText";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import Spinner from "~components/Spinner";
import useQRCodeScreenHooks from "./useQRCodeScreenHooks";
import qr from "assets/images/qr_bg.png";
import LicenseCounter from "~components/LicenseViewer/LicenseCounter";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type QRProps = NativeStackScreenProps<RootStackParamList, "QR">;

export default function QRCoderScreen({ navigation }: QRProps) {
  const {
    style,
    isFocused,
    isSending,
    contextData,
    code,
    setCode,
    sendToCloud,
  } = useQRCodeScreenHooks();
  return (
    <View style={style.safeContainer}>
      <LicenseCounter />
      <KeyboardAwareScrollView
        style={style.container}
        enableOnAndroid={true}
        extraScrollHeight={200}
        extraHeight={40}
      >
        <QRScanner isActive={isFocused} onFound={setCode} />
        <Text style={style.description}>
          Scan or manually insert device code
        </Text>
        <InputText
          value={code}
          autoCapitalize="none"
          autoCorrect={false}
          style={style.codeInput}
          placeholder="Code"
          placeholderTextColor="grey"
          onChangeText={setCode}
        />
        <PrimaryButton
          style={style.sendButton}
          title="Register serial number"
          disabled={code === undefined || code.length === 0}
          onPress={() => {
            if (code != null) sendToCloud(code, navigation);
          }}
        />
        <PrimaryButton
          style={style.nextButton}
          disabled={contextData.cloudData.length === 0}
          title="Go to Configure screen"
          onPress={() => {
            navigation.navigate("BLE", { from: FromScreen.LicenseSetup });
          }}
        />
        <Spinner visible={isSending} textContent={"Registering..."} />
      </KeyboardAwareScrollView>
    </View>
  );
}

import React from "react";
import { KeyboardAvoidingView, Text, View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import QRScanner from "~components/QRScanner/QRScanner";
import InputText from "~components/Inputs/InputText";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import Spinner from "~components/Spinner";
import useQRCodeScreenHooks from "./useQRCodeScreenHooks";
import qr from "assets/images/qr_bg.png";

type QRProps = NativeStackScreenProps<RootStackParamList, "QR">;

export default function QRCoderScreen({ navigation }: QRProps) {
  const { style, isFocused, isSending, code, setCode, sendToCloud } =
    useQRCodeScreenHooks();
  return (
    <View style={style.safeContainer}>
      <Image source={qr} style={style.background} tintColor={"#0000aa22"} />
      <KeyboardAvoidingView style={style.container} behavior="position" enabled>
        <Text style={style.title}>Scan QR code</Text>
        <QRScanner isActive={isFocused} onFound={setCode} />
        <Text style={style.description}>or manually insert device code</Text>
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
          title="Send"
          disabled={code === undefined || code.length === 0}
          onPress={() => {
            sendToCloud(navigation);
          }}
        />
        <Spinner visible={isSending} textContent={"Sending..."} />
      </KeyboardAvoidingView>
    </View>
  );
}

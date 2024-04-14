import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./QRCoderScreen.style";
import { useState } from "react";
import { useAppContext } from "~hooks/useAppContext";
import { Alert, Keyboard } from "react-native";
import { cloudService } from "~services/cloudService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import { useIsFocused } from "@react-navigation/native";

export type QRNavigation = NativeStackNavigationProp<RootStackParamList, "QR">;

export default () => {
  const isFocused = useIsFocused();
  const style = useThemedStyles(styles);
  const [code, setCode] = useState<string | undefined>();
  const [isSending, setIsSending] = useState<boolean>(false);
  const { contextData, setContextData } = useAppContext();

  const sendToCloud = async (
    serialNumber: string,
    navigation: QRNavigation
  ) => {
    Keyboard.dismiss();
    setIsSending(true);
    try {
      let response = await cloudService.lockLicense(serialNumber);
      console.log("Cloud response:", response);

      if (response.payload != null) {
        let devices = contextData.cloudData;
        devices.push(response.payload);
        contextData.cloudData = devices;
        setContextData(contextData);
      } else {
        Alert.alert(
          "Cloud",
          `Cannot register device: ${response.errorMessage?.message}`,
          [{ text: "OK" }]
        );
      }
      console.log("context data length", contextData.cloudData.length);
      setIsSending(false);
      // if (cloudData.plantID !== undefined) {
      //   navigation.navigate("Setup");
      // }
    } catch (error) {
      setIsSending(false);
      Alert.alert("Cloud", `Cannot register device on Cloud: ${error}`, [
        { text: "OK" },
      ]);
    }
  };

  return {
    style,
    isFocused,
    isSending,
    contextData,
    code,
    setCode,
    sendToCloud,
  };
};

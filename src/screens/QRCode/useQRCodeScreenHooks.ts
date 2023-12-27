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
  const { cloudData } = useAppContext();

  const sendToCloud = async (navigation: QRNavigation) => {
    Keyboard.dismiss();
    cloudData.qrCode = code;
    setIsSending(true);
    try {
      let plant = await cloudService.getPlantID(
        cloudData.macAddress || "unknown",
        cloudData.publicKey || "unknown",
        cloudData.qrCode || "unknown"
      );
      console.log("PlantID:", plant);
      cloudData.plantID = plant?.plantID;
      setIsSending(false);
      if (cloudData.plantID !== undefined) {
        navigation.navigate("Setup");
      }
    } catch (error) {
      setIsSending(false);
      Alert.alert("Cloud", `Cannot register device on Cloud: ${error}`, [
        { text: "OK" },
      ]);
    }
  };

  return { style, isFocused, isSending, code, setCode, sendToCloud };
};

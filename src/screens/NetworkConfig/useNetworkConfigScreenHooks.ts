import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./NetworkConfigScreen.style";
import { RootStackParamList } from "~navigation/RootStackPrams";
import { bleService } from "~services/bleService";
import { NetworkConfig } from "~contexts/NetworkConfig";
import { useMemo, useState } from "react";
import { useAppContext } from "~hooks/useAppContext";

export type HomeNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default () => {
  const style = useThemedStyles(styles);
  const { contextData, setContextData, peripheral } = useAppContext();
  const [isSending, setIsSending] = useState<boolean>(false);

  const readFromIris = async () => {
    if (peripheral === undefined) return;
    setIsSending(true);
    if (!(await bleService.connect(peripheral))) {
      setIsSending(false);
      throw new Error("Cannot connect to peripheral");
    }
    if (
      !(await bleService.findServices(peripheral, [bleService.serviceUUID]))
    ) {
      setIsSending(false);
      throw new Error("Cannot find service");
    }

    const netConfStr =
      (await bleService.read(
        peripheral,
        bleService.serviceUUID,
        bleService.Characteristics.networkUUID
      )) || "";

    await bleService.disconnect(peripheral);
    const netConf: NetworkConfig = JSON.parse(netConfStr);
    setContextData({
      cloudData: contextData.cloudData,
      networkConfig: netConf,
    });
    setIsSending(false);
  };

  contextData.networkConfig == undefined && !isSending && readFromIris();

  return {
    style,
    contextData,
    isSending,
    readFromIris,
  };
};

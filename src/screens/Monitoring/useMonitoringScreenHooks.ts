import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./MonitoringScreen.style";
import { RootStackParamList } from "~navigation/RootStackPrams";
import { useState } from "react";
import { useAppContext } from "~hooks/useAppContext";
import { bleService } from "~services/bleService";

export type HomeNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default () => {
  const style = useThemedStyles(styles);
  const [isSending, setIsSending] = useState<boolean>();
  const [logs, setLogs] = useState(Array<string>());
  const { peripheral } = useAppContext();

  const reload = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
    }, 200);
  };

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

    const logs =
      (await bleService.read(
        peripheral,
        bleService.serviceUUID,
        bleService.Characteristics.monitoringUUID
      )) || "";

    await bleService.disconnect(peripheral);
    setIsSending(false);
  };

  return {
    style,
    isSending,
    logs,
    reload,
  };
};

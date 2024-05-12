import { useState } from "react";
import { styles } from "./SetupScreen.style";
import useThemedStyles from "~hooks/useThemedStyles";
import { Alert } from "react-native";
import { useAppContext } from "~hooks/useAppContext";
import { bleService } from "~services/bleService";
import { CloudData } from "~services/cloudService";
import useTheme from "~hooks/useTheme";

export default () => {
  const theme = useTheme();
  const style = useThemedStyles(styles);
  const { contextData, setContextData, peripheral } = useAppContext();
  const [license, setLicense] = useState<CloudData | undefined>();
  const [isSending, setIsSending] = useState<boolean>(false);

  const sendToIris = async () => {
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
    if (
      !(await bleService.write(
        peripheral,
        bleService.serviceUUID,
        bleService.Characteristics.setupUUID,
        JSON.stringify(license)
      ))
    ) {
      setIsSending(false);
      throw new Error("Cannot reboot device");
    }
    await bleService.disconnect(peripheral);
    setIsSending(false);

    if (!bleService.isDummyPeripheral(peripheral)) {
      let devices = contextData.cloudData.filter((obj) => {
        return obj !== license;
      });
      setContextData({ cloudData: devices });
    }
    setLicense(undefined);

    Alert.alert(
      "IRIS",
      "Configuration success!\nNow wait while device is rebooting.",
      [{ text: "OK" }]
    );
  };

  return {
    contextData,
    style,
    theme,
    isSending,
    license,
    setLicense,
    sendToIris,
  };
};

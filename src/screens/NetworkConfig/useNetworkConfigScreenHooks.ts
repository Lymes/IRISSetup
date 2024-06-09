import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./NetworkConfigScreen.style";
import { RootStackParamList } from "~navigation/RootStackPrams";
import { bleService } from "~services/bleService";
import { NetworkConfig } from "~contexts/NetworkConfig";
import { useState } from "react";
import { useAppContext } from "~hooks/useAppContext";
import { decompressSync, strFromU8 } from "fflate";

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
      return;
    }
    if (
      !(await bleService.findServices(peripheral, [bleService.serviceUUID]))
    ) {
      setIsSending(false);
      return;
    }
    const compressed = await bleService.readBytes(
      peripheral,
      bleService.serviceUUID,
      bleService.Characteristics.networkReadUUID
    );

    // const byteArray = new Uint8Array(compressed.length);
    // for (let index = 0; index < byteArray.length; index++) {
    //   const byte = compressed[index] & 0xff;
    //   byteArray[index] = byte;
    // }
    const netConfStr = strFromU8(
      decompressSync(Uint8Array.from(compressed, (z) => z))
    );
    await bleService.disconnect(peripheral);
    try {
      const netConf: NetworkConfig = JSON.parse(netConfStr);
      setContextData({
        cloudData: contextData.cloudData,
        networkConfig: netConf,
      });
    } catch (e) {
      setIsSending(false);
      return;
    }
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

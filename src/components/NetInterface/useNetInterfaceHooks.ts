import { useAppContext } from "~hooks/useAppContext";
import useTheme from "~hooks/useTheme";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./NetInterface.style";
import { NetIface } from "~navigation/RootStackPrams";
import { IfaceMode } from "~contexts/NetworkConfig";

export default () => {
  const theme = useTheme();
  const style = useThemedStyles(styles);
  const { contextData } = useAppContext();

  const isOn = (iface: NetIface): boolean => {
    return (
      (iface === NetIface.WLAN &&
        contextData.networkConfig.wlan.mode != IfaceMode.OFF) ||
      (iface === NetIface.ETH &&
        contextData.networkConfig.eth.mode != IfaceMode.OFF) ||
      (iface === NetIface.PPP &&
        contextData.networkConfig.ppp.mode != IfaceMode.OFF)
    );
  };

  return {
    style,
    theme,
    contextData,
    isOn,
  };
};

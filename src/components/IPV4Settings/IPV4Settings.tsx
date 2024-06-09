import { Text, View, ViewStyle } from "react-native";
import useIPV4SettingsHooks from "./useIPV4SettingsHooks";
import TextInputMask from "react-native-text-input-mask";
import { NetworkConfig } from "~contexts/NetworkConfig";
import { NetIface } from "~navigation/RootStackPrams";

interface Props {
  style?: ViewStyle;
  config: NetworkConfig;
  iface: NetIface;
  onChange: (config: NetworkConfig) => void;
}

const IPV4Settings: React.FC<Props> = (props: Props) => {
  const ipMask = "[099]{.}[099]{.}[099]{.}[099]/[09]";
  const mask = "[099]{.}[099]{.}[099]{.}[099]/[09]";
  const { style, validateIPv4 } = useIPV4SettingsHooks();

  return (
    <View style={[props.style, style.Container]}>
      <View style={style.group}>
        <Text style={style.label}>IP address</Text>
        <TextInputMask
          value={
            props.iface === NetIface.ETH
              ? props.config.eth.ipv4
              : props.config.wlan.ipv4
          }
          style={style.maskedInput}
          mask={ipMask}
          placeholder="192.168.0.10/24"
          placeholderTextColor="grey"
          onChangeText={(formatted, extracted) => {
            let ipv4 = validateIPv4(formatted) ? formatted : "";
            if (props.iface === NetIface.ETH) props.config.eth.ipv4 = ipv4;
            else props.config.wlan.ipv4 = ipv4;
            let newData = JSON.parse(JSON.stringify(props.config));
            props.onChange(newData);
          }}
        />
      </View>
      <View style={style.group}>
        <Text style={style.label}>Default router</Text>
        <TextInputMask
          value={
            props.iface === NetIface.ETH
              ? props.config.eth.router
              : props.config.wlan.router
          }
          style={style.maskedInput}
          mask={mask}
          placeholder="192.168.0.1"
          placeholderTextColor="grey"
          onChangeText={(formatted, extracted) => {
            let router = validateIPv4(formatted) ? formatted : "";
            if (props.iface === NetIface.ETH) props.config.eth.router = router;
            else props.config.wlan.router = router;
            let newData = JSON.parse(JSON.stringify(props.config));
            props.onChange(newData);
          }}
        />
      </View>
    </View>
  );
};

export default IPV4Settings;

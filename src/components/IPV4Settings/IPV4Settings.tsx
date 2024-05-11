import { Text, View, ViewProps } from "react-native";
import useIPV4SettingsHooks from "./useIPV4SettingsHooks";
import TextInputMask from "react-native-text-input-mask";

const IPV4Settings: React.FC<ViewProps> = (props: ViewProps) => {
  const mask = "[099]{.}[099]{.}[099]{.}[099]";
  const { style, contextData } = useIPV4SettingsHooks();

  return (
    <View style={[props.style, style.Container]}>
      <View style={style.group}>
        <Text style={style.label}>IP address</Text>
        <TextInputMask
          style={style.maskedInput}
          mask={mask}
          placeholder="192.168.0.10"
          placeholderTextColor="grey"
          onChangeText={(formatted, extracted) => {
            console.log(formatted);
            console.log(extracted);
          }}
        />
      </View>
      <View style={style.group}>
        <Text style={style.label}>Network mask</Text>
        <TextInputMask
          style={style.maskedInput}
          mask={mask}
          placeholder="255.255.255.0"
          placeholderTextColor="grey"
          onChangeText={(formatted, extracted) => {
            console.log(formatted);
            console.log(extracted);
          }}
        />
      </View>
      <View style={style.group}>
        <Text style={style.label}>Default router</Text>
        <TextInputMask
          style={style.maskedInput}
          mask={mask}
          placeholder="192.168.0.1"
          placeholderTextColor="grey"
          onChangeText={(formatted, extracted) => {
            console.log(formatted);
            console.log(extracted);
          }}
        />
      </View>
    </View>
  );
};

export default IPV4Settings;

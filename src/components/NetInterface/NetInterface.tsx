import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useNetInterfaceHooks from "./useNetInterfaceHooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  IfaceDescription,
  NetIface,
  RootStackParamList,
} from "~navigation/RootStackPrams";

interface NetInterfaceProps {
  iface: NetIface;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "NetworkConfig",
    undefined
  >;
}

const NetInterface: React.FC<NetInterfaceProps> = ({ iface, navigation }) => {
  const { style, contextData } = useNetInterfaceHooks();
  return (
    <View style={style.Container}>
      <View style={style.LeftContainer}>
        <Icon name="circle" size={20} color="#900" />
        <Text style={style.label}>{IfaceDescription.get(iface as string)}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("IfaceConfig", { iface: iface });
        }}
        hitSlop={20}
      >
        <Icon name="wrench" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default NetInterface;

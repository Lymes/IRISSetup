import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NetIface, RootStackParamList } from "~navigation/RootStackPrams";
import useNetworkConfigScreenHooks from "./useNetworkConfigScreenHooks";
import NetInterface from "~components/NetInterface/NetInterface";

type NetConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkConfig"
>;

export default function NetworkConfigScreen({ navigation }: NetConfigProps) {
  const { style } = useNetworkConfigScreenHooks();

  return (
    <View style={style.safeContainer}>
      <View style={style.container}>
        <NetInterface iface={NetIface.ETH} navigation={navigation} />
        <NetInterface iface={NetIface.WLAN} navigation={navigation} />
        <NetInterface iface={NetIface.PPP} navigation={navigation} />
      </View>
    </View>
  );
}

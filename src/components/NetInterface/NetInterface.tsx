import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useNetInterfaceHooks from "./useNetInterfaceHooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  IfaceDescription,
  NetIface,
  RootStackParamList,
} from "~navigation/RootStackPrams";
import { IfaceMode } from "~contexts/NetworkConfig";

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
      <View style={style.TitleRow}>
        <View style={style.LeftPartTitle}>
          <Icon
            name="circle"
            size={20}
            color={
              (iface === NetIface.WLAN
                ? contextData.networkConfig.wlan.mode
                : iface === NetIface.ETH
                ? contextData.networkConfig.eth.mode
                : contextData.networkConfig.ppp.mode) === IfaceMode.OFF
                ? "#900"
                : "#090"
            }
          />
          <Text style={style.label}>
            {IfaceDescription.get(iface as string)}
          </Text>
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

      <View style={style.details}>
        <View style={style.settingRow}>
          <Text style={{ width: 100 }}>Mode:</Text>
          <Text>
            {(iface === NetIface.WLAN
              ? contextData.networkConfig.wlan.mode
              : iface === NetIface.ETH
              ? contextData.networkConfig.eth.mode
              : contextData.networkConfig.ppp.mode) ?? "n/a"}
          </Text>
        </View>

        {iface === NetIface.PPP && (
          <View style={style.settingRow}>
            <Text style={{ width: 100 }}>APN:</Text>
            <Text>{contextData.networkConfig.ppp.apn ?? "n/a"}</Text>
          </View>
        )}

        {
          <>
            {iface === NetIface.WLAN && (
              <View style={style.settingRow}>
                <Text style={{ width: 100 }}>SSID:</Text>
                <Text>{contextData.networkConfig.wlan.ssid ?? "n/a"}</Text>
              </View>
            )}
            <View style={style.settingRow}>
              <Text style={{ width: 100 }}>IP:</Text>
              <Text>
                {(iface === NetIface.WLAN
                  ? contextData.networkConfig.wlan.ipv4
                  : iface === NetIface.ETH
                  ? contextData.networkConfig.eth.ipv4
                  : contextData.networkConfig.ppp.ipv4) ?? "n/a"}
              </Text>
            </View>
            <View style={style.settingRow}>
              <Text style={{ width: 100 }}>Netmask:</Text>
              <Text>
                {(iface === NetIface.WLAN
                  ? contextData.networkConfig.wlan.netmask
                  : iface === NetIface.ETH
                  ? contextData.networkConfig.eth.netmask
                  : contextData.networkConfig.ppp.netmask) ?? "n/a"}
              </Text>
            </View>
            <View style={style.settingRow}>
              <Text style={{ width: 100 }}>Router:</Text>
              <Text>
                {(iface === NetIface.WLAN
                  ? contextData.networkConfig.wlan.router
                  : iface === NetIface.ETH
                  ? contextData.networkConfig.eth.router
                  : contextData.networkConfig.ppp.router) ?? "n/a"}
              </Text>
            </View>
          </>
        }
      </View>
    </View>
  );
};

export default NetInterface;

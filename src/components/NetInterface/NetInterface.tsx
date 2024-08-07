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
  const { style, contextData, isOn } = useNetInterfaceHooks();
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
          <Text style={style.title}>
            {IfaceDescription.get(iface as string)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("IfaceConfig", { iface: iface });
          }}
          hitSlop={20}
        >
          <Icon name="wrench" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={style.details}>
        <View style={style.settingRow}>
          <Text style={[style.label, { width: 100 }]}>Mode:</Text>
          <Text style={style.label}>
            {(iface === NetIface.WLAN
              ? contextData.networkConfig.wlan.mode
              : iface === NetIface.ETH
              ? contextData.networkConfig.eth.mode
              : contextData.networkConfig.ppp.mode) ?? "n/a"}
          </Text>
        </View>

        {iface === NetIface.PPP && isOn(iface) && (
          <View style={style.settingRow}>
            <Text style={[style.label, { width: 100 }]}>APN:</Text>
            <Text style={style.label}>
              {contextData.networkConfig.ppp.apn ?? "n/a"}
            </Text>
          </View>
        )}

        {
          <>
            {iface === NetIface.WLAN && isOn(iface) && (
              <View style={style.settingRow}>
                <Text style={[style.label, { width: 100 }]}>SSID:</Text>
                <Text style={style.label}>
                  {contextData.networkConfig.wlan.ssid ?? "n/a"}
                </Text>
              </View>
            )}
            {isOn(iface) && (
              <View style={style.settingRow}>
                <Text style={[style.label, { width: 100 }]}>IP:</Text>
                <Text style={style.label}>
                  {(iface === NetIface.WLAN
                    ? contextData.networkConfig.wlan.ipv4
                    : iface === NetIface.ETH
                    ? contextData.networkConfig.eth.ipv4
                    : contextData.networkConfig.ppp.ipv4) ?? "n/a"}
                </Text>
              </View>
            )}
            {isOn(iface) && (
              <View style={style.settingRow}>
                <Text style={[style.label, { width: 100 }]}>Router:</Text>
                <Text style={style.label}>
                  {(iface === NetIface.WLAN
                    ? contextData.networkConfig.wlan.router
                    : iface === NetIface.ETH
                    ? contextData.networkConfig.eth.router
                    : contextData.networkConfig.ppp.router) ?? "n/a"}
                </Text>
              </View>
            )}
          </>
        }
      </View>
    </View>
  );
};

export default NetInterface;

import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./IfaceConfigScreen.style";
import { useEffect, useState } from "react";
import { Button, Platform } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAppContext } from "~hooks/useAppContext";
import { NetIface, RootStackParamList } from "~navigation/RootStackPrams";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import { IfaceMode } from "~contexts/NetworkConfig";

export default () => {
  const style = useThemedStyles(styles);
  const { contextData, setContextData } = useAppContext();
  const [localConfig, setLocalConfig] = useState(
    JSON.parse(JSON.stringify(contextData))
  );

  const getStates = (iface: NetIface): RadioButtonProps[] => {
    const ifaceStates =
      iface === NetIface.PPP
        ? [IfaceMode.OFF, IfaceMode.LTE, IfaceMode.NB_IoT]
        : [IfaceMode.OFF, IfaceMode.DHCP, IfaceMode.MANUAL];
    return ifaceStates.map((value) => ({
      id: value,
      label: value,
      value: value,
      borderSize: 0.5,
    }));
  };
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "IfaceConfig">>();

  let selectedId: IfaceMode;
  switch (route.params.iface) {
    case NetIface.ETH:
      selectedId = localConfig.networkConfig.eth.mode;
      break;
    case NetIface.WLAN:
      selectedId = localConfig.networkConfig.wlan.mode;
      break;
    case NetIface.PPP:
      selectedId = localConfig.networkConfig.ppp.mode;
  }

  const setSelectedId = (option: IfaceMode) => {
    switch (route.params.iface) {
      case NetIface.ETH:
        localConfig.networkConfig.eth.mode = option;
        break;
      case NetIface.WLAN:
        localConfig.networkConfig.wlan.mode = option;
        break;
      case NetIface.PPP:
        localConfig.networkConfig.ppp.mode = option;
    }
    let newConfig = JSON.parse(JSON.stringify(localConfig));
    setLocalConfig(newConfig);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            setContextData(localConfig);
            navigation.goBack();
          }}
          title="Apply"
          color={Platform.OS === "ios" ? "#fff" : "blank"}
          disabled={isInvalidConfiguration()}
        />
      ),
    });
  }, [navigation, localConfig]);

  const isInvalidConfiguration = (): boolean => {
    return (
      (selectedId === IfaceMode.MANUAL &&
        ((route.params.iface === NetIface.ETH &&
          (!localConfig.networkConfig.eth.ipv4 ||
            !localConfig.networkConfig.eth.netmask ||
            !localConfig.networkConfig.eth.router)) ||
          (route.params.iface === NetIface.WLAN &&
            (!localConfig.networkConfig.wlan.ipv4 ||
              !localConfig.networkConfig.wlan.netmask ||
              !localConfig.networkConfig.wlan.router ||
              !localConfig.networkConfig.wlan.ssid ||
              !localConfig.networkConfig.wlan.pass)))) ||
      (selectedId === IfaceMode.DHCP &&
        route.params.iface === NetIface.WLAN &&
        (!localConfig.networkConfig.wlan.ssid ||
          !localConfig.networkConfig.wlan.pass)) ||
      (selectedId != IfaceMode.OFF &&
        route.params.iface === NetIface.PPP &&
        !localConfig.networkConfig.ppp.apn)
    );
  };

  return {
    style,
    selectedId,
    setSelectedId,
    localConfig,
    setLocalConfig,
    getStates,
  };
};

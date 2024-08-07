import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./IfaceConfigScreen.style";
import { useEffect, useState } from "react";
import { Alert, Button, Platform } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAppContext } from "~hooks/useAppContext";
import { NetIface, RootStackParamList } from "~navigation/RootStackPrams";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import { IfaceMode } from "~contexts/NetworkConfig";
import { bleService } from "~services/bleService";
import * as fflate from "fflate";
import useTheme from "~hooks/useTheme";

export default () => {
  const style = useThemedStyles(styles);
  const theme = useTheme();
  const { contextData, setContextData, peripheral } = useAppContext();
  const [isSending, setIsSending] = useState<boolean>(false);
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
      color: "white",
      labelStyle: { color: "white", fontSize: theme.typography.size.medium },
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
          onPress={async () => {
            await saveToIris();
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
            !localConfig.networkConfig.eth.router)) ||
          (route.params.iface === NetIface.WLAN &&
            (!localConfig.networkConfig.wlan.ipv4 ||
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

  const saveToIris = async () => {
    if (peripheral === undefined) return;
    Alert.alert(
      "Saving configuration",
      `Are you sure to change ${route.params.iface} configuration?`,
      [
        {
          text: "No",
          onPress: async () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setIsSending(true);
            if (!(await bleService.connect(peripheral))) {
              setIsSending(false);
              Alert.alert("Iris BLE", "Cannot connect to device", [
                { text: "OK" },
              ]);
            }
            if (
              !(await bleService.findServices(peripheral, [
                bleService.serviceUUID,
              ]))
            ) {
              setIsSending(false);
              Alert.alert("Iris BLE", "Cannot find service", [{ text: "OK" }]);
            }
            console.log("SAVE to IRIS:", localConfig.networkConfig);

            const buf = fflate.strToU8(
              JSON.stringify(localConfig.networkConfig)
            );
            const compressed = fflate.compressSync(buf);

            await bleService.writeBytes(
              peripheral,
              bleService.serviceUUID,
              bleService.Characteristics.networkWriteUUID,
              Array.from(compressed)
            );
            await bleService.disconnect(peripheral);
            let newConfig = JSON.parse(JSON.stringify(localConfig));
            setContextData(newConfig);
            setIsSending(false);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return {
    style,
    selectedId,
    setSelectedId,
    localConfig,
    setLocalConfig,
    getStates,
    isSending,
  };
};

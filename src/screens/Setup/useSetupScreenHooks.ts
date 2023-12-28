import { useEffect, useState } from "react";
import { styles } from "./SetupScreen.style";
import useThemedStyles from "~hooks/useThemedStyles";
import WifiManager from "react-native-wifi-reborn";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useAppContext } from "~hooks/useAppContext";
import { bleService } from "~services/bleService";

export default () => {
  const style = useThemedStyles(styles);
  const { cloudData, peripheral } = useAppContext();
  const [ssid, setSSID] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [wifiPermissions, setWiFiPermissions] = useState<string>("denied");

  useEffect(() => {
    (async () => {
      if (Platform.OS === "ios") {
        setWiFiPermissions("granted");
        return;
      }
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "IRIS App Permission",
            message:
              "Location permission is required to connect with or scan for Wifi networks. ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setWiFiPermissions("granted");
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (wifiPermissions === "granted") {
        try {
          let ssid = await WifiManager.getCurrentWifiSSID();
          setSSID(ssid);
        } catch (error) {
          Alert.alert("WiFi", `${error}`, [{ text: "OK" }]);
        }
      }
    })();
  }, [wifiPermissions]);

  const sendToIris = async () => {
    if (peripheral === undefined) return;
    setIsSending(true);
    if (!(await bleService.connect(peripheral))) {
      setIsSending(false);
      throw new Error("Cannot connect to peripheral");
    }
    if (
      !(await bleService.findServices(peripheral, [bleService.serviceUUID]))
    ) {
      setIsSending(false);
      throw new Error("Cannot find service");
    }
    if (
      !(await bleService.write(
        peripheral,
        bleService.serviceUUID,
        bleService.Characteristics.wifiUUID,
        `{"ssid": "${ssid}", "password": "${code}"}`
      ))
    ) {
      setIsSending(false);
      throw new Error("Cannot write WiFi configuration");
    }
    if (
      !(await bleService.write(
        peripheral,
        bleService.serviceUUID,
        bleService.Characteristics.plantIdUUID,
        `{"plantID": "${cloudData.plantID}"}`
      ))
    ) {
      setIsSending(false);
      throw new Error("Cannot write Plant configuration");
    }
    if (
      !(await bleService.write(
        peripheral,
        bleService.serviceUUID,
        bleService.Characteristics.rebootUUID,
        `1`
      ))
    ) {
      setIsSending(false);
      throw new Error("Cannot reboot device");
    }
    await bleService.disconnect(peripheral);
    setIsSending(false);
    Alert.alert(
      "IRIS",
      "Configuration success!\nNow wait while device is rebooting.",
      [{ text: "OK" }]
    );
  };

  return {
    wifiPermissions,
    ssid,
    cloudData,
    style,
    isSending,
    code,
    setCode,
    sendToIris,
  };
};

import { useEffect, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import { Peripheral } from "react-native-ble-manager";
import { bleService } from "~services/bleService";
import useThemedStyles from "~hooks/useThemedStyles";
import useTheme from "~hooks/useTheme";
import { styles } from "./BLEScanner.style";
import { useAppContext } from "~hooks/useAppContext";

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default () => {
  const theme = useTheme();
  const style = useThemedStyles(styles);
  const { bleStarted, peripheral, setPeripheral, contextData } =
    useAppContext();

  const [peripherals, setPeripherals] = useState<Peripheral[]>([
    bleService.dummyPeripheral,
  ]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const startScan = async () => {
    setIsScanning(true);
    setPeripheral(undefined);
    setPeripherals([bleService.dummyPeripheral]);
    await bleService.startScan([
      /*bleService.serviceUUID*/
    ]);
  };

  const connect = async (peripheral: Peripheral) => {
    console.log(peripheral);
    await bleService.pair(peripheral);
    setIsConnecting(true);
    if (!(await bleService.connect(peripheral))) {
      setIsConnecting(false);
      throw new Error("Cannot connect to peripheral");
    }
    if (
      !(await bleService.findServices(peripheral, [bleService.serviceUUID]))
    ) {
      setIsConnecting(false);
      throw new Error("Cannot find IRIS service");
    }
    await bleService.disconnect(peripheral);
    setIsConnecting(false);
  };

  useEffect(() => {
    if (!bleStarted) return;
    let discoverListener = BleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      (peripheral: Peripheral) => {
        if (
          peripheral.advertising.isConnectable &&
          (peripheral.name || peripheral.advertising.localName)
        ) {
          setPeripherals((oldPeripherals: Peripheral[]) => {
            let periphs = [peripheral, ...oldPeripherals];
            const uniquePeripherals = [
              ...new Map(periphs.map((item) => [item.id, item])).values(),
            ];
            return [...uniquePeripherals];
          });
        }
      }
    );
    let stopScanListener = BleManagerEmitter.addListener(
      "BleManagerStopScan",
      () => {
        setIsScanning(false);
      }
    );
    return () => {
      discoverListener.remove();
      stopScanListener.remove();
    };
  }, [bleStarted]);

  return {
    style,
    theme,
    bleStarted,
    peripherals,
    isScanning,
    isConnecting,
    peripheral,
    setPeripheral,
    startScan,
    connect,
  };
};

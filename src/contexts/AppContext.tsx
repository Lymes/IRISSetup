import React, { createContext, useState, useEffect } from "react";
import { CloudData } from "~services/cloudService";
import { bleService } from "~services/bleService";
import { Peripheral } from "react-native-ble-manager";

export type AppContextData = {
  cloudData: CloudData;
  blePermissionsGranted: boolean;
  bleStarted: boolean;
  peripheral?: Peripheral;
  setPeripheral(peripheral?: Peripheral): void;
};

const AppContext = createContext<AppContextData>({} as AppContextData);

type Props = {
  children?: React.ReactNode;
};

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [cloudData, setCloudData] = useState<CloudData>({
    macAddress: undefined,
    publicKey: undefined,
    qrCode: undefined,
    plantID: undefined,
  });
  const [bleStarted, setBLEStarted] = useState(false);
  const [blePermissionsGranted, setBLEPermissions] = useState(false);
  const [peripheral, setPeripheral] = useState<Peripheral | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      let res = await bleService.handleAndroidPermissions();
      setBLEPermissions(res);
      if (res) {
        await bleService.init();
        setBLEStarted(true);
      }
    })();
  }, []);

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <AppContext.Provider
      value={{
        cloudData,
        blePermissionsGranted,
        bleStarted,
        peripheral,
        setPeripheral,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };

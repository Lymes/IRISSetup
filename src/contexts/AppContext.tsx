import React, { createContext, useState, useEffect } from "react";
import { CloudData } from "~services/cloudService";
import { bleService } from "~services/bleService";
import { Peripheral } from "react-native-ble-manager";
import usePersist from "react-native-persist-context";
import { dummyNet, NetworkConfig } from "./NetworkConfig";

export type AppContextData = {
  contextData: AppContextPersistedData;
  setContextData(data: AppContextPersistedData): void;
  blePermissionsGranted: boolean;
  bleStarted: boolean;
  peripheral?: Peripheral;
  setPeripheral(peripheral?: Peripheral): void;
};

const testLicense: CloudData = {
  plantId: "TestLicense",
  username: "",
  password: "",
  serialNumber: "",
};

type AppContextPersistedData = {
  cloudData: CloudData[];
  networkConfig: NetworkConfig;
};

const AppContext = createContext<AppContextData>({} as AppContextData);

type Props = {
  children?: React.ReactNode;
};

const AppContextProvider: React.FC<Props> = ({ children }) => {
  // Using usePersist hook with initial values and persist key
  const [contextData, setContextData, clear] =
    usePersist<AppContextPersistedData>("appContext", {
      cloudData: [testLicense],
      networkConfig: dummyNet,
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
        contextData,
        setContextData,
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

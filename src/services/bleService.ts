import BleManager, { Peripheral } from "react-native-ble-manager";
import { stringToBytes, bytesToString } from "convert-string";
import { PermissionsAndroid, Platform } from "react-native";

const serviceUUID = "8888";

enum Characteristics {
  wifiUUID = "8888",
  macAddressUUID = "8889",
  publicKeyUUID = "8890",
  plantIdUUID = "8891",
  rebootUUID = "8892",
}

const dummyPeripheral: Peripheral = {
  id: "XXX-XXXX-XXXXXXXX",
  name: "Test peripheral",
  rssi: -1,
  advertising: {},
};

const init = (): Promise<boolean> => {
  return new Promise((resolve) => {
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log("BLE initialized");
        resolve(true);
      })
      .catch((error: any) => {
        console.log("BLE init error:", error);
        resolve(false);
      });
  });
};

const startScan = (services: string[]): Promise<boolean> => {
  return new Promise((resolve) => {
    BleManager.scan(services, 3, false)
      .then(() => {
        console.log("BLE scanning...");
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
};

const pair = (peripheral: Peripheral): Promise<boolean> => {
  return new Promise((resolve) => {
    if (peripheral.id === dummyPeripheral.id) {
      resolve(true);
    }
    BleManager.createBond(peripheral.id)
      .then(() => {
        console.log("BLE: device paired successfully");
        resolve(true);
      })
      .catch(() => {
        console.log("BLE: failed to pair");
        resolve(false);
      });
  });
};

const connect = (peripheral: Peripheral): Promise<boolean> => {
  return new Promise((resolve) => {
    if (peripheral.id === dummyPeripheral.id) {
      resolve(true);
      return;
    }
    setTimeout(() => {
      BleManager.disconnect(peripheral.id);
      resolve(false);
    }, 5000);
    BleManager.connect(peripheral.id)
      .then(() => {
        console.log("BLE: connected success");
        resolve(true);
      })
      .catch(() => {
        console.log("BLE: failed to connect");
        resolve(false);
      });
  });
};

const findServices = (
  peripheral: Peripheral,
  services: string[]
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (peripheral.id === dummyPeripheral.id) {
      resolve(true);
      return;
    }
    BleManager.retrieveServices(peripheral.id, services)
      .then(() => {
        console.log("BLE: found services");
        resolve(true);
      })
      .catch(() => {
        console.log("BLE: services not found");
        resolve(false);
      });
  });
};

const disconnect = (peripheral: Peripheral): Promise<boolean> => {
  return new Promise((resolve) => {
    if (peripheral.id === dummyPeripheral.id) {
      resolve(true);
      return;
    }
    BleManager.disconnect(peripheral.id, true)
      .then(() => {
        console.log("BLE: disconnected from peripheral");
        resolve(true);
      })
      .catch(() => {
        console.log("BLE: fail to disconnect");
        resolve(false);
      });
  });
};

const write = (
  peripheral: Peripheral,
  serviceUUID: string,
  characteristicUUID: string,
  payload: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (peripheral.id === dummyPeripheral.id) {
      resolve(true);
      return;
    }
    const data = stringToBytes(payload);
    console.log(`BLE: writing ${payload}`);
    BleManager.write(
      peripheral.id,
      serviceUUID,
      characteristicUUID,
      data,
      data.length
    )
      .then(() => {
        console.log(`BLE: wuccessfully wrote to ${characteristicUUID}`);
        resolve(true);
      })
      .catch(() => {
        console.log(`BLE: failed to write to ${characteristicUUID}`);
        resolve(false);
      });
  });
};

const read = (
  peripheral: Peripheral,
  serviceUUID: string,
  characteristicUUID: string
): Promise<string | undefined> => {
  return new Promise((resolve) => {
    if (peripheral.id === dummyPeripheral.id) {
      resolve("payload");
      return;
    }
    BleManager.read(peripheral.id, serviceUUID, characteristicUUID)
      .then((readData) => {
        console.log(`BLE: successfully read from ${characteristicUUID}`);
        const payload = bytesToString(readData);
        resolve(payload);
      })
      .catch(() => {
        console.log(`BLE: failed to read from ${characteristicUUID}`);
        resolve(undefined);
      });
  });
};

const subscribe = (
  peripheral: Peripheral,
  serviceUUID: string,
  characteristicUUID: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (peripheral.id === dummyPeripheral.id) {
      resolve(true);
      return;
    }
    BleManager.startNotification(peripheral.id, serviceUUID, characteristicUUID)
      .then(() => {
        console.log(`BLE: successfully subscribed on ${characteristicUUID}`);
        resolve(true);
      })
      .catch(() => {
        console.log(`BLE: failed to subscribe on ${characteristicUUID}`);
        resolve(false);
      });
  });
};

const handleAndroidPermissions = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (Platform.OS === "android" && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then((result) => {
        if (
          result["android.permission.BLUETOOTH_SCAN"] === "granted" &&
          result["android.permission.BLUETOOTH_CONNECT"] === "granted"
        ) {
          console.log(
            "[handleAndroidPermissions] User accepts runtime permissions android 12+"
          );
          resolve(true);
        } else {
          console.log(
            "[handleAndroidPermissions] User refuses runtime permissions android 12+"
          );
          resolve(false);
        }
      });
    } else if (Platform.OS === "android" && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((checkResult) => {
        if (checkResult) {
          console.log(
            "[handleAndroidPermissions] runtime permission Android <12 already OK"
          );
          resolve(true);
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then((requestResult) => {
            if (requestResult === "granted") {
              console.log(
                "[handleAndroidPermissions] User accepts runtime permission android <12"
              );
              resolve(true);
            } else {
              console.log(
                "[handleAndroidPermissions] User refuses runtime permission android <12"
              );
              resolve(false);
            }
          });
        }
      });
    } else {
      resolve(true);
    }
  });
};

export const bleService = {
  dummyPeripheral,
  serviceUUID,
  Characteristics,
  init,
  startScan,
  pair,
  connect,
  findServices,
  disconnect,
  write,
  read,
  subscribe,
  handleAndroidPermissions,
};

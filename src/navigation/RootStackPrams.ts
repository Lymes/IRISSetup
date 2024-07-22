export enum FromScreen {
  LicenseSetup,
  NetworkConfig,
  Monitoring,
}

export enum NetIface {
  ETH = "Ethernet",
  WLAN = "WiFi",
  PPP = "4G",
}

export const IfaceDescription = new Map<string, string>([
  [NetIface.ETH, "Ethernet LAN settings"],
  [NetIface.WLAN, "WiFi LAN settings"],
  [NetIface.PPP, "LTE/NB-IoT settings"],
]);

export type RootStackParamList = {
  Home: undefined;
  BLE: { from: FromScreen };
  QR: undefined;
  Setup: undefined;
  NetworkConfig: undefined;
  IfaceConfig: { iface: NetIface };
  Monitoring: undefined;
  XXX: undefined;
  HomeStack: undefined;
  LicenseStack: undefined;
  NetworkStack: undefined;
  MonitorStack: undefined;
};

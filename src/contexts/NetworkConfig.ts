export enum IfaceMode {
  OFF = "Off",
  DHCP = "DHCP",
  MANUAL = "Manual",
  LTE = "LTE",
  NB_IoT = "NB-IoT",
}

export type NetworkConfig = {
  eth: {
    mode: IfaceMode;
    ipv4?: string;
    netmask?: string;
    router?: string;
  };
  wlan: {
    mode: IfaceMode;
    ssid?: string;
    pass?: string;
    ipv4?: string;
    netmask?: string;
    router?: string;
  };
  ppp: {
    mode: IfaceMode;
    apn?: string;
    ipv4?: string;
    netmask?: string;
    router?: string;
  };
};

export const dummyNet: NetworkConfig = {
  eth: {
    mode: IfaceMode.DHCP,
    ipv4: "192.168.0.10",
    netmask: "255.255.255.0",
    router: "192.168.0.1",
  },
  wlan: {
    mode: IfaceMode.DHCP,
    ssid: "SkyNet",
    pass: "pippo",
    ipv4: "192.168.2.3",
    netmask: "255.255.255.0",
    router: "192.168.2.1",
  },
  ppp: {
    mode: IfaceMode.NB_IoT,
    apn: "internet.wind",
    ipv4: "10.0.0.2",
    netmask: "255.255.0.0",
    router: "10.0.0.1",
  },
};

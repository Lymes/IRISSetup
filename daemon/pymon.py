#!/usr/bin/env python3
#
# DEPENDS on zeroconf mDNS (Bonjour) library
# to install: `pip3 install zeroconf`
# DEPENDS on smbus I2C library for raspberry
# to install: `pip3 install smbus`
#
import os
import logging
import socket
from time import sleep
from zeroconf import IPVersion, ServiceInfo, Zeroconf

serviceInfo = ServiceInfo(
    "_icc._tcp.local.",
    "IRIS._icc._tcp.local.",
    addresses=[],
    port=80,
    properties={'path': 'ICC'},
    server="IRIS.local.",
)
zeroconf = Zeroconf(ip_version=IPVersion.V4Only)
registered = False

def flash_red_error():
    print('RED')

def switch_green_light():
    print('GREEN')

def get_ip_address(ifname):
    f = os.popen(f'ifconfig {ifname} | grep "inet\ " | cut -d" " -f2')
    sleep(2)
    return f.read().strip()

if __name__ == '__main__':
    logging.basicConfig(level=logging.ERROR)
    logging.getLogger('zeroconf').setLevel(logging.ERROR)
    try:
        while True:
            address = get_ip_address('en0')
            logging.warning(address)
            if address == '':
                flash_red_error()
                if registered == True:
                    print("Disconnected, unregistering service...")
                    zeroconf.unregister_service(serviceInfo)
                    registered = False
            else:
                if registered == False:
                    print(f"Connected, registering service on {address}")
                    serviceInfo.addresses = [socket.inet_aton(address)]
                    zeroconf.register_service(serviceInfo)
                    registered = True
                    switch_green_light()

    except KeyboardInterrupt:
        pass
    finally:
        zeroconf.unregister_service(serviceInfo)
        zeroconf.close()
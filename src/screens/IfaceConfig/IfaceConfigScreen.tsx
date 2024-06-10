import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NetIface, RootStackParamList } from "~navigation/RootStackPrams";
import useIfaceConfigScreenHooks from "./useIfaceConfigScreenHooks";
import IPV4Settings from "~components/IPV4Settings/IPV4Settings";
import RadioGroup from "react-native-radio-buttons-group";
import React from "react";
import TextInputMask from "react-native-text-input-mask";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IfaceMode, NetworkConfig } from "~contexts/NetworkConfig";
import Spinner from "~components/Spinner";

type IfaceConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "IfaceConfig"
>;

export default function IfaceConfigScreen({ route }: IfaceConfigProps) {
  const {
    style,
    selectedId,
    setSelectedId,
    localConfig,
    setLocalConfig,
    getStates,
    isSending,
  } = useIfaceConfigScreenHooks();

  return (
    <View style={style.safeContainer}>
      <KeyboardAwareScrollView
        style={style.keyboardView}
        enableOnAndroid={true}
        extraScrollHeight={200}
        extraHeight={20}
      >
        <RadioGroup
          containerStyle={style.container}
          radioButtons={getStates(route.params.iface)}
          onPress={(option) => {
            setSelectedId(option as IfaceMode);
          }}
          selectedId={selectedId}
        />
        <View style={style.settings}>
          {route.params.iface === NetIface.PPP &&
            selectedId != IfaceMode.OFF && (
              <View style={style.group}>
                <Text style={style.label}>APN</Text>
                <TextInputMask
                  value={localConfig.networkConfig.ppp.apn}
                  placeholder="internet.wind"
                  placeholderTextColor="grey"
                  style={style.maskedInput}
                  onChangeText={(formatted, extracted) => {
                    localConfig.networkConfig.ppp.apn = formatted;
                    let newData = JSON.parse(JSON.stringify(localConfig));
                    setLocalConfig(newData);
                  }}
                />
              </View>
            )}

          {route.params.iface === NetIface.WLAN &&
            selectedId != IfaceMode.OFF && (
              <>
                <View style={style.group}>
                  <Text style={style.label}>SSID</Text>
                  <TextInputMask
                    value={localConfig.networkConfig.wlan.ssid}
                    placeholder="MyHomeNetwork"
                    placeholderTextColor="grey"
                    style={style.maskedInput}
                    onChangeText={(formatted, extracted) => {
                      localConfig.networkConfig.wlan.ssid = formatted;
                      let newData = JSON.parse(JSON.stringify(localConfig));
                      setLocalConfig(newData);
                    }}
                  />
                </View>
                <View style={style.group}>
                  <Text style={style.label}>Password</Text>
                  <TextInputMask
                    value={localConfig.networkConfig.wlan.pass}
                    placeholder="MyPassword"
                    placeholderTextColor="grey"
                    style={style.maskedInput}
                    onChangeText={(formatted, extracted) => {
                      localConfig.networkConfig.wlan.pass = formatted;
                      let newData = JSON.parse(JSON.stringify(localConfig));
                      setLocalConfig(newData);
                    }}
                  />
                </View>
              </>
            )}
          {route.params.iface != NetIface.PPP &&
            selectedId === IfaceMode.MANUAL && (
              <IPV4Settings
                config={localConfig.networkConfig}
                iface={route.params.iface}
                onChange={(config: NetworkConfig) => {
                  localConfig.networkConfig = config;
                  let newData = JSON.parse(JSON.stringify(localConfig));
                  setLocalConfig(newData);
                }}
              />
            )}
        </View>
      </KeyboardAwareScrollView>
      <Spinner visible={isSending} textContent={"Sending..."} />
    </View>
  );
}

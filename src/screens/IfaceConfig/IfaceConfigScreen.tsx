import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NetIface, RootStackParamList } from "~navigation/RootStackPrams";
import useIfaceConfigScreenHooks from "./useIfaceConfigScreenHooks";
import IPV4Settings from "~components/IPV4Settings/IPV4Settings";
import RadioGroup from "react-native-radio-buttons-group";
import React from "react";
import TextInputMask from "react-native-text-input-mask";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IfaceMode, nbIoTMode } from "~contexts/NetworkConfig";

type IfaceConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "IfaceConfig"
>;

export default function IfaceConfigScreen({ route }: IfaceConfigProps) {
  const { style, selectedId, setSelectedId, contextData, getStates } =
    useIfaceConfigScreenHooks();

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
          onPress={setSelectedId}
          selectedId={selectedId}
        />
        <View style={style.settings}>
          {route.params.iface === NetIface.PPP && selectedId != "OFF" && (
            <View style={style.group}>
              <Text style={style.label}>APN</Text>
              <TextInputMask
                placeholder="internet.wind"
                placeholderTextColor="grey"
                style={style.maskedInput}
                onChangeText={(formatted, extracted) => {}}
              />
            </View>
          )}

          {route.params.iface === NetIface.WLAN && selectedId != "OFF" && (
            <>
              <View style={style.group}>
                <Text style={style.label}>SSID</Text>
                <TextInputMask
                  placeholder="MyHomeNetwork"
                  placeholderTextColor="grey"
                  style={style.maskedInput}
                  onChangeText={(formatted, extracted) => {}}
                />
              </View>
              <View style={style.group}>
                <Text style={style.label}>Password</Text>
                <TextInputMask
                  placeholder="MyPassword"
                  placeholderTextColor="grey"
                  style={style.maskedInput}
                  onChangeText={(formatted, extracted) => {}}
                />
              </View>
            </>
          )}
          {route.params.iface != NetIface.PPP && selectedId === "2" && (
            <IPV4Settings></IPV4Settings>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

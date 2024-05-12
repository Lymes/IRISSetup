import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NetIface, RootStackParamList } from "~navigation/RootStackPrams";
import useIfaceConfigScreenHooks from "./useIfaceConfigScreenHooks";
import IPV4Settings from "~components/IPV4Settings/IPV4Settings";
import RadioGroup from "react-native-radio-buttons-group";
import React from "react";
import TextInputMask from "react-native-text-input-mask";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type IfaceConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "IfaceConfig"
>;

export default function IfaceConfigScreen({
  navigation,
  route,
}: IfaceConfigProps) {
  const { style, lanOptions, pppOptions, selectedId, setSelectedId } =
    useIfaceConfigScreenHooks();

  console.log(route.params);

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
          radioButtons={
            route.params.iface === NetIface.PPP ? pppOptions : lanOptions
          }
          onPress={setSelectedId}
          selectedId={selectedId}
        />
        {route.params.iface === NetIface.PPP && selectedId != "0" && (
          <View style={style.container}>
            <View style={style.group}>
              <Text style={style.label}>APN</Text>
              <TextInputMask
                placeholder="internet.wind"
                placeholderTextColor="grey"
                style={style.maskedInput}
                onChangeText={(formatted, extracted) => {}}
              />
            </View>
          </View>
        )}

        {route.params.iface === NetIface.WLAN && selectedId != "0" && (
          <View style={style.container}>
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
          </View>
        )}

        {route.params.iface != NetIface.PPP && selectedId === "2" && (
          <IPV4Settings style={style.ipSettings}></IPV4Settings>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

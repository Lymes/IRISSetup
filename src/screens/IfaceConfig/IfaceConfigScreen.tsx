import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import useIfaceConfigScreenHooks from "./useIfaceConfigScreenHooks";
import IPV4Settings from "~components/IPV4Settings/IPV4Settings";
import RadioGroup from "react-native-radio-buttons-group";
import { useMemo, useState } from "react";

type IfaceConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "IfaceConfig"
>;

export default function IfaceConfigScreen({ navigation }: IfaceConfigProps) {
  const { style } = useIfaceConfigScreenHooks();

  const radioButtons = useMemo(
    () => [
      {
        id: "0",
        label: "Disabled",
        value: "Disabled",
      },
      {
        id: "1",
        label: "DHCP",
        value: "DHCP",
      },
      {
        id: "2",
        label: "Manual",
        value: "Manual",
      },
    ],
    []
  );
  const [selectedId, setSelectedId] = useState<string>("1");

  return (
    <View style={style.safeContainer}>
      <RadioGroup
        containerStyle={style.container}
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
      />
      <IPV4Settings style={style.ipSettings}></IPV4Settings>
    </View>
  );
}

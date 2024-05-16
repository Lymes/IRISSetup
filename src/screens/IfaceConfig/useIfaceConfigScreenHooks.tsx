import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./IfaceConfigScreen.style";
import { useEffect, useMemo, useState } from "react";
import { Button, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "~hooks/useAppContext";
import { NetIface } from "~navigation/RootStackPrams";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import { IfaceMode, nbIoTMode } from "~contexts/NetworkConfig";

export default () => {
  const style = useThemedStyles(styles);
  const { contextData } = useAppContext();

  const getStates = (iface: NetIface): RadioButtonProps[] => {
    const ifaceStates = iface === NetIface.PPP ? nbIoTMode : IfaceMode;
    return Object.entries(ifaceStates).map(([key, value]) => ({
      id: key,
      label: value,
      value: key,
      borderSize: 0.5,
    }));
  };
  const [selectedId, setSelectedId] = useState<string>("OFF");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Apply"
          color={Platform.OS === "ios" ? "#fff" : "blank"}
        />
      ),
    });
  }, [navigation]);

  return {
    style,
    selectedId,
    setSelectedId,
    contextData,
    getStates,
  };
};

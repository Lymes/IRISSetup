import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./IfaceConfigScreen.style";
import { useEffect, useMemo, useState } from "react";
import { Button, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const style = useThemedStyles(styles);

  const lanOptions = useMemo(
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

  const pppOptions = useMemo(
    () => [
      {
        id: "0",
        label: "Disabled",
        value: "Disabled",
      },
      {
        id: "1",
        label: "LTE",
        value: "LTE",
      },
      {
        id: "2",
        label: "NB-IoT",
        value: "nbIot",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string>("1");
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
    lanOptions,
    pppOptions,
    selectedId,
    setSelectedId,
  };
};

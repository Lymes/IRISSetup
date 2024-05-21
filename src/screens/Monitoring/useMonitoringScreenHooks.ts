import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./MonitoringScreen.style";
import { RootStackParamList } from "~navigation/RootStackPrams";
import { useState } from "react";

export type HomeNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default () => {
  const style = useThemedStyles(styles);
  const [logs, setLogs] = useState(Array<string>());

  return {
    style,
    logs,
  };
};

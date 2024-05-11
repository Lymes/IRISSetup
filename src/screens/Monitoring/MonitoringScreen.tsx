import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import useMonitoringScreenHooks from "./useMonitoringScreenHooks";

type MonitoringConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "Monitoring"
>;

export default function NetworkConfigScreen({
  navigation,
}: MonitoringConfigProps) {
  const { style } = useMonitoringScreenHooks();

  return (
    <View style={style.safeContainer}>
      <View style={style.container}>
        <Text style={style.title}>Monitoring</Text>
      </View>
    </View>
  );
}

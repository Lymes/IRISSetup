import { View, Text, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import useMonitoringScreenHooks from "./useMonitoringScreenHooks";
import PrimaryButton from "~components/Buttons/PrimaryButton";

type MonitoringConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "Monitoring"
>;

export default function NetworkConfigScreen({
  navigation,
}: MonitoringConfigProps) {
  const { style, isSending, logs, reload } = useMonitoringScreenHooks();

  return (
    <View style={style.safeContainer}>
      <View style={style.container}>
        <Text style={style.title}>IRIS Logs</Text>
        <View style={style.logContainer}>
          <FlatList
            data={logs}
            renderItem={({ item }) => <Text style={style.logText}>{item}</Text>}
          />
        </View>
        <PrimaryButton
          disabled={isSending}
          style={style.ctaButton}
          title="Reload"
          onPress={async () => {
            reload();
          }}
        />
      </View>
    </View>
  );
}

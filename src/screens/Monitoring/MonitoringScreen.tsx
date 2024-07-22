import { View, Text, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import useMonitoringScreenHooks from "./useMonitoringScreenHooks";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import Spinner from "~components/Spinner";

type MonitoringConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "Monitoring"
>;

export default function MonitoringScreen({
  navigation,
}: MonitoringConfigProps) {
  const { style, isSending, logs, reload } = useMonitoringScreenHooks();

  return (
    <View style={style.safeContainer}>
      <View style={style.container}>
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
        <Spinner visible={isSending} textContent={"Loading..."} />
      </View>
    </View>
  );
}

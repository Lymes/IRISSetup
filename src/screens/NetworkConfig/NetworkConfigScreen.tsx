import { ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NetIface, RootStackParamList } from "~navigation/RootStackPrams";
import useNetworkConfigScreenHooks from "./useNetworkConfigScreenHooks";
import NetInterface from "~components/NetInterface/NetInterface";
import Spinner from "~components/Spinner";
import PrimaryButton from "~components/Buttons/PrimaryButton";

type NetConfigProps = NativeStackScreenProps<
  RootStackParamList,
  "NetworkConfig"
>;

export default function NetworkConfigScreen({ navigation }: NetConfigProps) {
  const { style, contextData, isSending, readFromIris } =
    useNetworkConfigScreenHooks();

  console.log("Load NetworkConfigScreen", contextData.networkConfig);

  return (
    <View style={style.safeContainer}>
      <ScrollView>
        <View style={style.container}>
          <NetInterface iface={NetIface.ETH} navigation={navigation} />
          <NetInterface iface={NetIface.WLAN} navigation={navigation} />
          <NetInterface iface={NetIface.PPP} navigation={navigation} />
          <PrimaryButton
            disabled={isSending}
            style={style.ctaButton}
            title="Reload"
            onPress={async () => {
              readFromIris();
            }}
          />
          <Spinner visible={isSending} textContent={"Loading..."} />
        </View>
      </ScrollView>
    </View>
  );
}

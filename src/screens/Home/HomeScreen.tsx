import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FromScreen, RootStackParamList } from "~navigation/RootStackPrams";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import useHomeScreenHooks from "./useHomeScreenHooks";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeProps) {
  const { style } = useHomeScreenHooks();

  return (
    <View style={style.safeContainer}>
      <View style={style.container}>
        <Text style={style.title}>IRIS Setup</Text>
        <PrimaryButton
          style={style.ctaButton}
          title="License Activation"
          onPress={() => {
            navigation.navigate("QR");
          }}
        />
        <PrimaryButton
          style={style.ctaButton}
          title="Network Configuration"
          onPress={() => {
            navigation.navigate("BLE", { from: FromScreen.NetworkConfig });
          }}
        />
        <PrimaryButton
          style={style.ctaButton}
          title="Monitoring"
          onPress={() => {
            navigation.navigate("BLE", { from: FromScreen.Monitoring });
          }}
        />
      </View>
    </View>
  );
}

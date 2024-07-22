import { View, Text, ImageBackground, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FromScreen, RootStackParamList } from "~navigation/RootStackPrams";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import useHomeScreenHooks from "./useHomeScreenHooks";
import background from "assets/images/BG_HOME.jpg";
import logo from "assets/images/logo_iris.png";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeProps) {
  const { style } = useHomeScreenHooks();

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={style.safeContainer}
    >
      <View style={style.container}>
        <Image style={style.logo} source={logo} />
        <Text style={style.title}>IRIS SETUP</Text>
        <PrimaryButton
          style={style.ctaButton}
          title="License Activation"
          onPress={() => {
            navigation.navigate("LicenseStack");
          }}
        />
        <PrimaryButton
          style={style.ctaButton}
          title="Network Configuration"
          onPress={() => {
            navigation.navigate("NetworkStack");
          }}
        />
        <PrimaryButton
          style={style.ctaButton}
          title="Monitoring"
          onPress={() => {
            navigation.navigate("MonitorStack");
          }}
        />
      </View>
    </ImageBackground>
  );
}

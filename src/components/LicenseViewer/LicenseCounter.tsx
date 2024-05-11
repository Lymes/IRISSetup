import useLicenseCounterHooks from "./useLicenseCounterHooks";
import { Text, View } from "react-native";

const LicenseCounter = () => {
  const { style, contextData } = useLicenseCounterHooks();

  return (
    <View style={style.Container}>
      <Text>{"Locked licenses: " + contextData.cloudData.length}</Text>
    </View>
  );
};

export default LicenseCounter;

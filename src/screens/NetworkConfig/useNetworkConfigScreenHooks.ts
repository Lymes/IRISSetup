import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./NetworkConfigScreen.style";
import { RootStackParamList } from "~navigation/RootStackPrams";

export type HomeNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default () => {
  const style = useThemedStyles(styles);

  return {
    style,
  };
};

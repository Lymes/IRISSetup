import { useAppContext } from "~hooks/useAppContext";
import useTheme from "~hooks/useTheme";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./IPV4Settings.style";

export default () => {
  const theme = useTheme();
  const style = useThemedStyles(styles);
  const { contextData } = useAppContext();

  return {
    style,
    theme,
    contextData,
  };
};

import { useAppContext } from "~hooks/useAppContext";
import useTheme from "~hooks/useTheme";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./IPV4Settings.style";

export default () => {
  const theme = useTheme();
  const style = useThemedStyles(styles);

  function validateIPv4(ipv4: string) {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipv4
    );
  }

  return {
    style,
    theme,
    validateIPv4,
  };
};

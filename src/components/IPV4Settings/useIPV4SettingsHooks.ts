import useTheme from "~hooks/useTheme";
import useThemedStyles from "~hooks/useThemedStyles";
import { styles } from "./IPV4Settings.style";

export default () => {
  const theme = useTheme();
  const style = useThemedStyles(styles);

  function validateIPv4(ipv4: string) {
    return true;
    // return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/(3[0-2]|[1-2]?\d)$/.test(
    //   ipv4
    // );
  }

  return {
    style,
    theme,
    validateIPv4,
  };
};

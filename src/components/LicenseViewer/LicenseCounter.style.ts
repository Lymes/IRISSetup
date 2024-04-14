import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    Container: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: 20,
      backgroundColor: "red",
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
    },
  });
};

export { styles };

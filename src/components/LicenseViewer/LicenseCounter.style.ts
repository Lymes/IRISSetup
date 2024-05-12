import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    Container: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: 30,
      backgroundColor: "#8cd3f6",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    label: {
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
    },
  });
};

export { styles };

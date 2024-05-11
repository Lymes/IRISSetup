import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    Container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      rowGap: 20,
    },
    group: {
      width: "80%",
      rowGap: 5,
    },
    maskedInput: {
      borderWidth: 0.5,
      borderRadius: 4,
      width: "80%",
      padding: 12,
      color: "black",
      fontSize: 20,
    },
    label: {
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
    },
  });
};

export { styles };

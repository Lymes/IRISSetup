import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    Container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      rowGap: 10,
    },
    group: {
      width: "100%",
      rowGap: 5,
    },
    maskedInput: {
      borderWidth: 0.5,
      borderRadius: 4,
      padding: 12,
      color: "black",
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
    },
    label: {
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
    },
  });
};

export { styles };

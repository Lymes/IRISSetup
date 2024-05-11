import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    Container: {
      width: "100%",
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 20,
      paddingRight: 20,
      columnGap: 10,
    },
    LeftContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      columnGap: 10,
    },
    label: {
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
    },
  });
};

export { styles };

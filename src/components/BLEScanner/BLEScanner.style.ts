import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    scanContainer: {
      width: 300,
      height: 300,
      alignSelf: "center",
    },
    logContainer: {
      width: "100%",
      height: "80%",
      alignSelf: "stretch",
      borderRadius: 8,
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      padding: 10,
    },
    logText: {
      color: theme.colors.primary,
      fontFamily: theme.typography.family.light,
      fontSize: theme.typography.size.small,
      padding: 5,
    },
    buttonRow: {
      marginTop: 20,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    scanButton: {
      backgroundColor: theme.colors.primaryBackground,
      color: theme.colors.primaryForeground,
      borderRadius: 8,
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
      width: 100,
      height: 40,
      margin: 10,
    },
  });
};

export { styles };

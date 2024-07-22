import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    scanContainer: {
      width: "100%",
      height: 300,
      alignSelf: "center",
    },
    logContainer: {
      width: "100%",
      height: "100%",
      alignSelf: "stretch",
      backgroundColor: "#081425",
      padding: 10,
    },
    logText: {
      color: "white",
      fontFamily: theme.typography.family.light,
      fontSize: theme.typography.size.medium,
      padding: 5,
    },
    buttonRow: {
      marginTop: 20,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    scanButton: {
      alignSelf: "center",
      backgroundColor: theme.colors.primaryBackground,
      color: theme.colors.primaryForeground,
      borderRadius: 8,
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
      width: "80%",
      height: 40,
      marginTop: 20,
    },
  });
};

export { styles };

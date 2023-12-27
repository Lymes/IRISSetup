import { Dimensions, StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  const windowHeight = Dimensions.get("window").height;
  return StyleSheet.create({
    safeContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: windowHeight,
      backgroundColor: theme.colors.background,
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: windowHeight,
      zIndex: 0,
    },
    container: {
      flex: 1,
      alignItems: "stretch",
      // justifyContent: "flex-end",
      justifyContent: "center",
      zIndex: 1,
    },
    title: {
      color: theme.colors.primary,
      fontFamily: theme.typography.family.bold,
      fontSize: theme.typography.size.medium,
      alignSelf: "center",
      margin: 20,
    },
    description: {
      color: theme.colors.primary,
      fontFamily: theme.typography.family.light,
      fontSize: theme.typography.size.small,
      alignSelf: "center",
      margin: 20,
    },
    codeInput: {
      alignSelf: "center",
      fontFamily: theme.typography.family.regular,
      color: theme.colors.primary,
      width: "80%",
      height: 40,
      margin: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
    },
    sendButton: {
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

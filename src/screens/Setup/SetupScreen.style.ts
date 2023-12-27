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
      justifyContent: "flex-start",
      alignSelf: "center",
      width: "80%",
      zIndex: 0,
    },
    title: {
      marginTop: 100,
      alignSelf: "center",
      justifyContent: "center",
      fontFamily: theme.typography.family.bold,
      color: theme.colors.primary,
      fontSize: theme.typography.size.medium,
      height: 50,
    },
    valueRow: {
      alignSelf: "flex-start",
      flexDirection: "row",
    },
    ssidLabel: {
      margin: 5,
      alignSelf: "flex-start",
      justifyContent: "center",
      fontFamily: theme.typography.family.bold,
      color: theme.colors.borderColor,
      fontSize: theme.typography.size.small,
    },
    ssidValue: {
      margin: 5,
      alignSelf: "flex-start",
      justifyContent: "center",
      fontFamily: theme.typography.family.bold,
      color: theme.colors.primary,
      fontSize: theme.typography.size.small,
    },
    credentialsInput: {
      marginTop: 10,
      alignSelf: "center",
      fontFamily: theme.typography.family.regular,
      justifyContent: "center",
      width: "100%",
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "grey",
    },
    sendButton: {
      alignSelf: "center",
      backgroundColor: theme.colors.primaryBackground,
      color: theme.colors.primaryForeground,
      borderRadius: 8,
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
      width: "100%",
      height: 40,
      marginTop: 30,
    },
    description: {
      color: theme.colors.primary,
      fontFamily: theme.typography.family.light,
      fontSize: theme.typography.size.small,
    },
  });
};

export { styles };

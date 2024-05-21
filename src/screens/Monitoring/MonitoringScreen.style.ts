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
      rowGap: 20,
      zIndex: 1,
    },
    title: {
      marginTop: 80,
      color: theme.colors.primary,
      fontFamily: theme.typography.family.bold,
      fontSize: theme.typography.size.medium,
      alignSelf: "center",
    },
    logContainer: {
      alignSelf: "center",
      width: "80%",
      height: 300,
      borderRadius: 8,
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
    },
    logText: {
      color: theme.colors.primary,
      fontFamily: theme.typography.family.light,
    },
    ctaButton: {
      alignSelf: "center",
      backgroundColor: theme.colors.primaryBackground,
      color: theme.colors.primaryForeground,
      borderRadius: 8,
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
      width: "80%",
      height: 50,
    },
  });
};

export { styles };

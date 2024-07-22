import { Dimensions, Keyboard, StyleSheet } from "react-native";
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
      backgroundColor: theme.colors.secondaryBackground,
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: windowHeight,
      zIndex: 0,
    },
    keyboardView: {
      alignSelf: "flex-start",
      width: "100%",
    },
    container: {
      marginTop: 50,
      alignSelf: "center",
      width: "80%",
      alignItems: "flex-start",
      justifyContent: "center",
      color: "white",
      zIndex: 1,
    },
    settings: {
      alignSelf: "center",
      alignItems: "flex-start",
      justifyContent: "center",
      width: "80%",
      rowGap: 10,
      marginTop: 40,
    },
    group: {
      width: "100%",
      rowGap: 5,
    },
    maskedInput: {
      borderWidth: 0.5,
      borderRadius: 4,
      borderColor: "white",
      padding: 12,
      color: "white",
      fontSize: theme.typography.size.medium,
    },
    label: {
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.medium,
      color: "white",
    },
    title: {
      marginTop: 100,
      marginBottom: 100,
      color: theme.colors.secondary,
      fontFamily: theme.typography.family.bold,
      fontSize: theme.typography.size.large,
      alignSelf: "center",
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

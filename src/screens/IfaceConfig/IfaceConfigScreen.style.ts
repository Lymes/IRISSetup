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
      width: "80%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      // alignItems: "center",
      // justifyContent: "center",
      rowGap: 10,
      zIndex: 1,
    },
    ipSettings: {
      marginTop: 20,
    },
    title: {
      marginTop: 100,
      marginBottom: 100,
      color: theme.colors.primary,
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

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
    logo: {
      marginTop: 80,
      alignSelf: "center",
    },
    title: {
      marginBottom: 50,
      color: theme.colors.secondary,
      fontFamily: theme.typography.family.light,
      fontSize: theme.typography.size.huge,
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

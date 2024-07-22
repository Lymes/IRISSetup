import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondaryBackground,
    },
    background: {
      flex: 1,
      zIndex: 0,
    },
    box: {
      flex: 1,
      alignItems: "stretch",
      justifyContent: "flex-start",
      zIndex: 1,
    },
    title: {
      color: theme.colors.primary,
      fontFamily: theme.typography.family.bold,
      fontSize: theme.typography.size.medium,
      alignSelf: "center",
      margin: 20,
      marginTop: 50,
    },
    description: {
      color: "white",
      fontFamily: theme.typography.family.light,
      fontSize: theme.typography.size.medium,
      alignSelf: "center",
      margin: 20,
    },
    button: {
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

import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    Container: {
      width: "90%",
      height: 92,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      zIndex: 100,
      margin: 20,
      borderRadius: 10,
      borderColor: "#158CED",
      borderWidth: 1,
    },
    label: {
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.medium,
      color: "white",
    },
  });
};

export { styles };

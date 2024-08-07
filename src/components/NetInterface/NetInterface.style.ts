import { StyleSheet } from "react-native";
import { ThemeContextData } from "~themes/ThemeProvider";

const styles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    Container: {
      width: "90%",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      paddingLeft: 20,
      paddingRight: 20,
      alignSelf: "center",
      rowGap: 10,
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      borderRadius: 10,
      padding: 20,
    },
    TitleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      columnGap: 10,
    },
    LeftPartTitle: {
      flexDirection: "row",
      justifyContent: "flex-start",
      columnGap: 10,
    },
    details: {
      rowGap: 5,
    },
    settingRow: {
      flexDirection: "row",
      columnGap: 10,
      marginLeft: 25,
    },
    title: {
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.medium,
      color: "white",
    },
    label: {
      fontFamily: theme.typography.family.regular,
      fontSize: theme.typography.size.small,
      color: "white",
    },
  });
};

export { styles };

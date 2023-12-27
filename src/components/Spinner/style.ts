import { StyleSheet } from "react-native";

const transparent = "transparent";
const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: transparent,
    bottom: 0,
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  box: {
    backgroundColor: "#dededed0",
    alignSelf: "center",
    borderRadius: 8,
    padding: 10,
  },
  activityIndicator: {
    margin: 10,
  },
  textContainer: {},
  textContent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#585656",
    margin: 10,
  },
});

export default styles;

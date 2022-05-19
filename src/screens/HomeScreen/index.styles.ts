import { StyleSheet } from "react-native";
import { fonts, padding } from "../../styles/base";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D4ED8",
    flex: 1,
    width: null,
    height: null,
    padding: padding.xl,
  },
  heading: {
    fontSize: fonts["2xl"],
    fontWeight: "bold",
    color: "#FFF",
  },
  subtext: {
    fontSize: fonts.sm,
    color: "#93C5FD",
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { fonts, spacing, colors } from "../../styles/base";

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    flex: 1,
    width: null,
    height: null,
  },
  upperSection: {
    position: "relative",
    width: null,
    padding: spacing.xl,
  },
  contentSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: spacing.xl,
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
  categoryBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryTitle: {
    color: "#9CA3AF",
  },
  numberOfTodosInSection: {
    color: colors.primary,
    fontWeight: "bold",
  },
  pinImage: {
    width: 260,
    height: 250,
    position: "absolute",
    top: -30,
    right: -70,
    zIndex: -1,
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { colors, spacing } from "../../styles/base";

const styles = StyleSheet.create({
  categorySection: {
    marginTop: spacing.xl,
    flex: 1,
  },
  categoryBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  categoryTitle: {
    color: "#9CA3AF",
    fontWeight: "600",
  },
  numberOfTodosInSection: {
    color: colors.primary,
    fontWeight: "bold",
  },
  dividerLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#f1f5f9",
  },
  clearButton: {
    fontWeight: "bold",
    color: colors.primary,
  },
  categoryRightSide: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { fonts, spacing, colors } from "../../styles/base";

const styles = StyleSheet.create({
  categorySection: {
    marginTop: spacing.xl,
  },
  categoryBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md
  },
  categoryTitle: {
    color: "#9CA3AF",
    fontWeight: "600",
  },
  numberOfTodosInSection: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default styles;

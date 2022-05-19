import { StyleSheet } from "react-native";
import { fonts, spacing, colors } from "../../styles/base";

const styles = StyleSheet.create({
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
  todoList: {
    marginTop: spacing.lg,
  },
});

export default styles;

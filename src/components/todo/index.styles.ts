import { StyleSheet } from "react-native";
import { fonts, spacing, colors } from "../../styles/base";

const styles = StyleSheet.create({
  todo: {
    marginVertical: spacing.xl / 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  },
  todoTextSection: {
    marginLeft: spacing.xl,
  },
  todoText: {
    fontSize: fonts.base,
    fontWeight: "bold"
  },
  todoDeadline: {
    color: "#9CA3AF",
  },
  deletedTodoText: {
    fontSize: fonts.base,
    fontWeight: "bold",
    color: "#6B7280"
  },
});

export default styles;

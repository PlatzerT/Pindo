import { StyleSheet } from "react-native";
import { fonts, spacing, colors } from "../../styles/base";

const styles = StyleSheet.create({
  actionSection: {
    padding: spacing.xl,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentSection: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 60,
    padding: spacing.xl,
    shadowColor: "#1c33a4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  s1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  s2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xl,
  },
  todoTextInput: {
    fontSize: fonts.xl,
    color: "#111827",
    fontWeight: "900",
    maxWidth: "90%",
  },
  label: {
    marginBottom: 2,
  },
  showContinuouslySwitch: {
    marginRight: 5,
  },
  titleInput: {
    /*paddingVertical: 10,
    paddingHorizontal: 10,*/
    //backgroundColor: "#eff6ff",
    //borderRadius: 5,
    marginBottom: 37,
    fontSize: fonts.lg,
    fontWeight: "600",
  },
  descriptionInput: {
    fontSize: fonts.base,
    fontWeight: "600",
  },
  icon: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: spacing.md,
    color: colors.primary,
    overflow: "hidden",
  },
  calendarButton: {
    padding: 10,
    backgroundColor: "#e5eaff",
    borderRadius: 5,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    fontWeight: "800",
    letterSpacing: 1,
    fontSize: fonts.lg,
    color: "#fff",
  },
  priorityLabel: {
    marginBottom: 10,
  },
});

export default styles;

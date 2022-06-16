import { StyleSheet } from "react-native";
import { fonts, spacing, colors } from "../../styles/base";

const styles = StyleSheet.create({
    addButton: {
        padding: spacing.lg,
        backgroundColor: colors.primary,
        position: "absolute",
        left: 10,
        bottom: 10,
        borderRadius: 15,
        shadowColor: "#2f62da",
        shadowOffset: {
            width: 0,
            height: -1
        }
    },
    addButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: fonts.md,
    }
});

export default styles;

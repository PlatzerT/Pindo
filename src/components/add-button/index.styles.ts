import { StyleSheet } from "react-native";
import { fonts, spacing, colors } from "../../styles/base";

const styles = StyleSheet.create({
    addButton: {
        padding: spacing.lg,
        backgroundColor: colors.primary,
        position: "absolute",
        left: 20,
        bottom: 20,
        borderRadius: 25,
        shadowColor: "#2f62da",
        shadowOffset: {
            width: 0,
            height: -1
        }
    },
    addButtonIcon: {
        color: "#FFF",
    }
});

export default styles;

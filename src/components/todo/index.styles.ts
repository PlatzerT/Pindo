import {StyleSheet} from "react-native";
import {fonts, spacing, colors} from "../../styles/base";

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
    deleteStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        backgroundColor: "#10B981",
        borderRadius: 5,
        height: 48,
        elevation: 8,
        shadowColor: "#6EE7B7",
    },
    restoreStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        backgroundColor: "#F59E0B",
        borderRadius: 5,
        height: 48,
        elevation: 8,
        shadowColor: "#FCD34D"
    },
    iconStyle: {
        color: "#FFF",
    },
    swipeOuterBox: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    }
});

export default styles;

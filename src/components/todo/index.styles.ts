import {StyleSheet} from "react-native";
import {fonts, spacing} from "../../styles/base";

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
        fontWeight: "600"
    },
    todoDate: {
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
    },
    restoreStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        backgroundColor: "#F59E0B",
        borderRadius: 5,
        height: 48,
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

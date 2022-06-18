import React from "react";
import {Text, TouchableHighlight, View} from "react-native";
import {ITodo} from "../../models/ITodo";
import PriorityPoint from "../priority-point";
import styles from "./index.styles";
import {formatDate} from "../../utils/dateUtils";
import {colors} from "../../styles/base";
import {priorityToColor} from "../../utils/priorityUtils";
import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

interface IProps {
    todo: ITodo;
    navigation: any;
    onSwipeOpen: any;
}

export default function Todo({todo, navigation, onSwipeOpen}: IProps) {
    const {pointColor, ringColor} = priorityToColor(todo.priority);

    function onPress() {
        navigation.navigate("Edit", {todo: todo});
    }

    const leftSwipe = () => {
        return (
            <View style={styles.swipeOuterBox}>
                <View style={todo.isDeleted ? styles.restoreStyle : styles.deleteStyle}>
                    <Icon name={todo.isDeleted ? "skip-back": "check"} style={styles.iconStyle} size={24} />
                </View>
            </View>
        )
    }

    return (
        <GestureHandlerRootView>
            <Swipeable
                renderLeftActions={leftSwipe}
                onSwipeableOpen={() => onSwipeOpen()}
            >
                <TouchableHighlight
                    disabled={todo.isDeleted}
                    style={{borderRadius: 5}}
                    activeOpacity={0.8}
                    underlayColor={"#fafafa"}
                    onPress={() => onPress()}
                >
                    <View style={styles.todo}>
                        <PriorityPoint
                            pointColor={todo.isDeleted ? colors.pDeleted : pointColor}
                            ringColor={todo.isDeleted ? colors.pRingDeleted : ringColor}
                        />
                        <View style={styles.todoTextSection}>
                            <Text
                                style={todo.isDeleted ? styles.deletedTodoText : styles.todoText}
                            >
                                {todo.text}
                            </Text>
                            <Text style={styles.todoDate}>
                                {formatDate(todo.date)}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

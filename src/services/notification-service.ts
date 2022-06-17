import {ITodo} from "../models/ITodo";
import {priorityToColor} from "../utils/priorityUtils";
import * as Notifications from "expo-notifications";
import {formatDate} from "../utils/dateUtils";

export async function scheduleTodoNotification(t: ITodo) {
    let notifPriority = t.priority;
    if (notifPriority === "medium") {
        notifPriority = "default";
    }
    const {pointColor} = priorityToColor(t.priority);
    await Notifications.scheduleNotificationAsync({
        identifier: t.id,
        content: {
            title: t.text,
            body: formatDate(t.deadline),
            color: pointColor,
            priority: notifPriority,
            sticky: false,
            vibrate: [250, 0, 250, 250]
        },
        trigger: {
            seconds: 1
        }
    });
}
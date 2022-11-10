import { ITodo } from "../models/ITodo";
import * as Notifications from "expo-notifications";
import { colors } from "../styles/base";
import {
  AndroidImportance,
  NotificationRequestInput,
} from "expo-notifications";

export async function scheduleTodoNotification(t: ITodo) {
  const request: NotificationRequestInput = {
    identifier: t.id,
    content: {
      title: t.text,
      body: t.description,
      color: colors.pointActive,
      priority: "max",
      sticky: true,
      autoDismiss: false,
      vibrate: [250, 0, 250, 250],
    },
    trigger: null,
  };
  await Notifications.scheduleNotificationAsync(request);
}

export async function cancelScheduledTodoNotification(id: string) {
  await Notifications.dismissNotificationAsync(id);
  await Notifications.cancelScheduledNotificationAsync(id);
}

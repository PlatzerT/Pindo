import { ITodo } from "../models/ITodo";
import * as Notifications from "expo-notifications";
import { colors } from "../styles/base";

export async function scheduleTodoNotification(t: ITodo) {
  const request: Notifications.NotificationRequestInput = {
    identifier: t.id,
    content: {
      title: t.text,
      body: t.description,
      color: colors.pointActive,
      priority: "high",
      sticky: true,
      autoDismiss: false,
      vibrate: [250, 0, 250, 250],
    },
    trigger: {
      seconds: 1,
      channelId: "todos",
    },
  };
  await Notifications.scheduleNotificationAsync(request);
}

export async function cancelScheduledTodoNotification(id: string) {
  await Notifications.dismissNotificationAsync(id);
  await Notifications.cancelScheduledNotificationAsync(id);
}

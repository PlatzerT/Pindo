import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import * as Notification from "expo-notifications";
import { createTodo } from "@services/todo-service";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  useEffect(() => {
    Notification.getPermissionsAsync()
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Notification.getPermissionsAsync();
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          alert("Notifications will be unavailable now");
          return;
        }
      });
  }, []);

  useEffect(() => {
    //When app is closed
    const backgroundSubscription =
      Notification.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    //When the app is open
    const foregroundSubscription = Notification.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const triggerNotification = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "My First Notification",
        body: "Local Notification to be sent",
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  function onSave() {
    createTodo(null);
  }
  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={triggerNotification} />
      <Button title="Save" onPress={onSave} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

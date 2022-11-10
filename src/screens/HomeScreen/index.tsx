import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import { Image, Platform, Text, View } from "react-native";
import { scheduleTodoNotification } from "../../services/notification-service";
import { getAllTodos } from "../../services/storage-service";
import AddButton from "../../components/add-button";
import CategorySection from "../../components/category-section";
import { useTodos } from "../../context/TodosProvider";
import { colors, sharedStyles } from "../../styles/base";
import styles from "./index.styles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function HomeScreen({ navigation }) {
  const { getDeletedTodos, getActiveTodos } = useTodos();
  const [notification, setNotification] = useState<any | null>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    const getPermission = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Enable push notifications to use the app!");
          await AsyncStorage.setItem("expopushtoken", "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await AsyncStorage.setItem("expopushtoken", token);
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("pindo", {
          name: "Pindo",
          importance: Notifications.AndroidImportance.MAX,
          showBadge: true,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: colors.primary,
        });
      }
    };

    getPermission();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    getAllTodos().then((todos) => {
      todos.map((todo) => {
        scheduleTodoNotification(todo);
      });
    });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={sharedStyles.screenBackground}>
      <View style={styles.upperSection}>
        <Text style={styles.heading}>Pindo</Text>
        <Text style={styles.subtext}>Never forget anything{"\n"}again.</Text>
        <Image
          style={styles.pinImage}
          source={require("../../../assets/images/pin.png")}
        />
      </View>
      <View style={styles.contentSection}>
        {/* Active Todo Section */}
        <CategorySection
          sectionTitle="Active"
          todos={getActiveTodos()}
          navigation={navigation}
          todoSwipeAction={"delete"}
        />
        {/* History Todo Section */}
        <CategorySection
          sectionTitle="History"
          todos={getDeletedTodos()}
          navigation={navigation}
          todoSwipeAction={"restore"}
        />
      </View>
      <AddButton navigation={navigation} />
    </View>
  );
}

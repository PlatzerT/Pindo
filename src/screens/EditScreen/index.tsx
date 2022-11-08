import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import {
  LogBox,
  Platform,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useTodos } from "../../context/TodosProvider";
import { ITodo } from "../../models/ITodo";
import { scheduleTodoNotification } from "../../services/notification-service";
import { colors, sharedStyles } from "../../styles/base";
import styles from "./index.styles";

interface IProps {
  navigation: any;
  route: any;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function EditScreen({ navigation, route }: IProps) {
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    const getPermission = async () => {
      if (Constants.isDevice) {
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
        await Notifications.setNotificationChannelAsync("todos", {
          name: "Todos",
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

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const { todo } = route.params;
  const { saveTodo } = useTodos();
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  const textRef = useRef<TextInput>();
  const [text, setText] = useState(todo.text);
  const [description, setDescription] = useState(todo.description || "");

  function save() {
    if (text.length === 0 || text === "") {
      textRef.current.focus();
    } else {
      const t: ITodo = {
        id: todo.id,
        text: text,
        description: description,
        isChecked: todo.isChecked,
      };

      saveTodo(t).then(async () => {
        await scheduleTodoNotification(t);
        navigation.navigate("Home");
      });
    }
  }

  return (
    <View style={sharedStyles.screenBackground}>
      <View style={styles.contentSection}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.titleInput}
          value={text}
          ref={textRef}
          onChangeText={setText}
          selectTextOnFocus={true}
          blurOnSubmit={false}
          placeholder={"Title here"}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          selectTextOnFocus={true}
          multiline
          placeholder={"Description here"}
        />
      </View>
      <TouchableHighlight
        style={styles.actionSection}
        underlayColor={colors.primary}
        onPress={() => save()}
      >
        <View style={styles.center}>
          <Icon name="bookmark" style={styles.icon} size={24} />
          <Text style={styles.saveText}>Tap to save</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import {
  LogBox,
  Platform,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import Icon from "react-native-vector-icons/Feather";
import { useTodos } from "../../context/TodosProvider";
import { ITodo } from "../../models/ITodo";
import { scheduleTodoNotification } from "../../services/notification-service";
import { colors, sharedStyles } from "../../styles/base";
import { formatDate } from "../../utils/dateUtils";
import styles from "./index.styles";

interface IProps {
  navigation: any;
  route: any;
}

const priorities = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

function getButtonColorByIndex(i: number) {
  let btColor;
  switch (i) {
    case 0:
      btColor = colors.pLow;
      break;
    case 1:
      btColor = colors.pMedium;
      break;
    case 2:
      btColor = colors.pHigh;
      break;
  }
  return btColor;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function EditScreen({ navigation, route }: IProps) {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

    // @ts-ignore
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // @ts-ignore
        setNotification(notification);
      });

    // @ts-ignore
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

  const [date, setDate] = useState(todo.date ? todo.date : new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const textRef = useRef<TextInput>();
  const [text, setText] = useState(todo.text);
  const [continuous, setContinuous] = useState(todo.date == null);
  const toggleSwitch = () => {
    setContinuous((previousState) => !previousState);
  };
  const [priority, setPriority] = useState(todo.priority);

  function save() {
    if (text.length === 0 || text === "") {
      textRef.current.focus();
    } else {
      const t: ITodo = {
        id: todo.id,
        text: text,
        date: !continuous ? date : null,
        priority: priority,
        isDeleted: todo.isDeleted,
      };

      saveTodo(t).then(async () => {
        await scheduleTodoNotification(t);
        navigation.navigate("Home");
      });
    }
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  function onChangeDate(e, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  }

  return (
    <View style={sharedStyles.screenBackground}>
      <View style={styles.contentSection}>
        <Text style={styles.label}>Text</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          ref={textRef}
          onChangeText={setText}
          selectTextOnFocus={true}
          multiline
          blurOnSubmit={false}
          placeholder={"Text here"}
        />
        <View style={styles.s2}>
          <Text style={styles.label}>Deadline</Text>
          {continuous ? (
            <Text>-</Text>
          ) : (
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.calendarButton}
              onPress={() => showMode("date")}
            >
              <Text>{formatDate(date)}</Text>
            </TouchableOpacity>
          )}
          {show && (
            <DateTimePicker
              testID={"dateTimePicker"}
              value={date}
              // @ts-ignore
              mode={mode}
              is24Hour={true}
              display={"default"}
              onChange={onChangeDate}
            />
          )}
        </View>
        <View>
          <Text style={styles.priorityLabel}>Priority</Text>
          <RadioForm
            formHorizontal={true}
            animation={true}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {priorities.map((obj, i) => {
              const btColor = getButtonColorByIndex(i);
              return (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={obj.value === priority}
                    onPress={(value) => setPriority(value)}
                    borderWidth={2}
                    buttonInnerColor={btColor}
                    buttonOuterColor={btColor}
                    buttonSize={14}
                    buttonOuterSize={24}
                    buttonStyle={{}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(value) => setPriority(value)}
                    labelStyle={{ color: "#000" }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              );
            })}
          </RadioForm>
        </View>
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

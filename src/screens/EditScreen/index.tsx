import React, { useRef, useState } from "react";
import {
  LogBox,
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

export default function EditScreen({ navigation, route }: IProps) {
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

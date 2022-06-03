import React, {useRef, useState} from "react";
import {Keyboard, ScrollView, Switch, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {colors, sharedStyles} from "../../styles/base";
import styles from "./index.styles";
import Icon from 'react-native-vector-icons/Feather'
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {ITodo} from "../../models/ITodo";
import {useTodos} from "../../context/TodosProvider";
import { LogBox } from 'react-native';

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
  return btColor
}

export default function EditScreen({ navigation, route }: IProps) {
  const { todo } = route.params;
  const { saveTodo } = useTodos();
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const [text, setText] = useState(todo.text);
  const [isTextFocused, setIsTextFocused] = useState(false);
  const refsFocus = useRef(null);
  const [showContinuously, setShowContinuously] = useState(todo.deadline == null);
  const [deadlineDate, setDeadlineDate] = useState<Date>(todo.deadline != null ? todo.deadline : new Date());
  const toggleSwitch = () => setShowContinuously(previousState => !previousState);
  const [priority, setPriority] = useState(todo.priority);
  console.log(priority)

  function save() {
    const t: ITodo = {
      id: todo.id,
      text: text,
      deadline: !showContinuously ? deadlineDate : null,
      priority: priority,
      isDeleted: todo.isDeleted
    }
    saveTodo(t).then(() => {
      navigation.navigate("Home");
    })
  }

  function onEditClick() {
    if (!isTextFocused) {
      // @ts-ignore
      refsFocus.current.focus();
    } else {
      // @ts-ignore
      refsFocus.current.blur();
    }
    setIsTextFocused(!isTextFocused)
  }

  return <View style={sharedStyles.screenBackground}>
    <View style={styles.contentSection}>
      <View style={styles.s1}>
        <TextInput style={{...styles.todoTextInput, backgroundColor: isTextFocused ? "#D7DDFF": "transparent"}}
                   value={text}
                   onChangeText={setText}
                   ref={refsFocus}
                   selectTextOnFocus={true}
                   onSubmitEditing={() => setIsTextFocused(false)}
          placeholder={"Text here"}/>

        <TouchableOpacity onPress={() => onEditClick()}>
          <Icon name={"edit"} color="#9CA3AF" size={24}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.s2}>
        <View>
          <Text style={styles.label}>Deadline</Text>
          {!showContinuously ? <RNDateTimePicker
              style={styles.datePicker}
              mode={"date"}
              display={"calendar"}
              value={deadlineDate}
              onChange={(e, date: Date) => setDeadlineDate(date)}/>
          : <Text>-</Text>}
        </View>
        <View>
          <Text style={styles.label}>Show continuously</Text>
          <Switch
              style={styles.showContinuouslySwitch}
              trackColor={{ false: '#767577', true: '#D2D6FF' }}
              thumbColor={showContinuously ? '#4b58f3' : '#f4f3f4'}
              ios_backgroundColor="#fff"
              onValueChange={toggleSwitch}
              value={showContinuously}/>
        </View>
      </View>
      <View>
        <RadioForm
            formHorizontal={true}
            animation={true}
            style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}
        >
          {
            priorities.map((obj, i) => {
              const btColor = getButtonColorByIndex(i);
              return <RadioButton labelHorizontal={true} key={i}>
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
                    labelStyle={{ color: '#000'}}
                    labelWrapStyle={{}}
                />
              </RadioButton>
            })
          }
        </RadioForm>
      </View>
    </View>
    <TouchableHighlight
        style={styles.actionSection}
        underlayColor={colors.primary}
        onPress={() => save()}>
      <View style={styles.center}>
        <Icon name="bookmark" style={styles.icon} size={24} />
        <Text style={styles.saveText}>Tap to save</Text>
      </View>
    </TouchableHighlight>
  </View>;
}

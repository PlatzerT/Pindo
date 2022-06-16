import React, {useRef, useState} from "react";
import {
  Button,
  Keyboard,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import {colors, sharedStyles} from "../../styles/base";
import styles from "./index.styles";
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {ITodo} from "../../models/ITodo";
import {useTodos} from "../../context/TodosProvider";
import { LogBox } from 'react-native';
import { formatDate } from "../../utils/dateUtils";

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

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [text, setText] = useState(todo.text);
  const [isTextFocused, setIsTextFocused] = useState(false);
  const refsFocus = useRef(null);
  const [showContinuously, setShowContinuously] = useState(todo.deadline == null);
  const toggleSwitch = () => {
    setShowContinuously(previousState => !previousState);
  }
  const [priority, setPriority] = useState(todo.priority);

  function save() {
    const t: ITodo = {
      id: todo.id,
      text: text,
      deadline: !showContinuously ? date : null,
      priority: priority,
      isDeleted: todo.isDeleted
    }
    saveTodo(t).then(() => {
      navigation.navigate("Home");
    })
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  function onChangeDate(e, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  // style={{...styles.todoTextInput, backgroundColor: isTextFocused ? "#D7DDFF": "transparent"}}

  // @ts-ignore
  return <View style={sharedStyles.screenBackground}>
    <View style={styles.contentSection}>
      <Text style={styles.label}>Text</Text>
      <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          ref={refsFocus}
          selectTextOnFocus={true}
          placeholder={"Text here"}/>
      <View style={styles.s2}>
        <View>
          <Text style={styles.label}>Deadline</Text>
          {showContinuously ? <Text>-</Text> : <TouchableOpacity activeOpacity={0.4} style={styles.calendarButton} onPress={() => showMode('date')}><Text>{formatDate(date)}</Text></TouchableOpacity>}
          {show && <DateTimePicker
            testID={'dateTimePicker'}
            value={date}
            mode={mode}
            is24Hour={true}
            display={"default"}
            onChange={onChangeDate}
          />}
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

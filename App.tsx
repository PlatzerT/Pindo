import "react-native-gesture-handler";
import React, { useEffect } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditScreen from "./src/screens/EditScreen";
import TodosProvider from "./src/context/TodosProvider";
import {
  TapGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TapGestureHandler>
      <RotationGestureHandler>
        <TodosProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Edit" component={EditScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </TodosProvider>
      </RotationGestureHandler>
    </TapGestureHandler>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import React, { useEffect } from "react";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import TodosProvider from "./src/context/TodosProvider";
import EditScreen from "./src/screens/EditScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => console.log("ok"), []);
  return (
    <TodosProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodosProvider>
  );
}

registerRootComponent(App);

import React, {useEffect} from "react";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditScreen from "./src/screens/EditScreen";
import TodosProvider from "./src/context/TodosProvider";

const Stack = createNativeStackNavigator();

export default function App() {
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

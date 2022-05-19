import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import styles from "./index.styles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Pindo</Text>
        <Text style={styles.subtext}>Never forget anything again.</Text>
      </View>
    </SafeAreaView>
  );
}

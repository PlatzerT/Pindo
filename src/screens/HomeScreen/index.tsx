import {Button, Image, Text, View} from "react-native";
import React, {useState} from "react";
import styles from "./index.styles";
import CategorySection from "../../components/category-section";
import {activeTodos, deletedTodos} from "../../../mock/mockTodos";
import {ITodo} from "../../models/ITodo";
import {EPriority} from "../../models/EPriority";
import {getAllTodos, getTodoById, removeTodoById, storeTodo} from "../../services/storage-service";

export default function HomeScreen() {

    return (
    <View style={styles.background}>
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
        <CategorySection sectionTitle="Active" todos={activeTodos} />
        {/* History Todo Section */}
        <CategorySection sectionTitle="History" todos={deletedTodos} />
      </View>
    </View>
  );
}

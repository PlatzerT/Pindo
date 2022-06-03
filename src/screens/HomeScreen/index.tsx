import {Image, Text, View} from "react-native";
import React from "react";
import styles from "./index.styles";
import CategorySection from "../../components/category-section";
import {sharedStyles} from "../../styles/base";
import {useTodos} from "../../context/TodosProvider";

export default function HomeScreen({navigation}) {
    const { getDeletedTodos, getActiveTodos } = useTodos();
    return (
        <View style={sharedStyles.screenBackground}>
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
                <CategorySection
                    sectionTitle="Active"
                    todos={getActiveTodos()}
                    navigation={navigation}
                />
                {/* History Todo Section */}
                <CategorySection
                    sectionTitle="History"
                    todos={getDeletedTodos()}
                    navigation={navigation}
                />
            </View>
        </View>
    );
}

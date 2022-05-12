import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notification from 'expo-notifications';

Notification.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true
        };
    }
});

export default function App() {

    useEffect(() => {
        Notification.getPermissionsAsync()
            .then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    return Notification.getPermissionsAsync();
                }
                return statusObj;
            }).then(statusObj => {
            if (statusObj.status !== 'granted') {
                alert('Notifications will be unavailable now');
                return;
            }
        });
    }, []);

    useEffect(() => {
        //When app is closed
        const backgroundSubscription = Notification.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        //When the app is open
        const foregroundSubscription = Notification.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        return () => {
            backgroundSubscription.remove();
            foregroundSubscription.remove();
        }
    }, []);

    const triggerNotification = () => {
        Notification.scheduleNotificationAsync({
            content: {
                title: "My First Notification",
                body: "Local Notification to be sent"
            },
            trigger: {
                seconds: 1
            }
        });
    }
    return (
        <View style={styles.container}>
            <Button title="Send Notification" onPress={triggerNotification} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

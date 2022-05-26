import React from "react";
import { View, Button, Text } from 'react-native';
import storage from "../../models/storage";

export default function ListSavedStations({ navigation, setIsLoggedIn }) {
    return (
        <View>
            <Text>Dina faviritstationer: </Text>
            <Button
                title="Lägga till favoritstation"
                onPress={() => {
                    navigation.navigate("add");
                }}
            />
            <Button
                title="Logga ut"
                onPress={() => {
                    setIsLoggedIn(false);
                    storage.deleteToken();
                }}
            />
        </View>
    )
}
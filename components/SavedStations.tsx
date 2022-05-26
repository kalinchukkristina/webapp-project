import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, View, Text, Button } from "react-native";
import storage from "../models/storage";

import ListSavedStations from './savedStations/ListSavedStations';
import AddStation from './savedStations/AddStation';

const Stack = createNativeStackNavigator();

export default function SavedStations(props) {
    return (
        <Stack.Navigator initialRouteName="visa">
            <Stack.Screen name="visa" >
                {(screenProps) => <ListSavedStations {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="add" component={AddStation} />
        </Stack.Navigator>
    )
}

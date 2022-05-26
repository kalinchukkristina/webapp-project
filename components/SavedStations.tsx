import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, View, Text, Button } from "react-native";
import storage from "../models/storage";

import ListSavedStations from './savedStations/ListSavedStations';
import AddStation from './savedStations/AddStation';
import StationDetails from './StationDetails';

const Stack = createNativeStackNavigator();

export default function SavedStations(props) {
    return (
        <Stack.Navigator initialRouteName="Visa FavoritStationer">
            <Stack.Screen name="Visa FavoritStationer" >
                {(screenProps) => <ListSavedStations {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="add" component={AddStation} />
            <Stack.Screen name="Details">
                {(screenProps)=> <StationDetails {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

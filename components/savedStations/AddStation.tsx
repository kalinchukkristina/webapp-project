import { ScrollView, Text, Button } from "react-native";
import React, { useState } from 'react';
import StationsDropDown from './StationsDropDown';
import Station from './../../interfaces/station';
import userModel from './../../models/user';
import storage from "../../models/storage";


export default function AddStation ({ navigation }) {
    const [ favStation, setFavStation ] = useState<Partial<Station>>({});
    

    async function addStation() {
        const token = await storage.readToken();
        await userModel.addData(favStation, token);

        navigation.navigate("Visa FavoritStationer", { reload: true });
    }


    return (
        <ScrollView>
            <Text>Välj en station från lista</Text>
            <StationsDropDown
                station={favStation}
                setStation={setFavStation}
            />
            <Button
            title="Lägga till stationen"
            onPress={()=> {
                addStation();
            }}
            />
        </ScrollView>
    )
}
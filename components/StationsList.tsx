import React, { useEffect, useState } from "react";
import { View, ScrollView, Button, Text } from 'react-native';
import { Base, Typography } from "../styles";

import delayedModels from './../models/delayedModel';
import stationsModels from './../models/stationsModel';


export default function StationsList({ route, navigation }) {
    const { reload } = route.params || false;
    const [ stations, setStations ] = useState([]);
    const [ allStations, setAllStations ] = useState([]);

    if (reload) {
        getAllStations();
    }

    async function getAllStations() {
        const listOfStations = await delayedModels.getStationsDelayed();
        setStations(listOfStations);
    };

    async function getListOfAllExistingStations() {
        const listOfAllStations = await stationsModels.getStations();
        setAllStations(listOfAllStations);
    };

    useEffect( () => {
        getAllStations();
        getListOfAllExistingStations();
    }, [stations]);

    const listOfStationsWithDelays = stations
        .map((station, index) => {
            return <Button 
                title={station.AdvertisedLocationName}
                key={index}
                
                onPress={() => {
                    navigation.navigate('Details', {
                        station: station,
                        allStations: allStations
                    });
                }}
            />
        });

    return (
        <View style={Base.container}>
            <Text style={Typography.delayes}>Tågstationer med Förseningar:</Text>
            <ScrollView>
                {listOfStationsWithDelays}
            </ScrollView>
        </View>
    )
}
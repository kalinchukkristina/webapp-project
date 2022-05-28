
import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import storage from "../../models/storage";
import userModel from '../../models/user';
import stationsModels from '../../models/stationsModel';
import { Base, Typography } from './../../styles';


export default function ListSavedStations({ route, navigation, setIsLoggedIn }) {
    let { reload } = route.params || false;
    const [data, setData] = useState({});
    const [ allStations, setAllStations ] = useState([]);
    let stationObjects = [];

    if (reload) {
        getSavedUserData();
    }

    async function getSavedUserData() {
        const token = await storage.readToken();
        const res = await userModel.showData(token);

        setData(res.data);
    };

    async function getListOfAllExistingStations() {
        const listOfAllStations = await stationsModels.getStations();
        setAllStations(listOfAllStations);
    };


    useEffect(() => {
        getSavedUserData();
        getListOfAllExistingStations();
    }, []);


    for (let i=0; i < data.length; i++) {
        let name = stationsModels.getStationName(data[i].artefact, allStations);
        stationObjects.push({AdvertisedLocationName:name, LocationSignature:data[i].artefact});
    }

    let listOfStations = stationObjects.map((station, index)=> {
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
        <View>
            <View>
                <Text style={Typography.header2}>Dina Stationer: </Text>
                {listOfStations}
            </View>
            <View style={Base.btn}>
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
        </View>
    )
}

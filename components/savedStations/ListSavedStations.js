
import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import storage from "../../models/storage";
import userModel from '../../models/user';
import stationsModels from '../../models/stationsModel';


export default function ListSavedStations({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [data, setData] = useState([]);
    const [ allStations, setAllStations ] = useState([]);
    const [ arrayOfStationObjects, setArrayOfStationObjects ] = useState([]);
    let stationObjects = [];
    
    async function getSavedUserData() {
        const token = await storage.readToken();
        const res = await userModel.showData(token);
        console.log(res);

        setData(res.data);
    };

    async function getListOfAllExistingStations() {
        const listOfAllStations = await stationsModels.getStations();
        setAllStations(listOfAllStations);
    };

    useEffect(() => {
        getSavedUserData();
        getListOfAllExistingStations();
        let res = makeList()
        setArrayOfStationObjects(res);
    }, [data])

    function makeList() {
        for(let i=0; i < data.length; i++) {
            let name = stationsModels.getStationName(data[i].artefact, allStations);
            stationObjects.push({AdvertisedLocationName:name, LocationSignature:data[i].artefact});
        }

        return stationObjects;
    }

    let listOfStations = arrayOfStationObjects.map((station, index)=> {
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
            <Text>Dina faviritstationer: </Text>
            {listOfStations}
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

/*export default function ListSavedStations({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    

    if (reload) {
        getSavedUserData();
    }

    

/*    async function name(akronym) {
        let stationName = await stationsModels.getStationNameAsync(akronym);
        console.log(stationName);
        return stationName;
    }*/

/*    ;*/

/*    const listOfFavStations = data.map((station, index)=> {
//        let stationName = name(station.artefact);
        console.log(stationName)
        return (
            <Button 
                title={"dcds"}
                key={index}
            />
        )
    })
    return (
        <View>
            <Text>Dina favoritstationer: </Text>
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
}*/
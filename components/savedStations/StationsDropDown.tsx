import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import stationsModels from './../../models/stationsModel';

export default function StationsDropDown(props) {
    const [ allStations, setAllStations ] = useState([]);

    async function getListOfAllExistingStations() {
        const listOfAllStations = await stationsModels.getStations();
        setAllStations(listOfAllStations);
    };

    useEffect( () => {
        getListOfAllExistingStations();
    }, []);

    const allStationsNames = allStations.map((chosenStation, index) => {
        return (
            <Picker.Item label={chosenStation.AdvertisedLocationName} value={chosenStation.LocationSignature} key={index}/>
        )
    });
    console.log(props.station);
    return (
        <Picker
            selectedValue={props.station?.LocationSignature}
            onValueChange={(itemValue) => {
                props.setStation({ LocationSignature: itemValue})
            }}>
            {allStationsNames}
        </Picker>
    )
}
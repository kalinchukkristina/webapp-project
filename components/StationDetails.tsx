import { View, Text, ScrollView, } from "react-native";
import { useEffect, useState } from "react";
import { Base, Typography } from "../styles";

import delayedModels from './../models/delayedModel';
import stationsModels from './../models/stationsModel';

export default function StationDetails({ route, navigation }) {
    const { station, allStations } = route.params;
    const [delayedStation, setDelayedStation ] = useState([]); //a station with all delayed trains on it

    async function getDelayedInfo() {
        try {
            const res = await delayedModels.getDelayedByStation(station.LocationSignature);
            setDelayedStation(res);
        } catch(e) {
            //error
        }
    };

    useEffect( () => {
        getDelayedInfo();
    }, []);

    const filteredTrainsOnStation = delayedModels.getDelayedOneStationManyTrains(delayedStation);

    const infoFillteredTrains = filteredTrainsOnStation.map((train, index) => {
        return <View style={Base.details} key={index}>
            <Text style={Typography.train}>Från: {station.AdvertisedLocationName}</Text>
                <Text style={Typography.train}>Till: {stationsModels.getStationName(train.ToLocation[0].LocationName, allStations)}</Text>
                <Text>Beskrivning: {train.ActivityType}</Text>
                <Text>Tågnummer: {train.AdvertisedTrainIdent}</Text>
                <Text>Planerad ankomst vid destination: {train.AdvertisedTimeAtLocation} </Text>
                <Text>Uppskattad ankomsttid vid destination: {train.EstimatedTimeAtLocation} </Text>
        </View>
    });

    if (delayedStation.length === 1) {
        return (
            <View>
                <Text style={Typography.train}>Från: {station.AdvertisedLocationName}</Text>
                <Text style={Typography.train}>Till: {stationsModels.getStationName(delayedStation[delayedStation.length-1].AdvertisedTrainIdent, allStations)} </Text>
                <Text>Beskrivning: {delayedStation[delayedStation.length-1].ActivityType}</Text>
                <Text>Tågnummer: {delayedStation[delayedStation.length-1].AdvertisedTrainIdent}</Text>
                <Text>Planerad ankomst vid destination: {delayedStation[delayedStation.length-1].AdvertisedTimeAtLocation} </Text>
                <Text>Uppskattad ankomsttid vid destination: {delayedStation[delayedStation.length-1].EstimatedTimeAtLocation} </Text>
            </View>
        )
    } else if (delayedStation.length > 1) {
        return (
            <ScrollView>
                {infoFillteredTrains}
            </ScrollView>
        )
    } else {
        return (
            <View>
                <Text>Ingen information om stationen.</Text>
            </View>
        )
    }
}
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

import delayedModels from './../models/delayedModel';
import stationsModels from './../models/stationsModel';

export default function Map () {
    const [ stations, setStations ] = useState([]);
    const [ delayed, setDelayed ] = useState([]);

    async function getAllStations() {
        try {
            const listOfStations = await delayedModels.getStationsDelayed();
            setStations(listOfStations);
        } catch(e) {
            //error
        }
    };

    async function getDelayed() {
        try {
            const delayedList = await delayedModels.getDelayed();
            setDelayed(delayedList);
        } catch (e) {
            //error
        }
        
    };

    useEffect( () => {
        getAllStations();
        getDelayed();
    }, []);

    const markers = stations.map((station, index) => {
        let coordinates = stationsModels.getStationCoordinates(station);
        let info = delayedModels.getDelayedByStationNotAsync(station.LocationSignature, delayed);
        if (info[info.length-1] !== undefined) {
            let description = `Train: ${info[info.length-1].AdvertisedTrainIdent} Uppskattad ankomst: ${info[info.length-1].AdvertisedTimeAtLocation}`;
            return (
                <Marker
                key={index}
                coordinate={{latitude: parseFloat(coordinates[1]), longitude: parseFloat(coordinates[0])}}
                title={station.AdvertisedLocationName}
                description={ description }
                />
            )
        } else {
            return (
                <Marker
                key={index}
                coordinate={{latitude: parseFloat(coordinates[1]), longitude: parseFloat(coordinates[0])}}
                title={station.AdvertisedLocationName}
                description={ "information unavailable" }
                />
            )
        }
    })


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 13.0,
                    longitudeDelta: 13.0,
                }}>
                {markers}
            </MapView>
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
  });
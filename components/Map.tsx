import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Base, Typography } from "../styles";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

import delayedModels from './../models/delayedModel';
import stationsModels from './../models/stationsModel';

export default function Map () {
    const [ stations, setStations ] = useState([]);

    async function getAllStations() {
        const listOfStations = await delayedModels.getStationsDelayed();
        setStations(listOfStations);
    };

    useEffect( () => {
        getAllStations();
    }, []);


    const markers = stations.map((station, index) => {
        let coordinates = stationsModels.getStationCoordinates(station);
        return (
            <Marker
            key={index}
            coordinate={{latitude: parseFloat(coordinates[1]), longitude: parseFloat(coordinates[0])}}
            title={station.AdvertisedLocationName}
            description={"details"}
            />
        )
    })


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 10.0,
                    longitudeDelta: 10.0,
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
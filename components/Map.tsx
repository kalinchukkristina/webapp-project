import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";

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
        let filteredTrains = delayedModels.getDelayedOneStationManyTrains(info);
        if (info[info.length-1] !== undefined) {
            if (filteredTrains.length == 1) {
                    return (
                    <Marker
                    key={index}
                    coordinate={{latitude: parseFloat(coordinates[1]), longitude: parseFloat(coordinates[0])}}
                    title={station.AdvertisedLocationName}
                    >
                        <Callout tooltip={true}>
                            <View style={styles.callout}>
                                <Text style={styles.station}>
                                    {station.AdvertisedLocationName}
                                </Text>
                                <Text>
                                    Train: {info[info.length-1].AdvertisedTrainIdent}
                                </Text>
                                <Text>
                                    Uppskattad ankomst: {info[info.length-1].AdvertisedTimeAtLocation}
                                </Text>
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow}/>
                        </Callout>
                    </Marker>
                )
            } else if (filteredTrains.length > 1) {
                    return (
                        <Marker
                        key={index}
                        coordinate={{latitude: parseFloat(coordinates[1]), longitude: parseFloat(coordinates[0])}}
                        title={station.AdvertisedLocationName}
                    >
                        <Callout tooltip={true} style={styles.callout}>
                            <Text style={styles.station}>
                                {station.AdvertisedLocationName}
                            </Text>
                        {filteredTrains.map((train, index) => { 
                            return (
                            <View key={index} style={styles.aFewTrains}>
                                <Text>
                                    Train: {train.AdvertisedTrainIdent}
                                </Text>
                                <Text>
                                    Uppskattad ankomst: {train.AdvertisedTimeAtLocation}
                                </Text>
                            </View>
                        )
                        })}
                        </Callout>
                    </Marker>
                    )
            }
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
    callout: {
        width: 200,
        backgroundColor: '#fff',
        padding:10
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -2
    },
    station: {
        fontWeight: 'bold'
    },
    aFewTrains: {
        marginTop: 8
    }
  });
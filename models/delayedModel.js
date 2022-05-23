import stationsModel from './../models/stationsModel';


const delayed = {
    // get information about delayed trains from API
    getDelayed: async function getDelayed() {
        const response = await fetch('https://trafik.emilfolino.se/delayed');
        const result = await response.json();

        return result.data;
    },

    // gets a list of all stations where there are delayed trains
    getStationsDelayed: async function getStationsDelayed () {
        const listOfStations = await stationsModel.getStations();
        const listOfDelayed = await this.getDelayed();

        const filteredDelayed = [];
        const listOfLocationNames = [];
        const listOfStationsWithDelayedTrains = [];

        for (let i=0; i < listOfDelayed.length; i++) {
            filteredDelayed.push(listOfDelayed[i].FromLocation)
        };

        for (let j=0; j < filteredDelayed.length; j++) {
            if (filteredDelayed[j] !== undefined ) {
                listOfLocationNames.push(filteredDelayed[j][0].LocationName);
            }
        };

        listOfStations.filter((station) => {
            if (listOfLocationNames.includes(station.LocationSignature)) {
                listOfStationsWithDelayedTrains.push(station);
            }
        })


        return listOfStationsWithDelayedTrains;
    },

    //get information about all delayed trains on a specific station
    getDelayedByStation: async function getDelayedByStation(station) {
        const listOfDelayed = await this.getDelayed();
        const listOfInfo = [];
        for(let i=0; i < listOfDelayed.length; i++) {
            if (listOfDelayed[i].FromLocation !== undefined ) {
                if (listOfDelayed[i].FromLocation[0].LocationName === station) {
                    listOfInfo.push(listOfDelayed[i])
                }
            }
        }

        return listOfInfo;
    },

    getDelayedByStationNotAsync: function getDelayedByStation(station, listOfDelayed) {
        const listOfInfo = [];
        for(let i=0; i < listOfDelayed.length; i++) {
            if (listOfDelayed[i].FromLocation !== undefined ) {
                if (listOfDelayed[i].FromLocation[0].LocationName === station) {
                    listOfInfo.push(listOfDelayed[i])
                }
            }
        }

        return listOfInfo;
    },

    // filters out trains and removes duplicates, returns a list of trains with the last record about them
    getDelayedOneStationManyTrains: function getDelayedOneStationManyTrains(allTrainsOnStation) {
        const manyTrains = [];
        const listOfTrainNumbers = [];

        for (let i=allTrainsOnStation.length-1; i >= 0; i--) {
            let currentTrain = allTrainsOnStation[i];
            if (!(listOfTrainNumbers.includes(currentTrain.AdvertisedTrainIdent ))) {
                listOfTrainNumbers.push(currentTrain.AdvertisedTrainIdent);
                manyTrains.push(currentTrain);
            }
        }

        return manyTrains;
    }
}

export default delayed;
const stations = {
    getStations: async function getStations() {
        const response = await fetch('https://trafik.emilfolino.se/stations');
        const result = await response.json();

        return result.data;
    },

    getStationName: function getStationName(akronym, allStations) {
        for (let i =0; i < allStations.length; i++) {
            if (allStations[i].LocationSignature == akronym) {
                return allStations[i].AdvertisedLocationName;
            } 
        }
        return akronym;
    }
}

export default stations;
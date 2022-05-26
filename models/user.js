import config from "../config/config.json";


const user = {
    addData: async function addData(station, token) {
        const newData = {
            artefact: station.LocationSignature,
            api_key: config.api_key
        };

        const response = await fetch(`${config.base_url}/data`, {
            body: JSON.stringify(newData),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
            method: 'POST'
        });

        let res = await response.json();
    },

    showData: async function showData(token) {
        const response = await fetch(`${config.base_url}/data?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token
            },
            method: 'GET'
        });
        const result = await response.json();

        return result;
    },

    getAllUsers: async function getAllUsers() {
        const response = await fetch(`${config.base_url}/users?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    }
}

export default user;
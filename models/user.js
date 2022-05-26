import config from "../config/config.json";


const user = {
/*    addData: async function addData() {
        return ();
    },*/

    showData: async function showData(token) {
        const response = await fetch(`${config.base_url}/data?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token
            },
            method: 'GET'
        });
        const result = await response.json();
        console.log(result);
        return result.data;
    },

    getAllUsers: async function getAllUsers() {
        const response = await fetch(`${config.base_url}/users?api_key=${config.api_key}`);
        const result = await response.json();
        console.log(result);
        return result.data;
    }
}

export default user;
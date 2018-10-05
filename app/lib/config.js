//all config details will store in this file

var config = {
    apiconfig: function () {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        }
    },
}

export default config;
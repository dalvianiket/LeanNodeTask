import axios from 'axios';
import config from './config';

//handling asynchronous call through axios
var api = {
    getData: function () {
        return new Promise(function (resolve, reject) {
            axios.get("http://192.168.56.1:5500/get", config.apiconfig()).then(result => {
                resolve(result.data)
            }).catch(err => reject(err.message))
        })
    },
    setData: function (name, lat, lang, type, phone) {
        return new Promise(function (resolve, reject) {
            axios.post("http://192.168.56.1:5500/set", {
                name: name,
                lat: lat,
                lang: lang,
                type: type,
                phone: phone
            }, config.apiconfig()).then(result => {
                resolve(result.data)
            }).catch(err => reject(err.message))
        })
    }
}

export default api;
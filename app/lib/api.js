import axios from 'axios';
import config from './config';

var api = {
    getData: function () {
        return new Promise(function (resolve, reject) {
            axios.get("http://10.0.100.244:5500/get", config.apiconfig()).then(result => {
                resolve(result.data)
            }).catch(err => reject(err.message))
        })
    },
    setData: function (name, lat, lang, type, phone) {
        return new Promise(function (resolve, reject) {
            axios.post("http://10.0.100.244:5500/set", {
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
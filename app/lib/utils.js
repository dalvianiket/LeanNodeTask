import { Alert } from 'react-native';

//common methods are written here
var utils = {
    alertMessage: function (text) {
        Alert.alert(
            '',
            text, [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ]);
    }
}
export default utils;
import {StyleSheet} from 'react-native';

const styles=StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    markerView: {
        backgroundColor: "white", 
        width: 200, 
        flex: 1, 
        borderRadius: 5 
    },
    markerTitleText: {
        alignSelf: 'center', 
        justifyContent: 'center', 
        flex: 1, 
        fontWeight: 'bold', 
        fontSize: 18 
    }, 
    markerDescriptionText:{
        alignSelf: 'center', 
        justifyContent: 'center', 
        flex: 1 
    },
    // AddPage Stylesheet
    headerView:{
        flex: 1, 
        marginRight: "10%"
    },
    headerTitle:{
        fontWeight: 'bold', 
        fontSize: 18, 
        alignSelf: 'center'
    },
    selectPlaceCol: {
        margin: "5%", 
        paddingTop: '3%'
    },
    selectPlaceText: {
        flex: 1, 
        fontWeight: 'bold', 
        justifyContent: 'center' 
    },
    defaultCol: {
        margin: '5%'
    },
    textFieldStyle: {
        height: 40, 
        borderColor: 'gray', 
        borderBottomWidth: 1
    },
    buttonStyle: {
        paddingLeft: '10%', 
        paddingRight: '10%'
    },
    customMarkerView: {
        backgroundColor: 'white',
        margin: 10
    }
});

  export default styles;
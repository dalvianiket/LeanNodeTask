import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
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
    markerDescriptionText: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // AddPage Stylesheet
    headerView: {
        flex: 1,
        marginRight: "10%"
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'
    },
    selectPlaceCol: {
        margin: "5%",
        paddingTop: Platform.OS == 'ios' ? '20%' : '3%'
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
        width: 150,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10
    },
    placeNameFieldStyle: {
        height: 100,
        marginTop: "25%"
    },
    dropdownRowHeight: {
        height: 100
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default styles;
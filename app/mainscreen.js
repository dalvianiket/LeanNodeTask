import React, { Component } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Button, Text, Icon } from 'native-base';
import utils from './lib/utils';
import api from './lib/api';
import styles from './styles';
import './lib/storage';

export default class Mainscreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      userData: [],
      modalVisible: true,
      ipText: '',
      url: '',
      check: false,
    }
  }

  componentDidMount = () => {
    this.previousIPCheck()
    this.setURL();
  }

  //fetch lat long on user click
  onMapPress(e) {
    this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          color: "red",
        },
      ],
    });
  }

  //passing lat long value to add page with validation
  addPage() {
    if (this.state.markers.length > 0) {
      this.props.navigation.navigate("Page", {
        latLong: this.state.markers,
        url: this.state.url
      })
    }
    else {
      utils.alertMessage("Please select location before add place")
    }
  }

  //customize marker title
  renderMarkerDetails(type, name) {
    return (
      <Callout tooltip style={styles.customMarkerView}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'flex-start', paddingRight: 10, paddingLeft: 10 }}>
            <Icon name={type == "Home" ? "home" : type == "Restaurant" ? "ios-pizza" : type == "Park" ? "md-flower" : null} />
          </View>

          <View>
            <Text style={styles.markerTitleText}>{type}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.markerDescriptionText}>{name}</Text>
        </View>
      </Callout>
    )
  }

  //render previous location on maps by using firebase database
  renderUserData() {
    if (this.state.userData.length > 0) {
      return this.state.userData.map((result, index) =>
        <Marker
          key={index}
          coordinate={result.coordinate}
          pinColor={result.type == "Home" ? "blue" : result.type == "Park" ? "green" ? result.type == "Restaurant" : "orange" : "cyan"}
          calloutOffset={{ x: -8, y: 28 }}
          calloutAnchor={{ x: 0.5, y: 0.4 }}
          title={result.type}
          description={result.name}
        >
          {this.renderMarkerDetails(result.type, result.name)}
        </Marker>
      )
    }
  }

  //Asking user for machine IP adress
  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
      >
        <View style={styles.modalView}>
          <View>
            <TextInput
              placeholder="Enter machine IP adress"
              style={styles.textFieldStyle}
              onChangeText={(ipText) => this.setState({ ipText })}
              value={this.state.ipText}
            />
            <View style={{ margin: '5%' }}>
              <Button
                onPress={() => { this.submitIP() }}>
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  submitIP() {
    this.setState({ modalVisible: false }, () => {
      this.storeToLocalStorage();
      this.setURL();
    })
  }

  //submit IP adress of user machine in local storage
  storeToLocalStorage() {
    storage.save({
      key: 'ipAdress',
      data: {
        ip: this.state.ipText
      }
    });
  }

  //setting up url and fetch data
  setURL() {
    storage.load({
      key: 'ipAdress',
      autoSync: true,
      syncInBackground: true,
    }).then(ret => {
      this.setState({ url: "http://" + ret.ip + ":5500" }, () => this.fetchData(this.state.url));
    }).catch(err => { console.log(err) })
  }

  // fetch data from firebase
  fetchData(baseURL) {
    api.getData(baseURL + "/get").then((data) => {
      data.map((result, index) => {
        let coordinateData = {
          longitude: parseFloat(result.lang),
          latitude: parseFloat(result.lat)
        }
        this.setState({
          userData: [
            ...this.state.userData
            , {
              coordinate: coordinateData,
              name: result.name,
              type: result.type
            }
          ]
        })
      })
    }).catch(err => console.log(err))
  }

  //checking if IP is present in localstorage
  previousIPCheck() {
    storage.load({
      key: 'ipAdress',
      autoSync: true,
      syncInBackground: true,
    }).then(ret => {
      console.log("Ip adress", ret.ip)
      if (ret.ip !== "") {
        this.setState({ modalVisible: false })
      }
    }).catch(err => { console.log(err) })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider="google"
          minZoomLevel={0}
          maxZoomLevel={20}
          onPress={(e) => this.onMapPress(e)}
        >
          {/* rendering marker on basis of user click */}
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
          {this.renderUserData()}
        </MapView>

        {this.renderModal()}
        <Button primary onPress={() => this.setState({ modalVisible: true })}>
          <Text>Reset IP</Text>
        </Button>
        
        <Button full info onPress={() => { this.addPage() }}>
          <Text>Add Place</Text>
        </Button>

      </View>
    )
  }
}
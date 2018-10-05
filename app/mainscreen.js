import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Button, Text, Icon } from 'native-base';
import utils from './lib/utils';
import api from './lib/api';
import styles from './styles';

export default class Mainscreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      userData: []
    }
  }

  componentDidMount = () => {
    //fetching data from firebase tabe
    api.getData().then((data) => {
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
        latLong: this.state.markers
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
          <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{justifyContent: 'flex-start', paddingRight: 10, paddingLeft: 10}}>
            <Icon name={type== "Home"? "home" : type== "Restaurant"? "ios-pizza": type== "Park"? "md-flower": null} />
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
          pinColor={"green"}
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
              title="Home"
              description="Why this is not showing"
            />
          ))}
          {this.renderUserData()}
        </MapView>

        <Button full info onPress={() => { this.addPage() }}>
          <Text>Add Place</Text>
        </Button>

      </View>
    )
  }
}
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Text, Icon } from 'native-base';
import utils from './lib/utils';
import api from './lib/api';

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
              placename: result.name,
              placeType: result.type
            }
          ]
        })
      })
    }).catch(err => console.log(err))
  }

  //fetch lat long on user click
  onMapPress(e) {
    console.log(e.nativeEvent.coordinate)
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

  //render previous location on maps by using firebase database
  renderUserData() {
    if (this.state.userData.length > 0) {
      return this.state.userData.map((result, index) => 
        <Marker
          key={index}
          coordinate={result.coordinate}
          pinColor={"green"}
          title={result.type}
          description={result.name}
        />
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
});
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Button, Text} from 'native-base';

export default class Mainscreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state={
      markers: []
    }
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          color: "red",
        },
      ],
    });
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
          minZoomLevel={17}
          maxZoomLevel={20}
          onPress={(e) => this.onMapPress(e)}
        >
        {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
        ))}
        </MapView>
        <Button full info onPress={()=> this.props.navigation.navigate("Page")}>
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
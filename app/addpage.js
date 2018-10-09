import React, { Component } from 'react';
import { TextInput, Picker, View, Platform } from 'react-native';
import { Grid, Col, Row, Button, Text } from 'native-base';
import utils from './../app/lib/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from './lib/api';
import styles from './styles';

const Header = () => (
    <View style={styles.headerView}>
        <Text style={styles.headerTitle}>Add Place</Text>
    </View>
)

export default class Addpage extends Component {
    static navigationOptions = {
        headerTitle: <Header />,
        headerTextStyle:
        {
            textAlign: 'center',
            flexGrow: 1,
            alignSelf: 'center'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            latLong: this.props.navigation.getParam('latLong'),
            url: this.props.navigation.getParam('url'),
            placeName: '',
            mobileNumber: '',
            placeType: 'Home',
            types: [{ value: 'Home' }, { value: 'Restaurant' }, { value: 'Park' }]
        }
    }

    //validations before submit values to the firebase
    validate() {
        if (this.state.placeName == '' || this.state.mobileNumber == '') {
            utils.alertMessage("Please enter values");
            return false;
        }
        if (this.state.placeName.length < 5) {
            utils.alertMessage("Place name should be more than 4 chars");
            return false;
        }
        //restricting user to enter numberic value by providing numberic keyboard
        if (this.state.mobileNumber.length > 10 || this.state.mobileNumber.length < 10) {
            utils.alertMessage("Mobile number must be of 10 digits")
            return false;
        }
        else {
            return true;
        }
    }

    //render place type for select place picker
    renderPickerItem() {
        return this.state.types.map((result, index) =>
            <Picker.Item key={index} label={result.value} value={result.value} />
        )
    }

    //on submit store given data on firebase database 
    submitDetails() {
        if (this.validate()) {
            api.setData(this.state.placeName, this.state.latLong[0].coordinate.latitude,
                this.state.latLong[0].coordinate.longitude, this.state.placeType,
                this.state.mobileNumber, this.state.url + "/set").then(() => {
                    this.props.navigation.navigate("MainScreen", {
                        setValue: "addPage"
                    })
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps='always'
                bounces={false}>
                <Grid>
                    <Row style={Platform.OS == 'ios' && styles.dropdownRowHeight}>
                        <Col style={styles.selectPlaceCol}>
                            <Text style={styles.selectPlaceText}>Select type of place: </Text>
                        </Col>
                        <Col style={{ margin: "5%" }}>
                            <Picker
                                mode={'dropdown'}
                                selectedValue={this.state.placeType}
                                style={{ width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ placeType: itemValue })}>
                                {this.renderPickerItem()}
                            </Picker>
                        </Col>
                    </Row>

                    <Row style={Platform.OS == 'ios' && styles.placeNameFieldStyle}>
                        <Col style={styles.defaultCol}>
                            <TextInput
                                placeholder="Place Name"
                                style={styles.textFieldStyle}
                                onChangeText={(placeName) => this.setState({ placeName })}
                                value={this.state.placeName}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={styles.defaultCol}>
                            <TextInput
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                style={styles.textFieldStyle}
                                onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
                                value={this.state.mobileNumber}
                            />
                        </Col>
                    </Row>


                    <Row>
                        <Col style={styles.defaultCol}>
                            <Button rounded info onPress={() => this.submitDetails()}>
                                <Text style={styles.buttonStyle}>Submit</Text>
                            </Button>
                        </Col>
                    </Row>
                </Grid>

            </KeyboardAwareScrollView>
        )
    }
}
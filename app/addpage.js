import React, { Component } from 'react';
import { TextInput, Picker, View } from 'react-native';
import { Grid, Col, Row, Button, Text } from 'native-base';
import utils from './../app/lib/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Header=()=>(
    <View style={{flex: 1, marginRight: "10%"}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, alignSelf: 'center'}}>Add Place</Text>
    </View>
)

export default class Addpage extends Component {
    static navigationOptions = {
        headerTitle: <Header/>,
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
            placeName: '',
            mobileNumber: '',
            placeType: 'Home',
            types: [{ value: 'Home' }, { value: 'Restaurant' }, { value: 'Park' }]
        }
    }

    componentWillMount = () => {
        console.log(this.state.type)
    }
    //validation
    validate() {
        if(this.state.placeName == '' || this.state.mobileNumber == ''){
            utils.alertMessage("Please enter values");
            return false;
        }
        if (this.state.placeName.length < 5) {
            utils.alertMessage("Place name should be more than 4 chars");
            return false;
        }
        if(this.state.mobileNumber.length > 10 || this.state.mobileNumber.length < 10){
            utils.alertMessage("Mobile number must be of 10 digits")
            return false;
        }
        else {
            return true;
        }
    }
    //render picker item
    renderPickerItem() {
        return this.state.types.map((result) =>
            <Picker.Item label={result.value} value={result.value} />
        )
    }
    //submit details
    submitDetails(){
        if(this.validate()){
            console.log('success')
            this.props.navigation.navigate("MainScreen")
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps='always'
                bounces={false}>
                <Grid>
                    <Row>
                        <Col style={{ margin: "5%", paddingTop: '3%' }}>
                            <Text style={{ flex: 1, fontWeight: 'bold', justifyContent: 'center' }}>Select type of place: </Text>
                        </Col>
                        <Col style={{ margin: "5%" }}>
                            <Picker
                                mode={'dropdown'}
                                selectedValue={this.state.placeType}
                                style={{ width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ placeType: itemValue })}>
                                {this.renderPickerItem()}
                            </Picker>
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ margin: "5%", height: 20 }}>
                            <TextInput
                                placeholder="Place Name"
                                style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                                onChangeText={(placeName) => this.setState({ placeName })}
                                value={this.state.placeName}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ margin: "5%" }}>
                            <TextInput
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                                onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
                                value={this.state.mobileNumber}
                            />
                        </Col>
                    </Row>


                    <Row>
                        <Col style={{margin: '5%'}}>
                            <Button rounded info onPress={() => this.submitDetails()}>
                                <Text style={{paddingLeft: '10%', paddingRight:'10%'}}>Submit</Text>
                            </Button>
                        </Col>
                    </Row>
                </Grid>

            </KeyboardAwareScrollView>
        )
    }
}
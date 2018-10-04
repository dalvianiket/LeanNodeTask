import React,{Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from './app/mainscreen';
import AddPage from './app/addpage'

const Stack= createStackNavigator({
  MainScreen: Main,
  Page: AddPage
},
{
  initialRouteName: 'MainScreen',
})
export default class App extends Component{
  render(){
    return(
      <Stack/>
    );
  }
}
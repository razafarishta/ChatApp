//import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
//import {View, Text} from 'react-native';
import SigninScreen from './screen/SigninScreen';
import SignupScreen from './screen/SignupScreen';
import ProfileScreen from './screen/ProfileScreen';
import ChatScreen from './screen/ChatScreen';


const SignTab = createStackNavigator({
  Signin:SigninScreen,
  Signup:SignupScreen,
  Profile:ProfileScreen,
  Chat:ChatScreen

},
{
  initialRouteName: 'Signin'
})
{/*
const ProfileTab =createStackNavigator({
  Profile:ProfileScreen,
  Chat:ChatScreen
})
const tabBar = createBottomTabNavigator({
  Signin:SignTab,
  Profile:ProfileTab,
})
*/}

const App = createAppContainer(SignTab);
export default App;


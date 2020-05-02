import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {firebaseAuth} from '../Enviorment/Config';
import Input from '../component/Input';
console.disableYellowBox = true

class SignupScreen extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    errorMessage: null,
    uid:''
  };

  handleSignUp = () => {
    console.log('signup');
    firebaseAuth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (firebaseAuth.currentUser) {
          var userId = firebaseAuth.currentUser.uid;
          console.log(userId);
          if (userId) {
            firebase.database()
              .ref('users/' + userId)
              .set({
                name: this.state.name,
                email: this.state.email,
                userid:userId
              })
              .then(success => this.props.navigation.push('Signin'))
              .catch(error => this.setState({errorMessage: error.message}));
          }
        }
      });
  };

  render() {
    return (
      <View style={styles.Container}> 
        <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 20}}>
          Sign Up
        </Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}

        <Input
          placeholder="Name"
          value={this.state.name}
          onChangeText={name => this.setState({name})}
        />
        <Input
          placeholder="Email"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <Input
          placeholder="Password"
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />

        <TouchableOpacity
        onPress={this.handleSignUp}
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: '#7a7aff',
            width:150,
            height:50,
            borderRadius:20
          }}>
          <Text style={{
              fontSize:20,
              fontWeight:'bold'
          }}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
  },
});
export default SignupScreen;

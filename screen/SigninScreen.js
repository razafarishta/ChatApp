import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Input from '../component/Input';
import * as firebase from 'firebase';
import {firebaseAuth} from '../Enviorment/Config'
console.disableYellowBox = true


class SigninScreen extends Component{
    state={
     email: '',
    password: '',
    errorMessage: null,
    LoggedIn:false
    };

    handleLogin=()=>{
        console.log('Login');
        firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            this.setState({LoggedIn: true});
            this.props.navigation.navigate('Profile')
        }).catch(error => this.setState({errorMessage: error.message}));
    };
    componentDidMount(){
        if(this.state.LoggedIn){
            this.props.navigation.push('Profile')
        }
    }
    render(){
        return(
            <ScrollView>
                 <View style={styles.Container}>
                <Text style={{fontSize:30, fontWeight:'bold', marginBottom:20}}>
                    Sign In
                </Text>
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
                <TouchableOpacity style={{
                       justifyContent: 'center',
                       alignContent: 'center',
                       alignItems: 'center',
                       backgroundColor: '#7a7aff',
                       width:140,
                       height:50,
                       borderRadius:20
                }}
                onPress={this.handleLogin}
                >
                    <Text style={{fontWeight:'bold', fontSize:25}}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
           
        )
    }
}
const styles= StyleSheet.create({

    Container:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        marginBottom:80
    },
    inputBox:{
        width:300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },

})
export default SigninScreen;
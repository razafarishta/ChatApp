import React, { Component } from 'react';
import {Text,View,TouchableOpacity,FlatList,Dimensions,KeyboardAvoidingView,SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
//import {Input,ChatInput} from './Common/'
import Input from '../component/Input';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button,Container, Header, Left, Body, Right, Title, Subtitle } from 'native-base';

import * as firebase from 'firebase'
import { firebaseAuth } from '../Enviorment/Config';

const {height,width}=Dimensions.get('window');
var msg_array = [];
export default class ChatScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            item:this.props.navigation.state.params.itemData,
            text:"",Reciever:"",sender:"",time:"",messages:[],loading:false,
            time:'',name:'',users:'',accepted:'',
        }

    }
    componentDidMount(){
        this.getMessage();
        console.log('item',this.state.item)
    }
    conversationId=(a,b)=>{
        if(a>b){
            return a+'-'+b;

        }
        else{
            return b+'-'+a;
        }
    }
    takeData(){
        var  users_data='';
         firebase.database().ref(`users/`).on("value",(snapshot)=>{
            snapshot.forEach(data=> {
            const uid=firebaseAuth.currentUser.uid
            if(data.val().userid===uid)
               users_data=(data.val().name)
            console.log("Name",users_data)  
            });
      this.setState({users:users_data},()=>{
        //console.log(this.state.users)
      this.setState({loading:false})
      })
      })
      users_data='';
      }
    onSend(){
        var uid=firebaseAuth.currentUser.uid
        var secuser=this.state.item.userid;
       console.log(uid);
            var today = new Date();
            var time = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
    
            var hour = time.getHours();
            var minutes = time.getMinutes();
            var ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12;
            if (minutes.toString().length == 1) {
                minutes = "0" + minutes;
            }
            if (hour.toString().length == 1) {
                hour = "0" + hour;
            }

            time = hour + ':' + minutes + " " + ampm;

        var dbref=firebase.database().ref(`messages/`);
        var key=dbref.push().key;
        var convId=this.conversationId(uid,secuser)
        
        
        if(this.state.text!==''){
        firebase.database()
            .ref(`messages/${convId}`).child(key)
            .set({
                text:this.state.text,
                Reciever:secuser,
                senderuid:uid,
                timestamp:firebase.database.ServerValue.TIMESTAMP,
                time:time,
                
            })
            firebase.database()
            .ref(`messages/${convId}/lastMessage`)
            .set({
                lastMessage:this.state.text,
                Reciever:secuser,
                senderuid:uid,
                timestamp:firebase.database.ServerValue.TIMESTAMP,
                time:time,
                name:this.state.users,
                accepted:'pending'
            })
        
        }
              
    }
    componentDidMount(){
        this.takeData();
        this.getMessage()
    }
    getMessage(){
        
        var uid = firebaseAuth.currentUser.uid
        var recieverId=this.state.item.userid;
        var currId=this.conversationId(uid,recieverId);
        console.log(currId)
        
         firebase.database().ref(`messages/${currId}`).on("value",(snapshot)=>{
            snapshot.forEach(messages=> {
              
                msg_array.push(messages.val())
               console.log("messages",msg_array)  
            });
            this.setState({messages:msg_array},()=>{
                this.state.messages.reverse();
                this.setState({loading:false})
            });
           msg_array = [];
        })
     
    }
    renderchtBox(item){
        var uid=firebaseAuth.currentUser.uid;
        if(uid===item.senderuid){
            return(
                <View style={{transform: [{ scaleY: -1 }],width:width/2,borderColor:'#29cf23',borderWidth:1,alignItems:'flex-start',alignSelf:'flex-end',borderColor:'#29cf23',borderWidth:.1,padding:10,marginTop:10,borderRadius:10,backgroundColor:'#29cf23'}}>
                    <Text style={{color:'white',fontSize:18}} >{item.text}</Text>
                    <Text style={{fontSize:12,alignSelf:"flex-end",color:'#FFFFFF'}}>{item.time}</Text>
                </View>
            );
        }
        if(uid!==item.senderuid){
            return(
                <View style={{transform: [{ scaleY: -1 }],borderColor:'green',borderWidth:1,alignItems:'flex-start',alignSelf:'flex-start',backgroundColor:'green',padding:10,marginTop:10,borderRadius:10}}>
                    <Text style={{color:'white',fontSize:16}}>{item.text}</Text>
                </View>
            );
        }
    }
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
             
             <Header style={{backgroundColor:'#29cf23'}}>
          <Left>
            <Button onPress={()=>this.props.navigation.pop()} transparent>
              <Icon name='ios-arrow-back'
               />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.item.name}</Title>
          </Body>
          
        </Header>
            
            <KeyboardAwareScrollView style={{flex:1}}>
              <View style={{height:height-150,backgroundColor:'#FFFFFF'}}>
                
                    <FlatList
                        style={{flex:1,margin:10,transform: [{ scaleY: -1 }]}}
                        data={this.state.messages}
                        extraData={this.state}
                        ListHeaderComponent={this.renderHeader}
                        renderItem={({item,index})=>{
                            return(
                                <View>
                                    {this.renderchtBox(item)}
                                </View>
                            )
                        }}
                        keyExtractor={(item,index)=>{index.toString()}}
                       // ListHeaderComponent={this.renderHeader}
                    />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Input
                        placeholder={'write message'}
                        value={this.state.text}
                        onChangeText={(text)=>this.setState({text})}
                        />
        
                        <TouchableOpacity onPress={()=>this.onSend()} style={{justifyContent:"center",marginLeft:5}}>
                        <Icon
                        name={'md-send'}
                        size={30}
                        color='green'
                        >
                        </Icon>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                </SafeAreaView>

            
        );
    }

};
ChatScreen.navigationOptions=(navdata)=>
{
    return{
        header:null
    }
}
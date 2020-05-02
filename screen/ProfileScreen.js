import React, { Component } from 'react';
import {Text,View,TouchableOpacity, Alert} from 'react-native';
//import {Button} from 'native-base'
//import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
import { firebaseAuth } from '../Enviorment/Config';
console.disableYellowBox = true;
const data_array=[];
export default class ProfileScreen extends Component{
constructor(props){
super(props);
this.state={
data:[],
loading:true,
}
}
componentDidMount(){
//var FCM = firebase.messaging();
var usid = firebaseAuth.currentUser.uid;
var ref = firebase.database().ref(`users/`+ usid + "/");
//FCM.getToken().then(token => {
//ref.update({pushToken: token});
//});
this.takedata();
}
takedata(){
   var uid=firebaseAuth.currentUser.email
   //  console.log(uid)
   var db=firebase.database().ref('users/').on("value",(snapshot)=>
   {snapshot.forEach(data=>{
   //  console.log(uid)
   if(data.val().email!==uid)
   data_array.push(data.val())
     console.log("data",data_array)
   });
   this.setState({data:data_array},()=>{
   this.setState({loading:false})
   })
   })
   const data_array=[];
   }
onFriendChat(item){
this.props.navigation.navigate('Chat',{itemData:item})
}
render(){
return(
<View style={{flex:1}}>
   <View style={{width:'100%'}}>
      <FlatList
         style={{margin:10}}
         data={this.state.data}
         extraData={this.state}
         renderItem={({item,index})=>
      {
      return(
      <TouchableOpacity onPress={()=>
         this.onFriendChat(item)}>   
         <View style={{height:50,width:'100%',borderBottomWidth:5,borderColor:'#FFFFFF',backgroundColor:'#29cf23'
         ,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
         <Text style={{color:'#FFFFFF',fontSize:20}}>{item.name}</Text>
   </View>
   </TouchableOpacity>
   );
   }}
   keyExtractor={(item,index)=>{index.toString()}}
   />
</View>
</View>
);
}
} ;
ProfileScreen.navigationOptions=(navdata)=>
{
return{
header:null
}
}
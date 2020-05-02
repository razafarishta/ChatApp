import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input=({ 
    placeholder,
    onChangeText,
    secureTextEntry,
    value
}) => {
        return(
            <View>
                <TextInput
                 style={styles.inputBox}
                 placeholder={placeholder}
                 onChangeText={onChangeText}
                 secureTextEntry={secureTextEntry}
                 value={value}
                 />
            </View>
        )
    }

 const styles= StyleSheet.create({
    inputBox:{
        width:300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10,
        backgroundColor:'#7a7aff'
    },
    
})
export default Input;
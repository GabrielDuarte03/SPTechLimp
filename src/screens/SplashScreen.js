import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView,
  Button,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function App({navigation}) {
 
    StatusBar.setBackgroundColor('#E0195C')
    setTimeout(() => {
     /* if(auth().currentUser){
        navigation.navigate('Home',{
          email: auth().currentUser.email,
        });
     }else{
     
      RNFS.readFile(RNFS.DocumentDirectoryPath + '/onboarding.json', 'utf8').then(success => {
     
        navigation.navigate('Login');
      }).catch(err => {
        navigation.navigate('Onboarding');
      });
     
     }
     */
    
     navigation.navigate('Home');
     console.log('serase')
    },2000);

  

    const styles = StyleSheet.create({
        container: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"#FFF",
          height:"100%"
          
        },
    });

  return (
    
    <View style={styles.container}>
       <Image source={require('../../assets/logo.jpg')} style={{width: 300, height: 300}} />
    </View>
  )
  


}


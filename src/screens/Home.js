import React, {useState, useEffect} from 'react';

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
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
export default function App({navigation}) {

var scanner = React.useRef();
const [again, setAgain] = useState(false);

useEffect(() => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });
},[]);
    
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Image source={require('../../assets/logo.jpg')} style={styles.logo} />

        <Text style={styles.title}>Olá, Pessoa</Text>

      </View>

      <View style={styles.body}>

        <Text style={styles.subtitle}>Leia abaixo o QRCode</Text>

     
      </View>
      <QRCodeScanner
        ref={(elem) => { scanner = elem }}
        onRead={(e)=>{
          console.log('leu ' + e.data)
         
          Alert.alert("Leu! ", "O link é: "+ e.data, [
            {
              text: "OK",
              onPress: () => {
                scanner.reactivate()
              }
            }
          ] )
          
        }}
      
        
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: Dimensions.get('window').height,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 150,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    width: Dimensions.get('window').width - 50,
  },
  title: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 30,
    width: 150,
    color: '#1F2A44',
  },
  subtitle: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 15,

    color: '#1F2A44',
  },
  logo: {
    width: 150,
    height: 150,
  },
  cameraContainer: {
    height: Dimensions.get('window').height - 150,
  }
});

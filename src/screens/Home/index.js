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
 
import AwesomeAlert from 'react-native-awesome-alerts';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import firestore from '@react-native-firebase/firestore';
import Timestamp from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function App({navigation}) {
  var scanner = React.useRef();
  const [again, setAgain] = useState(false);
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = x => {
    if (x == 2) setLoading(true);
  };
  const hideAlert = x => {
    if (x == 2) setLoading(false);
  };

  useEffect(() => {
    setNome(auth().currentUser.displayName);
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

  }, []);
    
  const [secure, setSecure] = useState(true);
  function mostra() {
    setSecure(false);
    setApareceA('none');
    setApareceF('flex');
  }
  function some() {
    setSecure(true);
    setApareceA('flex');
    setApareceF('none');
  }

  async function salvarBanco(andar) {
    var data = new Date().toUTCString();
    /*var dia = data.getDate() > 10 ? data.getDate() : '0' + data.getDate();
    var mes =
      data.getMonth() + 1 > 10 ? data.getMonth() + 1 : '0' + data.getMonth();
    var ano = data.getFullYear();
    var hora = data.getHours() > 10 ? data.getHours() : '0' + data.getHours();
    var minuto =
      data.getMinutes() > 10 ? data.getMinutes() : '0' + data.getMinutes();
    console.log(
      'data: ' + dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minuto,
    );*/


    await firestore()
      .collection('Passadas')
      .doc()
      .set({
        nome: auth().currentUser.displayName,
        andar: andar,
        data: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('salvo');
        Alert.alert('Salvo!', 'Salvo com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              scanner.reactivate();
            },
          },
        ]);
      })
      .catch(e => {
        console.log(e);

        Alert.alert('Erro!', 'Não pudemos salvar, tente novamente!', [
          {
            text: 'OK',
            onPress: () => {
              scanner.reactivate();
            },
          },
        ]);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logo.jpg')}
          style={styles.logo}
        />
        <View style={{display: 'flex', direction: 'row'}}>
        <Text style={styles.title}>Olá, {nome}</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={async ()=>{
         
          await auth().signOut().then(()=>{
           
            setNome('');
            navigation.navigate('Login');
          }).catch(e=>{
           
            console.log(e);
            Alert.alert('Erro ao sair!', 'Não foi possível sair, tente novamente!')
          });
        }}>
          <Text  style={[styles.title, {alignSelf: 'center', color:'#e6005a', marginTop: 30}]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        
        <Text style={styles.subtitle}>Leia abaixo o QRCode</Text>
        
      </View>

      <QRCodeScanner
        ref={elem => {
          scanner = elem;
        }}
        containerStyle={{
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          
          padding: 5,
        }}
        cameraStyle={{
          width: Dimensions.get('window').width - 35,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
         
        }}
        fadeIn={true}
        onRead={e => {
          console.log('leu ' + e.data);
          Alert.alert('Lido! ', 'Deseja salvar este local? ('+e.data+')', [
            {
              text: 'Cancelar',
              onPress: () => {
                scanner.reactivate();
              },
            },
            {
              text: 'OK',
              onPress: async () => {
                await salvarBanco(e.data);
              },
            },
          ]);
        }}
      />

<AwesomeAlert
        show={loading}
        title="Aguarde"
        message="Fazendo Logout..."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showProgress={true}
        progressColor='#1F2A44'
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#e0195c"
        cancelButtonColor="#e0195c"
        contentContainerStyle={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 10,
          borderColor: '#1F2A44',
          borderWidth: 1.5,
        }}
        contentStyle={{
          padding: 15,
        }}
        titleStyle={{
          fontSize: 20,
          fontFamily: 'Arial',
          color: '#1F2A44',
        }}
        messageStyle={{
          fontSize: 15,
          fontFamily: 'Arial',
          color: '#1F2A44',
        }}
        confirmButtonStyle={{
          borderRadius: 20,
          padding: 5,
          width: 100,
        }}
        cancelButtonStyle={{
          borderRadius: 20,
          padding: 5,
        }}
        confirmButtonTextStyle={{
          fontSize: 15,
          textAlign: 'center',
          fontFamily: 'Arial',
        }}
        cancelButtonTextStyle={{
          fontSize: 15,
          textAlign: 'center',
          fontFamily: 'Arial',
        }}
        onCancelPressed={() => hideAlert(2)}
        onConfirmPressed={() => hideAlert(2)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  body:{
    height: 40,
    marginTop: 30,
    

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 150,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
  },
  title: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 25,
    marginRight: 15,
    color: '#1F2A44',
  },
  subtitle: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: '#1F2A44',
  },
  logo: {
    width: 150,
    height: 150,
  },
  cameraContainer: {
    height: 200,
  },
});
